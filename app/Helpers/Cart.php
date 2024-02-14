<?php

namespace App\Helpers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class Cart
{
    public static function get()
    {
        $request = request();
        $user = $request->user();
        if ($user) {
            $shoppingCart = $user->shoppingCart()->firstOrCreate([]);
            return $shoppingCart->load("items.product");
        } else {
            return self::getCookieCart();
        }
    }

    public static function add()
    {
        $request = request();
        $user = $request->user();

        $item = $request->validate([
            "product_id" => "required",
            "qty" => "required",
        ]);

        if ($user) {
            $shoppingCart = $user->shoppingCart()->firstOrCreate([]);
            $shoppingCart->addOrUpdateItem($item['product_id'], $item['qty']);
        } else {
            return self::addToCartCookie($item);
        }
    }

    public static function update(int $id)
    {
        $request = request();
        $user = $request->user();

        $qty = $request->validate([
            "qty" => "required",
        ])["qty"];

        if ($user) {
            $shoppingCart = $user->shoppingCart()->first();
            $shoppingCart->updateQuantity($id, $qty);
        } else {
            return self::updateCartCookie($id, $qty);
        }
    }

    public static function delete(int $id)
    {
        $request = request();
        $user = $request->user();

        if ($user) {
            $shoppingCart = $user->shoppingCart()->first();
            $shoppingCart->removeItem($id);
        } else {
            $cart = self::getCookieCart();
            $filteredCart = array_filter($cart['items'], function ($cartItem) use ($id) {
                return $cartItem["product_id"] !== $id;
            });

            $cart['items'] = $filteredCart;
            $cart = self::updateCartSubtotal($cart);
            self::setCartCookie($cart);
        }
    }

    protected static function getCookieCart()
    {
        $cart = Cookie::get("cart");

        return $cart ? json_decode($cart, true) : [
            'items' => [],
            'subtotal' => 0.00,
            'shipping_price' => 0.00,
            'total_price' => 0.00,
        ];
    }

    protected static function addToCartCookie($item)
    {
        $cart = self::getCookieCart();

        $existingItemIndex = null;
        foreach ($cart['items'] as $index => $cartItem) {
            if ($cartItem["product_id"] === $item["product_id"]) {
                $existingItemIndex = $index;
                break;
            }
        }

        if ($existingItemIndex !== null) {
            $cart['items'][$existingItemIndex]['qty'] += 1;
        } else {
            $associatedProduct = Product::find($item["product_id"]);
            $cart['items'][] = [
                ...$item,
                "product" => $associatedProduct
            ];
        }

        $cart = self::updateCartSubtotal($cart);
        self::setCartCookie($cart);
    }

    protected static function updateCartCookie($product_id, $qty)
    {
        $cart = self::getCookieCart();

        foreach ($cart['items'] as $idx => $cartItem) {
            if ($cartItem['product_id'] === $product_id) {
                $cart['items'][$idx]['qty'] +=  $qty;
                break;
            }
        }

        $cart = self::updateCartSubtotal($cart);
        self::setCartCookie($cart);
    }

    protected static function setCartCookie($cart)
    {
        Cookie::queue("cart", json_encode($cart), 60 * 24 * 7); // Set cookie for 7 days
    }

    protected static function calculateSubtotal(array $items)
    {
        return array_reduce($items, function ($sum, $item) {
            $sum += $item['product']['price']  * $item['qty'];
            return $sum;
        }, 0);
    }

    protected static function updateCartSubtotal(array $cart)
    {
        $subtotal = self::calculateSubtotal($cart['items']);

        $shipping_price = 0;
        $cart["subtotal"] = $subtotal;
        $cart["shipping_price"] = $shipping_price;
        $cart["total_price"] = $subtotal  + $shipping_price;

        return $cart;
    }
}
