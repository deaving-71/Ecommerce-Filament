<?php

namespace App\Helpers;

use App\Models\Order;
use App\Models\Product;
use App\Models\ShoppingCart;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;

use function PHPSTORM_META\map;

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

    public static function checkout()
    {
        $request = request();

        $user = $request->user();

        $orderNumber = 'OR-' . random_int(100000, 9999999);

        $validated = $request->validate([
            "name" => "required|max:255",
            "email" => "required|email",
            "phone" => "nullable",
            "state" => "required",
            "city" => "required",
            "street_address" => "nullable",
            "zip_code" => "required",
            "notes" => "nullable",
        ]);

        if ($user) {
            $order = $user->shoppingCart()->first()->checkout([
                "number" => $orderNumber,
                ...$validated,
            ]);
            $user->shoppingCart()->delete();
        } else {
            $cart = self::getCookieCart();
            $cartItems = collect($cart["items"])->map(function ($item) {
                return [
                    "product_id" => $item["product_id"],
                    "qty" => $item["qty"],
                ];
            });

            if ($cartItems->count() === 0) {
                return back()->withErrors(["root" => "Your cart is empty. Please add items to your cart before proceeding to checkout."]);
            }

            $productsIds = collect($cart["items"])->map(fn ($item) => $item["product_id"]);
            $products = Product::whereIn("id", $productsIds)->get();

            $subtotal = 0;

            foreach ($cartItems as $item) {
                $product = $products->first(fn ($product) => $product["id"] === $item["product_id"]);

                $subtotal += $product["price"] * $item["qty"];
            }

            $shippingPrice = 0;
            $totalPrice = $subtotal + $shippingPrice;

            $order = [
                ...$validated,
                "number" => $orderNumber,
                "subtotal" => $subtotal,
                "shipping_price" => $shippingPrice,
                "total" => $totalPrice,
            ];

            $order = Order::create($order);
            $order->items()->createMany($cartItems);
            self::setCartCookie([
                'items' => [],
                'subtotal' => 0.00,
                'shipping_price' => 0.00,
                'total_price' => 0.00,
            ]);
        }

        $order->refresh();
        $orderWithItems = $order->load("items.product");

        return Inertia::render("Invoice", [
            "order" => $orderWithItems,
        ]);
    }

    /** 
     * tranfser cookie cart to database linked to it's user
     */
    public static function transfer($user)
    {
        $cart = self::getCookieCart();
        if (!count($cart)) return;

        $cartItems = collect($cart["items"])->map(function ($item) {
            return [
                "product_id" => $item["product_id"],
                "qty" => $item["qty"],
            ];
        });

        $shoppingCart = $user->shoppingCart()->create([]);
        $shoppingCart->items()->createMany($cartItems);
        $shoppingCart->updateSubtotal();
        self::deleteCartCookie();
    }

    public static function deleteCartCookie()
    {
        Cookie::queue(Cookie::forget('cart'));
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
