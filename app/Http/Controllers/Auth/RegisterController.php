<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\Cart;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function create()
    {
        return Inertia::render("auth/Register");
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'string|max:20',
            'state' => 'string|max:255',
            'city' => 'string|max:255',
            'street_address' => 'string|max:255',
            'zip_code' => 'string|max:20',
            'password' => ["required", Password::defaults()],
            "terms" => 'accepted'
        ]);

        $user = User::create($validated);
        Cart::transfer($user);

        return redirect("auth/sign-in");
    }
}
