<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    public function update(Request $request)
    {

        $validated = $request->validate([
            "current_password" => ["required", "current_password"],
            "new_password" => ["required", "confirmed", Password::defaults()]
        ]);

        $request->user()->update([
            "password" => Hash::make($validated["new_password"])
        ]);

        return back();
    }
}
