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
        Schema::create('vendor_features', function (Blueprint $table) {
            $table->id(); 
            $table->timestamps();
            $table->string('vendor_feature'); 
            $table->integer('consent_vendor_id');
            $table->foreign('consent_vendor_id')->references('id')->on('consent_vendors')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendor_features');
    }
};
