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
        Schema::create('consent_vendors', function (Blueprint $table) {
            $table->id(); 
            $table->timestamps();
            $table->string('name');
            $table->string('script_to_implement'); 
            $table->string('policy_url');
            $table->integer('consent_id');
            $table->string('iab_id')->nullable();
            $table->integer('cookieMaxAgeSeconds')->nullable();;
            $table->foreign('consent_id')->references('id')->on('consent')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consent_vendors');
    }
};
