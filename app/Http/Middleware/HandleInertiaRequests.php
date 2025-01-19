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
                'status' => $freshUser->status
            ]);

            // Build user data
            $userData = array_merge($freshUser->only(
                'id',
                'name',
                'email',
                'role',
                'status',
                'avatar',
                'created_at'
            ), [
                'is_admin' => $freshUser->role === 'admin'
            ]);
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $userData
            ],
            'flash' => [
                'message' => $request->session()->get('message'),
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error')
            ]
        ]);
    }
}
