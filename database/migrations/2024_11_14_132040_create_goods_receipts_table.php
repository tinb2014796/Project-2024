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
        Schema::create('goods_receipts', function (Blueprint $table) {
            $table->id();
            $table->string('import_date');
            $table->timestamps();

            $table->foreignId('brand_id')->nullable()->constrained('brands');
        });
    }

    /**
     * Reverse the migrations.
     */

};
