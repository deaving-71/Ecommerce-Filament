<?php

namespace App\Helpers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class Cart
{
    public static function get(Request $request)
    {
        $user = $request->user();

        if ($user) {
            $shoppingCart = $user->shoppingCart()->first();
            return $shoppingCart->load("items.product")->items;
        } else {
            return self::getCookieCart();
        }
    }

    public static function add()
    {
        $request = request();
        $item = $request->validate([
            "product_id" => "required",
            "qty" => "required",
        ]);

        $user = $request->user();

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
        $qty = $request->validate([
            "qty" => "required",
        ])["qty"];

        $user = $request->user();

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
            $filteredCart = array_filter($cart, function ($cartItem) use ($id) {
                return $cartItem["product_id"] !== $id;
            });

            self::setCartCookie($filteredCart);
        }
    }

    public static function getCookieCart()
    {
        $cart = Cookie::get("cart");

        return $cart ? json_decode($cart, true) : [];
    }

    public static function addToCartCookie($item)
    {
        $cart = self::getCookieCart();

        $existingItemIndex = null;
        foreach ($cart as $index => $cartItem) {
            if ($cartItem["product_id"] === $item["product_id"]) {
                $existingItemIndex = $index;
                break;
            }
        }

        if ($existingItemIndex !== null) {
            $cart[$existingItemIndex]["qty"] += 1;
        } else {
            $associatedProduct = Product::find($item["product_id"]);
            $cart[] = [
                ...$item,
                "product" => $associatedProduct
            ];
        }

        self::setCartCookie($cart);

        return $cart;
    }

    public static function updateCartCookie($id, $qty)
    {
        $cart = self::getCookieCart();

        foreach ($cart as $key => $cartItem) {
            if ($cartItem["product_id"] === $id) {
                $itemIndex = $key;
                $cart[$itemIndex]["qty"] += $qty;
                break;
            }
        }

        self::setCartCookie($cart);

        return $cart;
    }

    public static function setCartCookie($cart)
    {
        Cookie::queue("cart", json_encode($cart), 60 * 24 * 7); // Set cookie for 7 days
    }
}
