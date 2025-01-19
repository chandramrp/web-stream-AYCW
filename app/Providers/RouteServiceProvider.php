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
          $this->configureRateLimiting();

          // Register admin middleware
          $this->app['router']->aliasMiddleware('admin', \App\Http\Middleware\AdminMiddleware::class);

          $this->routes(function () {
               Route::middleware('api')
                    ->prefix('api')
                    ->group(base_path('routes/api.php'));

               Route::middleware('web')
                    ->group(base_path('routes/web.php'));
          });
     }
}