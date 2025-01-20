<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use App\Models\User;
use App\Models\WatchHistory;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StatisticsController extends Controller
{
    public function index()
    {
        // Total Users
        $totalUsers = User::count();
        $activeUsers = User::where('status', 'active')->count();
        $bannedUsers = User::where('status', 'banned')->count();

        // Total Movies
        $totalMovies = Movie::count();
        $featuredMovies = Movie::where('is_featured', true)->count();
        $activeMovies = Movie::where('status', 'active')->count();

        // Watch Statistics
        $totalWatches = WatchHistory::count();
        $uniqueWatchers = WatchHistory::distinct('user_id')->count('user_id');

        // Most Watched Movies (Top 5)
        $mostWatchedMovies = WatchHistory::select('movie_id', DB::raw('count(*) as total_watches'))
            ->with('movie:id,title,poster_url')
            ->groupBy('movie_id')
            ->orderByDesc('total_watches')
            ->limit(5)
            ->get();

        // Latest Registered Users (Last 5)
        $latestUsers = User::select('id', 'name', 'email', 'created_at')
            ->latest()
            ->limit(5)
            ->get();

        // Latest Watch Activities (Last 5)
        $latestActivities = WatchHistory::with(['user:id,name', 'movie:id,title'])
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Statistics', [
            'stats' => [
                'users' => [
                    'total' => $totalUsers,
                    'active' => $activeUsers,
                    'banned' => $bannedUsers,
                ],
                'movies' => [
                    'total' => $totalMovies,
                    'featured' => $featuredMovies,
                    'active' => $activeMovies,
                ],
                'watches' => [
                    'total' => $totalWatches,
                    'uniqueWatchers' => $uniqueWatchers,
                ],
                'mostWatchedMovies' => $mostWatchedMovies,
                'latestUsers' => $latestUsers,
                'latestActivities' => $latestActivities,
            ]
        ]);
    }
}
