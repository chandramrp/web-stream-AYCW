<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WatchHistory extends Model
{
     use HasFactory;

     protected $fillable = [
          'user_id',
          'movie_id',
          'progress',
     ];

     protected $casts = [
          'progress' => 'float',
     ];

     public function user(): BelongsTo
     {
          return $this->belongsTo(User::class);
     }

     public function movie(): BelongsTo
     {
          return $this->belongsTo(Movie::class);
     }

     // Helper method untuk mengupdate progress menonton
     public function updateProgress(int $duration): void
     {
          $this->progress = $duration;
          $this->save();
     }
}