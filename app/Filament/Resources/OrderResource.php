<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Order;
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

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Wizard::make([
                    Forms\Components\Wizard\Step::make('Order Details')
                        ->schema([
                            Forms\Components\TextInput::make('number')
                                ->default('OR-' . random_int(100000, 9999999))
                                ->disabled()
                                ->dehydrated()
                                ->unique()
                                ->required(),

                            Forms\Components\Select::make("customer_id")->relationship("customer", "name")
                                ->searchable()
                                ->required(),

                            Forms\Components\ToggleButtons::make("status")
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
                            // ...
                        ]),
                ])->columnSpanFull()
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\Layout\Stack::make([
                    Tables\Columns\TextColumn::make("number")->searchable()->toggleable(),

                    Tables\Columns\TextColumn::make("customers.name")->searchable()->sortable()->toggleable(),
                ]),

                Tables\Columns\TextColumn::make("total_price")
                    ->summarize([
                        Tables\Columns\Summarizers\Sum::make()->money()
                    ])
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

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
