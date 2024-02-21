<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function create(Request $request)
    {
        $user = $request->user();
        return Inertia::render("profile/Profile", [
            "profile" => $user
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => ['string', 'max:255'],
            'phone' => ['string', 'max:20'],
            'state' => ['string', 'max:255'],
            'city' => ['string', 'max:255'],
            'zip_code' => ['string', 'max:255'],
            'street_address' => ['string', 'max:255'],
        ]);

        $request->user()->update($validated);

        return back();
    }
}
