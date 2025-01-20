<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WatchHistoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

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
    Route::get('/movies/latest', function () {
        return Inertia::render('Movies/Latest');
    })->name('movies.latest');

    Route::get('/movies/{id}/watch', function ($id) {
        // TODO: Fetch movie data from database
        $movie = [
            'id' => $id,
            'title' => 'The Dark Knight',
            'description' => 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
            'video_url' => 'https://example.com/video.mp4', // Ganti dengan URL video yang sebenarnya
            'poster_url' => 'https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
            'year' => 2008,
            'duration' => '2h 32m',
            'rating' => 9.0,
            'genres' => ['Action', 'Crime', 'Drama', 'Thriller'],
            'director' => 'Christopher Nolan',
            'writer' => 'Jonathan Nolan, Christopher Nolan',
            'cast' => ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'],
            'related_movies' => [
                [
                    'id' => 2,
                    'title' => 'Batman Begins',
                    'poster_url' => 'https://image.tmdb.org/t/p/w500/8RW2runSEc34IwKN2D1aPcJd2UL.jpg',
                    'year' => 2005,
                    'duration' => '2h 20m'
                ],
                [
                    'id' => 3,
                    'title' => 'The Dark Knight Rises',
                    'poster_url' => 'https://image.tmdb.org/t/p/w500/hrJUZ5Jo2G3Czy391evhlxgbEdJ.jpg',
                    'year' => 2012,
                    'duration' => '2h 44m'
                ]
            ]
        ];

        return Inertia::render('Movies/Watch', [
            'movie' => $movie
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
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::get('/movies', function () {
        return Inertia::render('Admin/Movies');
    })->name('movies');

    Route::get('/users', function () {
        return Inertia::render('Admin/Users');
    })->name('users');

    Route::get('/statistics', function () {
        return Inertia::render('Admin/Statistics');
    })->name('statistics');
});
