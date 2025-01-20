<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $query = Movie::where('status', 'active');

        // Filter by genre if provided
        if ($request->has('genre')) {
            $genre = $request->genre;
            $query->whereJsonContains('genres', ucfirst($genre));
        }

        // Search by title if search query provided
        if ($request->has('search')) {
            $search = $request->search;
            $query->where('title', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%')
                ->orWhereJsonContains('genres', $search)
                ->orWhereJsonContains('cast', $search);
        }

        $movies = $query->latest()
            ->get()
            ->map(function ($movie) {
                return [
                    'id' => $movie->id,
                    'title' => $movie->title,
                    'poster' => $movie->poster_url,
                    'rating' => $movie->rating,
                    'year' => $movie->year,
                    'genres' => $movie->genres,
                ];
            });

        return Inertia::render('Home', [
            'movies' => $movies,
            'activeGenre' => $request->genre,
            'searchQuery' => $request->search
        ]);
    }
}
