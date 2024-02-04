<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Order;
use App\Models\Product;
use Filament\Actions\Action;
use Filament\Forms;
use Filament\Forms\Components\Actions\Action as ActionsAction;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';

    protected static ?string $navigationGroup = "Shop";

    protected static ?int $navigationSort = 2;
    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where("status", "=", "pending")->count();
    }

    public static function form(Form $form): Form
    {
        $products = Product::get();

        return $form
            ->schema([
                Forms\Components\Wizard::make([
                    Forms\Components\Wizard\Step::make('Order Details')
                        ->schema([
                            Forms\Components\TextInput::make('number')
                                ->default('OR-' . random_int(100000, 9999999))
                                ->unique(ignoreRecord: true)
                                ->required()
                                ->disabled()
                                ->dehydrated(),

                            Forms\Components\Select::make("user_id")
                                ->label("Customer")
                                ->relationship("user", "name")
                                ->searchable()
                                ->required(),

                            Forms\Components\ToggleButtons::make("status")
                                ->required()
                                ->options([
                                    'pending' => 'Pending',
                                    'processing' => 'Processing',
                                    'shipped' => 'Shipped',
                                    'delivered' => 'Delivered',
                                    'declined' => 'Declined',
                                    'canceled' => 'Canceled',
                                ])
                                ->colors([
                                    'pending' => 'warning',
                                    'processing' => 'primary',
                                    'shipped' => 'info',
                                    'delivered' => 'success',
                                    'canceled' => 'danger',
                                    'declined' => 'danger',
                                ])->inline(),

                            Forms\Components\MarkdownEditor::make("notes")->columnSpanFull(),
                        ])->columns(2),

                    Forms\Components\Wizard\Step::make('Order Items')
                        ->schema([
                            Forms\Components\Group::make()->schema([
                                Forms\Components\Repeater::make("items")
                                    ->hiddenLabel()
                                    ->relationship()
                                    ->schema([
                                        Forms\Components\Split::make([
                                            Forms\Components\Select::make("product_id")
                                                ->label("Product")
                                                ->options(
                                                    $products->mapWithKeys(function (Product $product) {
                                                        return [$product->id => sprintf('%s ($%s)', $product->name, $product->price)];
                                                    })
                                                )
                                                ->required()
                                                ->reactive()
                                                ->disableOptionWhen(function ($value, $state, Get $get) {
                                                    return collect($get('../*.product_id'))
                                                        ->reject(fn ($id) => $id == $state)
                                                        ->filter()
                                                        ->contains($value);
                                                }),


                                            Forms\Components\TextInput::make("qty")
                                                ->required()
                                                ->integer()
                                                ->default(1),
                                        ])
                                    ])
                                    // Repeatable field is live so that it will trigger the state update on each change
                                    ->live()
                                    // After adding a new row, we need to update the totals
                                    ->afterStateUpdated(function (Get $get, Set $set) {
                                        self::updateTotals($get, $set);
                                    })
                                    // After deleting a row, we need to update the totals
                                    ->deleteAction(
                                        fn ($action) => $action->after(fn (Get $get, Set $set) => self::updateTotals($get, $set)),
                                    )
                                    // Disable reordering
                                    ->reorderable(false)
                            ])->columnSpan(2),

                            Forms\Components\Group::make()->schema([
                                Forms\Components\TextInput::make("shipping_price")
                                    ->required()
                                    ->numeric()
                                    ->live(true)
                                    ->afterStateUpdated(function (Get $get, Set $set) {
                                        self::updateTotals($get, $set);
                                    }),

                                Forms\Components\TextInput::make("subtotal")
                                    ->readonly()
                                    ->numeric()
                                    ->afterStateHydrated(function (Get $get, Set $set) {
                                        self::updateTotals($get, $set);
                                    })
                                    ->default(0.00),

                                Forms\Components\TextInput::make("total")
                                    ->readOnly()
                                    ->numeric()
                                    ->default(0.00),
                            ])
                        ])->columns(3),
                ])->columnSpanFull()
            ]);
    }

    // This function updates totals based on the selected products and quantities
    public static function updateTotals(Get $get, Set $set): void
    {
        // Retrieve all selected products and remove empty rows
        $selectedProducts = collect($get('items'))->filter(fn ($item) => !empty($item['product_id']) && !empty($item['qty']));

        // Retrieve prices for all selected products
        $prices = Product::find($selectedProducts->pluck('product_id'))->pluck('price', 'id');

        // Calculate subtotal based on the selected products and quantities
        $subtotal = $selectedProducts->reduce(function ($subtotal, $product) use ($prices) {
            return $subtotal + ($prices[$product['product_id']] * $product['qty']);
        }, 0);

        // Update the state with the new values
        $set('subtotal', number_format($subtotal, 2, '.', ''));
        $set('total', number_format($subtotal + $get('shipping_price'), 2, '.', ''));
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make("number")->searchable()->toggleable(),
                Tables\Columns\TextColumn::make("user.fullname")->label("Customer")->searchable()->sortable()->toggleable(),


                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'processing' => 'gray',
                        'shipped' => 'info',
                        'delivered' => 'success',
                        'canceled' => 'danger',
                        'declined' => 'danger',
                    })->searchable()->sortable()->toggleable(),

                Tables\Columns\TextColumn::make("total")
                    ->label("Total Price")
                    ->summarize([
                        Tables\Columns\Summarizers\Sum::make()->money()->label("Total Revenue")
                    ])
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                Tables\Columns\TextColumn::make("created_at")
                    ->searchable()
                    ->sortable()
                    ->toggleable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\DeleteAction::make(),
                ])
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
            // 'view' => Pages\ViewOrder::route('/{record}'),
        ];
    }
}
