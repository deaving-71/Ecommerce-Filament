<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ShoppingCart extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'shipping_price', 'total_price', 'subtotal'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    public function addOrUpdateItem($product_id, $qty)
    {
        $shipping_price = 0;
        try {
            $cartItem = $this->items()->where('product_id', $product_id)->firstOrFail();
            $cartItem->update(['qty' => $cartItem->qty + $qty]);
            $this->calculateSubtotal();
        } catch (ModelNotFoundException $e) {
            $this->items()->create([
                'product_id' => $product_id,
                'qty' => $qty
            ]);
            $this->calculateSubtotal();
        }
    }

    public function updateQuantity($itemId, $qty)
    {
        if ($qty === -1 && $this->items()->findOrFail($itemId)->qty === 1) {
            return;
        }

        $this->items()->where('id', $itemId)->increment('qty', $qty);
        $this->calculateSubtotal();
    }

    public function removeItem(int $id)
    {
        $this->items()->where('id', $id)->delete();
        $this->calculateSubtotal();
    }

    public function calculateSubtotal()
    {
        $subtotal = 0;

        foreach ($this->items as $item) {
            $subtotal += $item->qty * $item->product->price;
        }

        $shipping_price = 0;
        $this->update([
            'subtotal' => $subtotal,
            'shipping_price' => $shipping_price,
            'total_price' => $subtotal + $shipping_price,
        ]);
    }
}
