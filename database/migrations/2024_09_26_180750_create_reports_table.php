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
        Schema::create('reports', function (Blueprint $table) {
            $table->id(); // Đổi tên cột id thành r_id
            $table->decimal('r_revenue', 15, 0); // Thêm cột r_revenue kiểu decimal
            $table->decimal('r_expense', 15, 0); // Thêm cột r_expense kiểu decimal
            $table->dateTime('r_start'); // Thêm cột r_start kiểu dateTime
            $table->dateTime('r_end'); // Thêm cột r_end kiểu dateTime
            $table->timestamps();
            $table->foreignId('u_id')->constrained('users')->onDelete('cascade');
            // Dòng này tạo một khóa ngoại 'u_id' trong bảng 'reports' liên kết với bảng 'users'.
            // - foreignId('u_id'): Tạo một cột 'u_id' kiểu unsignedBigInteger và đánh dấu nó là khóa ngoại.
            // - constrained('users'): Xác định rằng 'u_id' liên kết với bảng 'users' (mặc định là cột 'id' của bảng users).
            // - onDelete('cascade'): Khi một bản ghi trong bảng 'users' bị xóa, các bản ghi liên quan trong bảng 'reports' cũng sẽ bị xóa theo.

            // Sửa đổi dòng này
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
