<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WatchHistoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Movie;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\WatchController;

// Public Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/watch/{movie}', [WatchController::class, 'show'])->name('watch.show');

// Guest Routes (Only for non-authenticated users)
Route::middleware('guest')->group(function () {
    // Auth Routes
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');

    // Login dengan rate limit 5 request per menit
    Route::post('/login', [AuthController::class, 'login'])
        ->middleware('throttle:5,1')
        ->name('login.post');

    // Register dengan rate limit 3 request per menit
    Route::post('/register', [AuthController::class, 'register'])
        ->middleware('throttle:3,1')
        ->name('register.post');
});

// Protected Routes (Only for authenticated users)
Route::middleware('auth')->group(function () {
    // Auth Routes
    Route::post('/logout', [AuthController::class, 'logout'])
        ->name('logout');

    // Movies Routes
    Route::get('/movies/{id}/watch', function ($id) {
        $movie = Movie::findOrFail($id);

        // Get related movies (same genre)
        $relatedMovies = Movie::where('id', '!=', $movie->id)
            ->whereJsonContains('genres', $movie->genres[0])
            ->take(2)
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
    })->name('movies.watch');

    // User Routes
    Route::prefix('user')->group(function () {
        Route::get('/profile', function () {
            return Inertia::render('User/Profile');
        })->name('profile');

        Route::get('/watchlist', function () {
            return Inertia::render('User/Watchlist');
        })->name('watchlist');

        Route::get('/settings', [UserController::class, 'settings'])
            ->name('user.settings');

        Route::post('/settings', [UserController::class, 'updateProfile'])
            ->name('user.settings.update');
    });

    // Watch History routes
    Route::get('/user/history', [WatchHistoryController::class, 'index'])->name('user.history');
    Route::post('/movies/{movie}/watch-progress', [WatchHistoryController::class, 'store'])->name('watch-history.store');
    Route::delete('/watch-history/{history}', [WatchHistoryController::class, 'destroy'])->name('watch-history.destroy');
});

// Admin Routes (Only for admin users)
Route::group(['middleware' => ['auth', \App\Http\Middleware\AdminMiddleware::class], 'prefix' => 'admin', 'as' => 'admin.'], function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');

    // Movie Management Routes
    Route::get('/movies', [\App\Http\Controllers\Admin\MovieController::class, 'index'])->name('movies');
    Route::get('/movies/create', [\App\Http\Controllers\Admin\MovieController::class, 'create'])->name('movies.create');
    Route::post('/movies', [\App\Http\Controllers\Admin\MovieController::class, 'store'])->name('movies.store');
    Route::get('/movies/{movie}/edit', [\App\Http\Controllers\Admin\MovieController::class, 'edit'])->name('movies.edit');
    Route::put('/movies/{movie}', [\App\Http\Controllers\Admin\MovieController::class, 'update'])->name('movies.update');
    Route::delete('/movies/{movie}', [\App\Http\Controllers\Admin\MovieController::class, 'destroy'])->name('movies.destroy');

    // User Management Routes
    Route::get('/users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('users');
    Route::post('/users', [\App\Http\Controllers\Admin\UserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [\App\Http\Controllers\Admin\UserController::class, 'update'])->name('users.update');
    Route::post('/users/{user}/status', [\App\Http\Controllers\Admin\UserController::class, 'updateStatus'])->name('users.status');
    Route::delete('/users/{user}', [\App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('users.destroy');

    Route::get('/statistics', [\App\Http\Controllers\Admin\StatisticsController::class, 'index'])->name('statistics');
});
