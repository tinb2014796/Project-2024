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
            $table->id(); // Đổi tên cột id thành or_id
            $table->dateTime('or_date'); // Thêm cột or_date kiểu dateTime
            $table->decimal('or_total', 15, 0); // Thêm cột or_total kiểu decimal
            $table->string('or_status');
            $table->string('or_ship')->nullable();
            $table->string('or_note');
            $table->string('status')->nullable();
            $table->string('or_discount')->nullable();
            $table->string('voucher_code')->nullable();
            $table->timestamps();
            
            $table->foreignId('cus_id')->constrained('customers')->onDelete('cascade');
            $table->foreignId('pa_id')->constrained('pays')->onDelete('cascade');
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
