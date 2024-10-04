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
        Schema::create('detail_products', function (Blueprint $table) {
            $table->id(); // Đổi tên cột id thành dp_id
            $table->string('dp_size'); // Thêm cột dp_size kiểu string
            $table->string('dp_sold'); // Thêm cột dp_sold kiểu string
            $table->string('dp_color'); // Thêm cột dp_color kiểu string
            $table->string('dp_material'); // Thêm cột dp_material kiểu string
            $table->timestamps();

            $table->foreignId('p_id')->constrained('products')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_products');
    }
};
