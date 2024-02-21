<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MyOrdersControllers extends Controller
{
    public function index(Request $request)
    {
        $myOrders = $request->user()->orders;
        return Inertia::render('profile/MyOrders', [
            'orders' => $myOrders,
        ]);
    }

    public function show(Request $request, ?string $number)
    {
        $order = $request->user()->orders()->where('number', $number)->firstOrFail()->load("items.product");
        return Inertia::render('profile/Invoice', [
            "order" => $order
        ]);
    }
}
