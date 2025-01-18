<?php

use App\Http\Controllers\AuthController;
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

    // User Routes
    Route::prefix('user')->group(function () {
        Route::get('/profile', function () {
            return Inertia::render('User/Profile');
        })->name('profile');

        Route::get('/watchlist', function () {
            return Inertia::render('User/Watchlist');
        })->name('watchlist');

        Route::get('/settings', function () {
            return Inertia::render('User/Settings');
        })->name('settings');
    });
});
