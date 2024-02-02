<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $modelLabel = "Customers";

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationGroup = 'Manage Users';

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()->schema([
                    Forms\Components\Section::make("User Account")->schema([
                        Forms\Components\TextInput::make("name")->required(),
                        Forms\Components\TextInput::make("email")->email()->required(),
                        Forms\Components\TextInput::make("password")->required(),
                    ]),
                    Forms\Components\Section::make("Customer Details")->schema([
                        Forms\Components\TextInput::make("fullname")->required(),
                        Forms\Components\TextInput::make("phone")->tel()->required(),
                    ])->columns(2),
                ]),
                Forms\Components\Group::make()->schema([
                    Forms\Components\Section::make("Address")->schema([
                        Forms\Components\Split::make([
                            Forms\Components\TextInput::make("state")->required(),
                            Forms\Components\TextInput::make("city")->required(),
                            Forms\Components\TextInput::make("zip_code")->required(),
                        ]),
                        Forms\Components\Textarea::make("street_address"),
                    ]),
                    Forms\Components\Section::make("Status")->schema([
                        Forms\Components\Toggle::make("is_active")
                            ->label("Active")
                            ->default(true)
                            ->helperText("Enable or disable user account."),
                    ]),
                ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make("fullname")->searchable()->sortable()->toggleable(),
                Tables\Columns\TextColumn::make("name")->label("username")->searchable()->sortable()->toggleable(),
                Tables\Columns\TextColumn::make("email")->searchable()->sortable()->toggleable(),
                Tables\Columns\TextColumn::make("phone")->searchable()->sortable()->toggleable(),
                Tables\Columns\TextColumn::make("state")->searchable()->sortable()->toggleable(),
                Tables\Columns\TextColumn::make("created_at")->sortable()->toggleable()->date(),
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
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
