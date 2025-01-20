<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Inertia\Inertia;
use Illuminate\Http\Request;

class WatchController extends Controller
{
     public function show(Movie $movie)
     {
          // Pastikan film aktif
          if ($movie->status !== 'active') {
               abort(404);
          }

          // Get related movies (same genre)
          $relatedMovies = Movie::where('id', '!=', $movie->id)
               ->whereJsonContains('genres', $movie->genres[0])
               ->take(3)
               ->get()
               ->map(function ($movie) {
                    return [
                         'id' => $movie->id,
                         'title' => $movie->title,
                         'poster_url' => $movie->poster_url,
                         'year' => $movie->year,
                         'duration' => $movie->duration . ' menit'
                    ];
               });

          return Inertia::render('Movies/Watch', [
               'movie' => array_merge($movie->toArray(), [
                    'related_movies' => $relatedMovies
               ])
          ]);
     }
}