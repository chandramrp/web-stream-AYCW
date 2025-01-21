<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MovieController extends Controller
{
     private function getGoogleDriveDirectLink($url)
     {
          if (strpos($url, 'drive.google.com') !== false) {
               // Extract file ID from Google Drive URL
               preg_match('/[-\w]{25,}/', $url, $matches);
               $fileId = $matches[0] ?? null;

               if ($fileId) {
                    // For video files
                    if (strpos($url, '/file/d/') !== false) {
                         return "https://drive.google.com/file/d/" . $fileId . "/preview";
                    }
                    // For images/posters
                    else if (strpos($url, '/open?id=') !== false || strpos($url, '/photos/') !== false || strpos($url, '/file/d/') !== false) {
                         return "https://drive.google.com/thumbnail?id=" . $fileId . "&sz=w1000";
                    }
               }
          }
          return $url;
     }

     public function index()
     {
          $movies = Movie::latest()->get();

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
          $validated = $request->validate([
               'title' => 'required|string|max:255',
               'description' => 'required|string',
               'video_url' => 'required|string',
               'poster_url' => 'required|string',
               'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
               'duration' => 'required|integer|min:1',
               'rating' => 'required|numeric|min:0|max:10',
               'genres' => 'required|array|min:1',
               'genres.*' => 'string',
               'director' => 'required|string|max:255',
               'writer' => 'required|string|max:255',
               'cast' => 'required|array|min:1',
               'cast.*' => 'string',
               'is_featured' => 'boolean',
               'status' => 'required|in:active,inactive,coming_soon',
          ]);

          // Convert Google Drive URLs to direct links
          $validated['video_url'] = $this->getGoogleDriveDirectLink($validated['video_url']);
          $validated['poster_url'] = $this->getGoogleDriveDirectLink($validated['poster_url']);

          Movie::create($validated);

          return redirect()->route('admin.movies')->with('success', 'Film berhasil ditambahkan');
     }

     public function edit(Movie $movie)
     {
          return Inertia::render('Admin/Movies/Edit', [
               'movie' => $movie
          ]);
     }

     public function update(Request $request, Movie $movie)
     {
          $validated = $request->validate([
               'title' => 'required|string|max:255',
               'description' => 'required|string',
               'video_url' => 'required|string',
               'poster_url' => 'required|string',
               'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
               'duration' => 'required|integer|min:1',
               'rating' => 'required|numeric|min:0|max:10',
               'genres' => 'required|array|min:1',
               'genres.*' => 'string',
               'director' => 'required|string|max:255',
               'writer' => 'required|string|max:255',
               'cast' => 'required|array|min:1',
               'cast.*' => 'string',
               'is_featured' => 'boolean',
               'status' => 'required|in:active,inactive,coming_soon',
          ]);

          // Convert Google Drive URLs to direct links
          $validated['video_url'] = $this->getGoogleDriveDirectLink($validated['video_url']);
          $validated['poster_url'] = $this->getGoogleDriveDirectLink($validated['poster_url']);

          $movie->update($validated);

          return redirect()->route('admin.movies')->with('success', 'Film berhasil diperbarui');
     }

     public function destroy(Movie $movie)
     {
          $movie->delete();

          return redirect()->route('admin.movies')->with('success', 'Film berhasil dihapus');
     }
}