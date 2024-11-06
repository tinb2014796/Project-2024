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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('p_name');
            $table->decimal('p_selling', 15, 0);
            $table->integer('p_quantity');
            $table->text('p_description');
            $table->decimal('p_purchase', 15, 0);
            $table->timestamps();
            $table->foreignId('c_id')->constrained('categories')->onDelete('cascade');
            $table->foreignId('b_id')->constrained('brands')->onDelete('cascade')->nullable();

       
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
