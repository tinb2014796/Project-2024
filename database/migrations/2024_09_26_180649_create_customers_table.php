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
        Schema::create('customers', function (Blueprint $table) {
            $table->id(); // Đổi tên cột id thành cus_id
            $table->string('cus_name'); // Thêm cột cus_name kiểu string
            $table->string('cus_familyname'); // Thêm cột cus_familyname kiểu string
            $table->string('cus_email'); // Thêm cột cus_email kiểu string
            $table->string('cus_sdt'); // Thêm cột cus_sdt kiểu string
            $table->string('cus_password'); // Thêm cột cus_password kiểu string
            $table->string('cus_address')->nullable(); // Thêm cột cus_address kiểu string
            $table->integer('cus_points'); // Thêm cột cus_points kiểu integer
            $table->string('cus_sex'); // Thêm cột cus_sex kiểu string
            $table->string('cus_birthday'); // Thêm cột cus_image kiểu string
            $table->string('cus_image')->nullable(); // Thêm cột cus_image kiểu string
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
