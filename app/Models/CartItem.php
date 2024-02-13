<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = ["shopping_cart_id", "product_id", "qty"];

    public function shoppingCart(): BelongsTo
    {
        return $this->belongsTo(ShoppingCart::class, "shopping_cart_id");
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, "product_id");
    }
}
