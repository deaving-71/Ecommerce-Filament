<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Order;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationGroup = "Shop";

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where("status", "=", "pending")->count();
    }

    public static function form(Form $form): Form
    {
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

                            Forms\Components\TextInput::make("shipping_price")
                                ->required(),

                            Forms\Components\MarkdownEditor::make("notes")->columnSpanFull(),
                        ])->columns(2),

                    Forms\Components\Wizard\Step::make('Order Items')
                        ->schema([
                            Forms\Components\Repeater::make("items")
                                ->hiddenLabel()
                                ->relationship()
                                ->schema([
                                    Forms\Components\Select::make("product_id")
                                        ->label("Product")
                                        ->required()
                                        ->options(Product::query()->pluck("name", "id"))
                                        ->reactive()
                                        ->afterStateUpdated(fn ($state, Forms\Set $set) => $set("unit_price", Product::find($state)?->price ?? 0)),


                                    Forms\Components\TextInput::make("qty")
                                        ->required()
                                        ->numeric()
                                        ->default(1)
                                        ->live(),

                                    Forms\Components\TextInput::make("unit_price")
                                        ->label("Unit Price")
                                        ->required()
                                        ->numeric()
                                        ->disabled()
                                        ->dehydrated(),

                                    Forms\Components\Placeholder::make("total_price")
                                        ->label("Total Price")
                                        ->content(function ($get) {
                                            return $get("qty") * $get("unit_price");
                                        })
                                ])->columns(4)
                        ]),
                ])->columnSpanFull()
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make("number")->searchable()->toggleable(),
                Tables\Columns\TextColumn::make("user.fullname")->label("Customer")->searchable()->sortable()->toggleable(),

                // Tables\Columns\TextColumn::make("total_price")
                //     ->summarize([
                //         Tables\Columns\Summarizers\Sum::make()->money()
                //     ])
                //     ->searchable()
                //     ->sortable()
                //     ->toggleable(),

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

                Tables\Columns\TextColumn::make("created_at")
                    ->summarize([
                        Tables\Columns\Summarizers\Sum::make()->money()
                    ])
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
        ];
    }
}
