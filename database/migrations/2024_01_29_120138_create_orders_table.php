<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string("number")->unique();
            $table->foreignId("user_id")->nullable()->constrained("users")->cascadeOnDelete();
            $table->enum("status", ["pending", "processing", "shipped", "delivered", "canceled", "declined"])->default("pending");
            $table->decimal("shipping_price")->nullable();
            $table->string("name");
            $table->string("email");
            $table->string("phone")->nullable();
            $table->string("state");
            $table->string("city");
            $table->string("zip_code");
            $table->string("street_address")->nullable();
            $table->longText("notes")->nullable();
            $table->decimal("subtotal", 10, 2);
            $table->decimal("total", 10, 2);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
