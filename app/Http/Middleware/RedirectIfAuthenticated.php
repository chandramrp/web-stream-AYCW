<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
     public function handle(Request $request, Closure $next, string ...$guards): Response
     {
          $guards = empty($guards) ? [null] : $guards;

          foreach ($guards as $guard) {
               if (Auth::guard($guard)->check()) {
                    // Debug log untuk memeriksa redirect
                    Log::info('RedirectIfAuthenticated: User is authenticated', [
                         'user_id' => Auth::id(),
                         'intended_url' => $request->intended(),
                    ]);

                    if ($request->expectsJson()) {
                         return response()->json(['error' => 'Already authenticated.'], 200);
                    }

                    return redirect()->intended(route('movies.latest'));
               }
          }

          return $next($request);
     }
}