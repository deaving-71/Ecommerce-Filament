<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BrandResource\Pages;
use App\Filament\Resources\BrandResource\RelationManagers;
use App\Models\Brand;
use Filament\Forms;
use Filament\Forms\Components\Group;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ColorColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class BrandResource extends Resource
{
    protected static ?string $model = Brand::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationGroup = "Shop";

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()->schema([
                    Forms\Components\Section::make()->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->live(onBlur: true)
                            ->unique(ignoreRecord: true)
                            ->afterStateUpdated(function (string $operation, $state, Forms\Set $set) {
                                if ($operation !== "create") return;

                                $set('slug', Str::slug($state));
                            }),
                        Forms\Components\TextInput::make("slug")
                            ->disabled()
                            ->required()
                            ->dehydrated()
                            ->unique(Brand::class, "slug", ignoreRecord: true),
                        Forms\Components\TextInput::make("url")->label("Website URL")->columnSpan("full"),
                        Forms\Components\MarkdownEditor::make("description")->columnSpan("full"),
                    ])->columns(2)

                ])->columnSpan(2),
                Group::make([
                    Forms\Components\Section::make("Status")->schema([
                        Forms\Components\Toggle::make("is_visible")
                            ->label("Visibility")
                            ->default(true)
                            ->helperText("Enable or disable brand visibility."),
                    ]),
                    Forms\Components\Section::make("Color")->schema([
                        Forms\Components\ColorPicker::make("primary_hex")
                            ->label("Primary Color")->hiddenLabel(),
                    ])
                ])
            ])->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make("name")->sortable()->searchable()->toggleable(),
                TextColumn::make("url")->Label("Website Link")->sortable()->searchable()->toggleable(),
                ColorColumn::make("primary_hex")->sortable()->toggleable(),
                IconColumn::make("is_visible")->boolean()->Label("Visibility")->toggleable(),
            ])
            ->filters([
                Filter::make('Visibility')
                    ->query(fn (Builder $query): Builder => $query->where('is_visible', true))
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
            'index' => Pages\ListBrands::route('/'),
            'create' => Pages\CreateBrand::route('/create'),
            'edit' => Pages\EditBrand::route('/{record}/edit'),
        ];
    }
}
