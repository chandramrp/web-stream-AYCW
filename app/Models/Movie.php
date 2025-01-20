namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Movie extends Model
{
protected $fillable = [
'title',
'description',
'video_url',
'poster_url',
'year',
'duration',
'rating',
'genres',
'director',
'writer',
'cast',
'is_featured',
'status'
];

protected $casts = [
'genres' => 'array',
'cast' => 'array',
'is_featured' => 'boolean',
'rating' => 'decimal:1'
];

public function watchHistories(): HasMany
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