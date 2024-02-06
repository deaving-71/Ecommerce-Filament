<?php

use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    $products = Product::where("is_featured", 1)->where("is_visible", 1)->take(8)->get();
    return Inertia::render("Home", [
        'products' => $products
    ]);
});

Route::get('/shop', function () {
    return Inertia::render("Shop");
});

Route::get('/collections', function () {
    return Inertia::render("Collections");
});
