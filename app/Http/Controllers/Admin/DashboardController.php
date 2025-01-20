<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use App\Models\User;
use App\Models\WatchHistory;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
     public function index()
     {
          // Statistik
          $stats = [
               'totalMovies' => Movie::count(),
               'totalUsers' => User::count(),
               'totalViews' => WatchHistory::count(),
               'totalWatchTime' => WatchHistory::sum('watch_duration') / 60, // Konversi ke jam
          ];

          // Film Terbaru
          $recentMovies = Movie::latest()
               ->take(4)
               ->get()
               ->map(function ($movie) {
                    $views = WatchHistory::where('movie_id', $movie->id)->count();
                    return array_merge($movie->toArray(), ['views' => $views]);
               });

          // Film Terpopuler
          $popularMovies = Movie::withCount('watchHistories as views')
               ->orderByDesc('views')
               ->take(4)
               ->get();

          // User Terbaru
          $recentUsers = User::latest()
               ->take(6)
               ->get();

          return Inertia::render('Admin/Dashboard', [
               'stats' => $stats,
               'recentMovies' => $recentMovies,
               'popularMovies' => $popularMovies,
               'recentUsers' => $recentUsers,
          ]);
     }
}