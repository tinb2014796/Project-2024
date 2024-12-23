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
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->string('ra_score');
            $table->text('ra_comment')->nullable();
            $table->string('ra_reply')->nullable()->cascadeOnDelete();
            $table->string('ra_cus_reply')->nullable()->cascadeOnDelete();
            $table->timestamps();

            $table->foreignId('p_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('cus_id')->constrained('customers')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }
};
