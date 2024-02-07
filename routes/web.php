<?php

use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Request;
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
    $products = Product::where("is_featured", 1)
        ->where("is_visible", 1)
        ->with("categories")
        ->take(8)
        ->get();
    $collections = Category::where("is_visible", 1)->get();

    return Inertia::render("Home", [
        'products' => $products,
        'collections' => $collections
    ]);
});

Route::get('/shop', function () {
    $products = Product::with('categories')
        ->when(Request::input("collections"), function ($query, $collections) {
            $query->whereHas('categories', function ($subQuery) use ($collections) {
                $subQuery->whereIn('slug', $collections);
            });
        })
        ->where("is_visible", 1)
        ->get();
    $collections = Category::where("is_visible", 1)->get();

    return Inertia::render("Shop", [
        'products' => $products,
        'collections' => $collections
    ]);
});

Route::get('/collections', function () {
    return Inertia::render("Collections");
});
