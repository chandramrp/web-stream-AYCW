<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Debug raw user data
        Log::info('Raw user data:', [
            'has_user' => $request->user() !== null,
            'session_id' => session()->getId(),
            'raw_user' => $request->user(),
        ]);

        $auth = [
            'user' => $request->user() ? [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'avatar' => $request->user()->avatar ?? null,
                'created_at' => $request->user()->created_at,
            ] : null,
            'authenticated' => $request->user() !== null,
        ];

        // Debug processed auth data
        Log::info('Processed auth data:', $auth);

        $shared = array_merge(parent::share($request), [
            'auth' => $auth,
            'flash' => [
                'message' => session('message'),
                'error' => session('error'),
                'success' => session('success'),
            ],
            'status' => session('status'),
        ]);

        // Debug final shared data
        Log::info('Final shared data:', [
            'has_auth' => isset($shared['auth']),
            'auth_data' => $shared['auth'],
        ]);

        return $shared;
    }
}
