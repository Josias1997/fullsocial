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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['NEW_POST', 'NEW_COMMENT', 'LIKE', 'FRIENDS_REQUEST']);
            $table->string('content');
            $table->foreignIdFor(\App\Models\User::class)->references('id')->on('users')->onDelete('cascade');
            $table->morphs('parent');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
