<?php

namespace App\Http\Controllers;

use App\Helpers\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ShoppingCartController extends Controller
{
    public function index()
    {
        return Inertia::render("ShoppingCart");
    }

    public function store(Request $request)
    {
        Cart::add();

        return [
            "message" => "Added item to cart.",
        ];
    }

    public function update(Request $request, int $id)
    {
        Cart::update($id);

        return [
            "message" => "Updated item in cart.",
        ];
    }

    public function destroy(Request $request, int $id)
    {
        Cart::delete($id);

        return [
            "message" => "Delete item in cart.",
        ];
    }
}
