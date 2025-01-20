<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MovieController extends Controller
{
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
               'video_url' => 'required|url',
               'poster_url' => 'required|url',
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
               'video_url' => 'required|url',
               'poster_url' => 'required|url',
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

          $movie->update($validated);

          return redirect()->route('admin.movies')->with('success', 'Film berhasil diperbarui');
     }

     public function destroy(Movie $movie)
     {
          $movie->delete();

          return redirect()->route('admin.movies')->with('success', 'Film berhasil dihapus');
     }
}