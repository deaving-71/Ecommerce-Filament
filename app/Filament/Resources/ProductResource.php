<?php

namespace App\Filament\Resources;

use App\Enums\ProductTypeEnum;
use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Category;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\FormsComponent;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-squares-2x2';

    protected static ?string $navigationGroup = 'Shop';

    protected static ?string $recordTitleAttribute = 'name';

    protected static int $globalSearchResultsLimit = 20;

    protected static ?int $navigationSort = 1;

    public static function getGloballySearchableAttributes(): array
    {
        return ['name'];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

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
                            ->unique(Product::class, "slug", ignoreRecord: true),

                        Forms\Components\MarkdownEditor::make("description")
                            ->columnSpan("full"),
                    ])
                        ->columns(2),

                    Forms\Components\Section::make("Thumbnail")
                        ->schema([
                            Forms\Components\FileUpload::make("thumbnail")
                                ->directory("form-attachments")
                                ->preserveFilenames()
                                ->image()
                                ->imageEditor()
                                ->hiddenLabel(),
                        ])
                        ->collapsible(),

                    Forms\Components\Section::make("Price & Inventory")->schema([
                        Forms\Components\TextInput::make("price")
                            ->numeric()
                            ->minValue(0)
                            ->required(),
                        Forms\Components\TextInput::make("qty")
                            ->numeric()
                            ->minValue(0)
                            ->label("Quantity")
                            ->required(),
                        Forms\Components\TextInput::make("sku")
                            ->label("SKU (Stock Keeping Unit")
                            ->unique(),
                        Forms\Components\Select::make("type")
                            ->options([
                                "downloadable" => ProductTypeEnum::DOWNLOADABLE->value,
                                "deliverable" => ProductTypeEnum::DELIVERABLE->value,
                            ])->default("deliverable"),
                    ])
                        ->columns(2),
                ])->columnSpan(2),

                Forms\Components\Group::make()->schema([
                    Forms\Components\Section::make("Status")->schema([
                        Forms\Components\Toggle::make("is_visible")
                            ->label("Visibility")
                            ->default(true)
                            ->helperText("Enable or disable prodoct visibility."),
                        Forms\Components\Toggle::make("is_featured")
                            ->label("Featured")
                            ->helperText("Enable or disable product featured status."),
                        Forms\Components\DatePicker::make("published_at")
                            ->label("Availabilty")
                            ->default(now()),
                    ]),
                    Forms\Components\Section::make("Associations")->schema([
                        Forms\Components\Select::make("categories")
                            ->relationship()
                            ->label("Category")
                            ->required()
                            ->native(false)
                            ->options(Category::query()->pluck("name", "id")),
                        Forms\Components\Select::make("brand_id")
                            ->label("Brand")
                            ->native(false)
                            ->relationship("brand", "name"),
                    ])
                ]),
            ])->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make("thumbnail")->toggleable(),
                Tables\Columns\TextColumn::make("name")->sortable()->searchable()->toggleable(),
                Tables\Columns\TextColumn::make("brand.name")->sortable()->searchable()->toggleable(),
                Tables\Columns\TextColumn::make("categories.name")->sortable()->searchable()->toggleable(),
                Tables\Columns\TextColumn::make("price")->sortable()->toggleable(),
                Tables\Columns\TextColumn::make("qty")->label("Quantity")->sortable()->toggleable(),
                Tables\Columns\ToggleColumn::make("is_visible")->label("Visibility")->sortable()->toggleable(),
                Tables\Columns\ToggleColumn::make("is_featured")->label("Featured")->sortable()->toggleable(),
                Tables\Columns\TextColumn::make("type")->sortable(),
            ])
            ->filters([
                Filter::make('Featured')
                    ->query(fn (Builder $query): Builder => $query->where('is_featured', true)),
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
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
