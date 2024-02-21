<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\MyOrdersControllers;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShoppingCartController;
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

Route::middleware("guest")->group(function () {
    Route::get("/auth/sign-in", [LoginController::class, "create"])->name("login");
    Route::get("/auth/sign-up", [RegisterController::class, "create"])->name("register");
});

Route::post("/login", [LoginController::class, "store"]);
Route::post("/register", [RegisterController::class, "store"]);

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
    $sortBy = Request::input("sortBy");
    $orderBy = Request::input("order");

    $query = Product::with('categories')
        ->when(Request::input("collections"), function ($query, $collections) {
            $query->whereHas('categories', function ($subQuery) use ($collections) {
                $subQuery->whereIn('slug', $collections);
            });
        })
        ->when(Request::input("prices"), function ($query, $prices) {
            $query->whereBetween("price", $prices);
        })
        ->where("is_visible", 1);

    if ($sortBy && $orderBy) {
        $query->orderBy($sortBy, $orderBy);
    }

    $collections = Category::where("is_visible", 1)->get();
    $products = $query->get();

    $highestPrice = Product::where("is_visible", 1)
        ->max("price");
    return Inertia::render("Shop", [
        'products' => $products,
        'collections' => $collections,
        "highestPrice" => $highestPrice,
    ]);
});

Route::get('/collections', function () {
    $collections = Category::where("is_visible", 1)->get();
    return Inertia::render("Collections", [
        'collections' => $collections
    ]);
});


Route::middleware("auth")->group(function () {
    Route::delete("/logout", [LoginController::class, "destroy"]);

    Route::get("/profile", [ProfileController::class, "create"]);
    Route::put("/profile", [ProfileController::class, "update"]);
    Route::get("/profile/my-orders", [MyOrdersControllers::class, "index"]);
    Route::get("/profile/my-orders/{number}", [MyOrdersControllers::class, "show"]);

    Route::put("/password", [PasswordController::class, "update"]);
});

Route::get("/shopping-cart", [ShoppingCartController::class, "index"]);
Route::post("/shopping-cart", [ShoppingCartController::class, "store"]);
Route::patch("/shopping-cart/{id}", [ShoppingCartController::class, "update"]);
Route::delete("/shopping-cart/{id}", [ShoppingCartController::class, "destroy"]);

Route::get("/checkout", [CheckoutController::class, "create"]);
Route::post("/checkout", [CheckoutController::class, "store"]);

// Route::get("/invoices/{id}", [InvoiceController::class, "show"]);
