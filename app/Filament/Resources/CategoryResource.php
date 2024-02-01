<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CategoryResource\Pages;
use App\Filament\Resources\CategoryResource\RelationManagers;
use App\Models\Category;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\FormsComponent;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class CategoryResource extends Resource
{
    protected static ?string $model = Category::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationGroup = 'Shop';

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
                            ->unique(Category::class, "slug", ignoreRecord: true),
                        Forms\Components\MarkdownEditor::make("description")->columnSpan("full"),
                    ])->columns(2)
                ])->columnSpan(2),
                Forms\Components\Group::make()->schema([
                    Forms\Components\Section::make("Status")
                        ->schema([
                            Forms\Components\Toggle::make("is_visible")->label("Visibility")
                                ->default(true)
                                ->helperText("Enable or disable category visibility."),
                        ]),
                    Forms\Components\Section::make("Associations")
                        ->schema([
                            Forms\Components\Select::make("parent_id")->label("Parent Category")->relationship("parent", "name")
                        ])
                ]),
            ])->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make("name")->searchable()->toggleable(),
                Tables\Columns\TextColumn::make("slug")->searchable()->toggleable(),
                Tables\Columns\TextColumn::make("cateogry.name")->label("Parent Category")->searchable()->toggleable(),
                Tables\Columns\IconColumn::make("is_visible")->label("Visibility")->boolean()->searchable()->toggleable(),
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
            'index' => Pages\ListCategories::route('/'),
            'create' => Pages\CreateCategory::route('/create'),
            'edit' => Pages\EditCategory::route('/{record}/edit'),
        ];
    }
}
