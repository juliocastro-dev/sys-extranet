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
        Schema::table('users', function (Blueprint $table) {
            // Remove old foreign key column
            $table->dropForeign(['unidade_id']);
            $table->dropColumn('unidade_id');

            // Add new foreign key column
            $table->unsignedBigInteger('setor_id')->nullable();
            $table->foreign('setor_id')->references('id')->on('departaments');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Add old column again
            $table->unsignedBigInteger('unidade_id')->nullable();
            $table->foreign('unidade_id')->references('id')->on('unidades');
        });
    }
};
