<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
     public function up(): void
     {
          Schema::create('movies', function (Blueprint $table) {
               $table->id();
               $table->string('title');
               $table->text('description')->nullable();
               $table->string('video_url');
               $table->string('poster_url');
               $table->integer('year');
               $table->integer('duration'); // dalam menit
               $table->decimal('rating', 3, 1)->default(0.0);
               $table->json('genres')->nullable();
               $table->string('director')->nullable();
               $table->string('writer')->nullable();
               $table->json('cast')->nullable();
               $table->boolean('is_featured')->default(false);
               $table->string('status')->default('active'); // active, inactive, coming_soon
               $table->timestamps();
          });
     }

     public function down(): void
     {
          Schema::dropIfExists('movies');
     }
};