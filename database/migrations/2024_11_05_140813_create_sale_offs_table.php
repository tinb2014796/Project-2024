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
        Schema::create('sale_offs', function (Blueprint $table) {
            $table->id();
            $table->string('s_name');
            $table->string('s_value_min');
            $table->string('s_value_max');
            $table->float('s_percent');
            $table->dateTime('s_start');
            $table->dateTime('s_end');
            $table->timestamps();
            
            $table->foreignId('p_id')->constrained('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sale_offs');
    }
};
