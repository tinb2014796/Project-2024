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
            $table->string('s_type');
            $table->string('s_code')->nullable();
            $table->float('s_percent')->nullable();
            $table->dateTime('s_start');
            $table->dateTime('s_end');
            $table->string('s_quantity')->nullable();
            $table->string('s_catalory')->nullable();
            $table->string('s_value_min')->nullable();
            $table->string('s_value_max')->nullable();
            $table->string('s_description')->nullable();
            $table->timestamps();
            
            $table->foreignId('p_id')->nullable()->constrained('products')->onDelete('cascade');
            $table->foreignId('cus_id')->nullable()->constrained('customers')->onDelete('cascade');
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
