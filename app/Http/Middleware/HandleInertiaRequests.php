<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Middleware;
use App\Models\User;

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
        $user = $request->user();
        $userData = null;

        if ($user) {
            // Get fresh user data
            $freshUser = User::find($user->id);

            // Debug log
            Log::info('User data in HandleInertiaRequests:', [
                'raw_user' => $freshUser->toArray(),
                'role' => $freshUser->role,
                'status' => $freshUser->status,
                'is_admin' => $freshUser->isAdmin()
            ]);

            // Build user data
            $userData = [
                'id' => $freshUser->id,
                'name' => $freshUser->name,
                'email' => $freshUser->email,
                'role' => $freshUser->role,
                'status' => $freshUser->status,
                'is_admin' => $freshUser->isAdmin(),
                'avatar' => $freshUser->avatar,
                'created_at' => $freshUser->created_at
            ];
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $userData
            ],
            'flash' => [
                'message' => fn() => $request->session()->get('message'),
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error')
            ]
        ]);
    }
}
