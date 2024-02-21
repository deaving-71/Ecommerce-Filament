<?php

namespace App\Http\Controllers;

use App\Helpers\Cart;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function create(Request $request)
    {
        $user = $request->user();
        return Inertia::render("Checkout", [
            "profile" => $user
        ]);
    }

    public function store()
    {
        return Cart::checkout();
    }
}
