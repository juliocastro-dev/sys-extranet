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
        Schema::create('comunicados_files', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('comunicado_id');
            $table->foreign('comunicado_id')->references('id')->on('comunicados');
            $table->string('file_name');
            $table->string('temporary_file_name');
            $table->text('path_file');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comunicados_files');
    }
};
