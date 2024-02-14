<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make("admin"),
            'fullname' => 'admin',
            'phone' => 'admin',
            'state' => 'admin',
            'city' => 'admin',
            'zip_code' => 'admin',
        ]);

        DB::table("categories")->insert([
            "name" => "Mobile Phones",
            "slug" => "mobile-phones",
            "parent_id" => null,
            "description" => "Mobile phones",
            "is_visible" => true,
        ]);

        DB::table("products")->insert([
            "name" => "iPhone 12",
            "slug" => "iphone-12",
            "description" => "iPhone 12",
            "thumbnail" => "form-attachments/619f09kK7tL._AC_UF894,1000_QL80_.jpg",
            "price" => 455.00,
            "qty" => 45,
            "is_visible" => true,
            "is_featured" => true,
            "type" => "deliverable",
            "published_at" => now(),
        ]);

        DB::table("products")->insert([
            "name" => "iPhone 14",
            "slug" => "iphone-14",
            "description" => "iPhone 14",
            "thumbnail" => "form-attachments/Samsung_Galaxy_S24_5K2_scaled.jpg",
            "price" => 699.99,
            "qty" => 12,
            "is_visible" => true,
            "is_featured" => true,
            "type" => "deliverable",
            "published_at" => now(),
        ]);

        DB::table("category_product")->insert([
            "category_id" => 1,
            "product_id" => 1,
        ]);

        DB::table("category_product")->insert([
            "category_id" => 1,
            "product_id" => 2,
        ]);
    }
}
