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
        Schema::create('detail_goods_receipts', function (Blueprint $table) {
            $table->id();
            $table->integer('quantity_import');
            $table->integer('quantity_back');
            $table->string('price');
            $table->string('status')->nullable();
            $table->string('note')->nullable();
            $table->boolean('is_added')->default(false);
            $table->timestamps();

            $table->foreignId('goods_receipt_id')->nullable()->constrained('goods_receipts');
            $table->foreignId('product_id')->nullable()->constrained('products');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_goods_receipts');
    }
};
