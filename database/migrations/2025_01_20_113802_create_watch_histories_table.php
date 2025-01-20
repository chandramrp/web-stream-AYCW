<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('watch_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('movie_id');
            $table->integer('watch_duration')->default(0); // dalam menit
            $table->timestamp('watched_at');
            $table->timestamp('last_watched_at')->nullable();
            $table->boolean('completed')->default(false);
            $table->timestamps();

            // Mencegah duplikasi riwayat tontonan untuk film yang sama
            $table->unique(['user_id', 'movie_id']);

            // Tambahkan foreign key setelah tabel movies dibuat
            $table->foreign('movie_id')
                ->references('id')
                ->on('movies')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('watch_histories');
    }
};
