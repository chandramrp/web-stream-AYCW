<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WatchHistory extends Model
{
     protected $fillable = [
          'user_id',
          'movie_id',
          'watch_duration',
          'watched_at',
          'last_watched_at',
          'completed'
     ];

     protected $casts = [
          'watched_at' => 'datetime',
          'last_watched_at' => 'datetime',
          'completed' => 'boolean'
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
          $this->watch_duration = $duration;
          $this->last_watched_at = now();
          $this->completed = $duration >= $this->movie->duration;
          $this->save();
     }
}