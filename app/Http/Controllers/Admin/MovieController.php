<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MovieController extends Controller
{
     public function index()
     {
          $movies = Movie::latest()
               ->get()
               ->map(function ($movie) {
                    return [
                         'id' => $movie->id,
                         'title' => $movie->title,
                         'description' => $movie->description,
                         'poster_url' => $movie->poster_url,
                         'video_url' => $movie->video_url,
                         'year' => $movie->year,
                         'duration' => $movie->getFormattedDuration(),
                         'rating' => $movie->rating,
                         'genres' => $movie->genres,
                         'cast' => $movie->cast,
                         'director' => $movie->director,
                         'writer' => $movie->writer,
                         'status' => $movie->status,
                         'source_type' => $movie->source_type,
                         'created_at' => $movie->created_at->format('d M Y'),
                    ];
               });

          return Inertia::render('Admin/Movies', [
               'movies' => $movies
          ]);
     }

     public function create()
     {
          return Inertia::render('Admin/Movies/Create');
     }

     public function store(Request $request)
     {
          try {
               Log::info('Received request data:', $request->all());

               $validated = $request->validate([
                    'title' => 'required|string|max:255',
                    'description' => 'required|string',
                    'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
                    'duration' => 'required|integer|min:1',
                    'rating' => 'required|numeric|min:0|max:10',
                    'genres' => 'required|array|min:1',
                    'genres.*' => 'string',
                    'cast' => 'required|array|min:1',
                    'cast.*' => 'string',
                    'director' => 'required|string',
                    'writer' => 'required|string',
                    'source_type' => 'required|in:local,url',
                    'poster' => $request->input('source_type') === 'local' ? 'required|file|mimes:jpeg,png,jpg,gif|max:10240' : 'nullable',
                    'video' => $request->input('source_type') === 'local' ? 'required|file|mimes:mp4,mov,avi|max:2097152' : 'nullable',
                    'poster_url' => $request->input('source_type') === 'url' ? 'required|url' : 'nullable',
                    'video_url' => $request->input('source_type') === 'url' ? 'required|url' : 'nullable',
               ]);

               Log::info('Validation passed');

               $movieData = [
                    'title' => $validated['title'],
                    'description' => $validated['description'],
                    'year' => (int) $validated['year'],
                    'duration' => (int) $validated['duration'],
                    'rating' => (float) $validated['rating'],
                    'genres' => $validated['genres'],
                    'cast' => $validated['cast'],
                    'director' => $validated['director'],
                    'writer' => $validated['writer'],
                    'status' => 'active',
                    'source_type' => $validated['source_type']
               ];

               if ($validated['source_type'] === 'local') {
                    // Handle poster upload
                    if ($request->hasFile('poster')) {
                         $poster = $request->file('poster');
                         Log::info('Uploading poster:', ['name' => $poster->getClientOriginalName()]);
                         $posterPath = $poster->store('posters', 'public');
                         $movieData['poster_url'] = $posterPath;
                    }

                    // Handle video upload
                    if ($request->hasFile('video')) {
                         $video = $request->file('video');
                         Log::info('Uploading video:', ['name' => $video->getClientOriginalName()]);
                         $videoPath = $video->store('videos', 'public');
                         $movieData['video_url'] = $videoPath;
                    }
               } else {
                    $movieData['poster_url'] = $validated['poster_url'];
                    $movieData['video_url'] = $validated['video_url'];
               }

               Log::info('Creating movie with data:', $movieData);

               $movie = Movie::create($movieData);

               Log::info('Movie created successfully:', ['movie_id' => $movie->id]);

               return redirect()->route('admin.movies')
                    ->with('message', 'Film berhasil ditambahkan!');

          } catch (\Exception $e) {
               Log::error('Error creating movie:', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
               ]);

               return back()
                    ->withInput()
                    ->withErrors(['error' => 'Terjadi kesalahan saat menambahkan film: ' . $e->getMessage()]);
          }
     }

     public function edit(Movie $movie)
     {
          return Inertia::render('Admin/Movies/Edit', [
               'movie' => array_merge($movie->toArray(), [
                    'poster_url' => $movie->poster_url,
                    'video_url' => $movie->video_url,
               ])
          ]);
     }

     public function update(Request $request, Movie $movie)
     {
          $validated = $request->validate([
               'title' => 'required|string|max:255',
               'description' => 'required|string',
               'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
               'duration' => 'required|integer|min:1',
               'rating' => 'required|numeric|min:0|max:10',
               'genres' => 'required|array|min:1',
               'genres.*' => 'string',
               'cast' => 'required|array|min:1',
               'cast.*' => 'string',
               'director' => 'required|string',
               'writer' => 'required|string',
               'source_type' => 'required|in:local,url',
               'poster' => $request->input('source_type') === 'local' ? 'nullable|image|mimes:jpeg,png,jpg|max:2048' : 'nullable',
               'video' => $request->input('source_type') === 'local' ? 'nullable|file|mimes:mp4,mov,avi|max:2097152' : 'nullable',
               'poster_url' => $request->input('source_type') === 'url' ? 'nullable|url' : 'nullable',
               'video_url' => $request->input('source_type') === 'url' ? 'nullable|url' : 'nullable',
               'status' => 'required|in:active,inactive',
          ]);

          $movieData = [
               'title' => $validated['title'],
               'description' => $validated['description'],
               'year' => $validated['year'],
               'duration' => $validated['duration'],
               'rating' => $validated['rating'],
               'genres' => $validated['genres'],
               'cast' => $validated['cast'],
               'director' => $validated['director'],
               'writer' => $validated['writer'],
               'status' => $validated['status'],
               'source_type' => $validated['source_type'],
          ];

          // Handle local files
          if ($validated['source_type'] === 'local') {
               // Update poster if provided
               if ($request->hasFile('poster')) {
                    if ($movie->poster_url && $movie->source_type === 'local') {
                         Storage::disk('public')->delete($movie->poster_url);
                    }
                    $movieData['poster_url'] = $request->file('poster')->store('posters', 'public');
               }

               // Update video if provided
               if ($request->hasFile('video')) {
                    if ($movie->video_url && $movie->source_type === 'local') {
                         Storage::disk('public')->delete($movie->video_url);
                    }
                    $movieData['video_url'] = $request->file('video')->store('videos', 'public');
               }
          }
          // Handle URLs
          else {
               if ($validated['poster_url']) {
                    if ($movie->poster_url && $movie->source_type === 'local') {
                         Storage::disk('public')->delete($movie->poster_url);
                    }
                    $movieData['poster_url'] = $validated['poster_url'];
               }
               if ($validated['video_url']) {
                    if ($movie->video_url && $movie->source_type === 'local') {
                         Storage::disk('public')->delete($movie->video_url);
                    }
                    $movieData['video_url'] = $validated['video_url'];
               }
          }

          $movie->update($movieData);

          return back()->with('message', 'Film berhasil diperbarui!');
     }

     public function destroy(Movie $movie)
     {
          // Delete local files only
          if ($movie->source_type === 'local') {
               if ($movie->poster_url) {
                    Storage::disk('public')->delete($movie->poster_url);
               }
               if ($movie->video_url) {
                    Storage::disk('public')->delete($movie->video_url);
               }
          }

          $movie->delete();

          return back()->with('message', 'Film berhasil dihapus!');
     }
}