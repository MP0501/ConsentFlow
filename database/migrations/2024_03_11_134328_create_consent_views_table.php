<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use League\CommonMark\Reference\Reference;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('consent_views', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('accept_value');
            $table->integer('consent_id');
            $table->foreign('consent_id')->references('id')->on('consent')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consent_views');
    }
};
