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
        Schema::table('comunicados', function (Blueprint $table) {
            $table->string('users_id')->after('departament_id')->nullable();
            $table->char('tipo_acesso')->after('user_id')->default('T');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comunicados', function (Blueprint $table) {
            $table->dropColumn('user_id');
            $table->dropColumn('tipo_acesso');
        });
    }
};
