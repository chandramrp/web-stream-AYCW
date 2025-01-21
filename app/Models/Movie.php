<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Movie extends Model
{
     use HasFactory;

     protected $fillable = [
          'title',
          'description',
          'poster_url',
          'video_url',
          'year',
          'duration',
          'rating',
          'genres',
          'cast',
          'director',
          'writer',
          'status',
          'source_type',
     ];

     protected $casts = [
          'genres' => 'array',
          'cast' => 'array',
          'year' => 'integer',
          'duration' => 'integer',
          'rating' => 'float',
     ];

     // Accessor untuk URL lengkap poster
     public function getPosterUrlAttribute($value)
     {
          if (!$value)
               return null;
          return $this->source_type === 'local' ? asset('storage/' . $value) : $value;
     }

     // Accessor untuk URL lengkap video
     public function getVideoUrlAttribute($value)
     {
          if (!$value)
               return null;
          return $this->source_type === 'local' ? asset('storage/' . $value) : $value;
     }

     // Relasi dengan WatchHistory
     public function watchHistories()
     {
          return $this->hasMany(WatchHistory::class);
     }

     // Helper method untuk mendapatkan durasi dalam format jam:menit
     public function getFormattedDuration(): string
     {
          $hours = floor($this->duration / 60);
          $minutes = $this->duration % 60;

          if ($hours > 0) {
               return sprintf('%dj %dm', $hours, $minutes);
          }

          return sprintf('%dm', $minutes);
     }

     // Helper method untuk mengecek status film
     public function isActive(): bool
     {
          return $this->status === 'active';
     }

     public function isComingSoon(): bool
     {
          return $this->status === 'coming_soon';
     }
}