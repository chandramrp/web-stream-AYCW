<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
     public function up()
     {
          Schema::table('movies', function (Blueprint $table) {
               $table->enum('source_type', ['local', 'url'])->default('local')->after('status');
          });
     }

     public function down()
     {
          Schema::table('movies', function (Blueprint $table) {
               $table->dropColumn('source_type');
          });
     }
};