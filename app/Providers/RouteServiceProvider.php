<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
     public const HOME = '/movies/latest';

     public function boot(): void
     {
          RateLimiter::for('api', function (Request $request) {
               return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
          });

          // Rate limiter untuk login
          RateLimiter::for('login', function (Request $request) {
               return Limit::perMinute(5)->by($request->ip());
          });

          // Rate limiter untuk register
          RateLimiter::for('register', function (Request $request) {
               return Limit::perMinute(3)->by($request->ip());
          });

          $this->routes(function () {
               Route::middleware('api')
                    ->prefix('api')
                    ->group(base_path('routes/api.php'));

               Route::middleware('web')
                    ->group(base_path('routes/web.php'));
          });
     }
}