<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AuthController extends Controller
{
     public function register(Request $request)
     {
          try {
               $validated = $request->validate([
                    'name' => 'required|string|max:255',
                    'email' => 'required|string|email|max:255|unique:users',
                    'password' => 'required|string|min:8|confirmed',
               ]);

               $user = User::create([
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                    'password' => Hash::make($validated['password']),
                    'role' => 'user',
                    'status' => 'active'
               ]);

               Auth::login($user);

               Log::info('User registered successfully', [
                    'user_id' => $user->id,
                    'user_role' => $user->role,
               ]);

               return redirect()->intended(route('movies.latest'))
                    ->with('success', 'Registrasi berhasil! Selamat datang!');
          } catch (\Exception $e) {
               Log::error('Registration error: ' . $e->getMessage());
               return back()
                    ->withInput($request->except('password', 'password_confirmation'))
                    ->with('error', 'Terjadi kesalahan saat registrasi. Silakan coba lagi.');
          }
     }

     public function login(Request $request)
     {
          $credentials = $request->validate([
               'email' => 'required|email',
               'password' => 'required'
          ]);

          try {
               if (Auth::attempt($credentials, $request->remember)) {
                    $request->session()->regenerate();

                    // Update last login
                    $user = Auth::user();
                    $user->last_login_at = now();
                    $user->save();

                    // Debug log untuk memeriksa data user
                    Log::info('User logged in successfully', [
                         'user_id' => $user->id,
                         'user_role' => $user->role,
                         'is_admin' => $user->role === 'admin',
                    ]);

                    // Redirect based on role
                    if ($user->role === 'admin') {
                         Log::info('Redirecting admin user to dashboard');
                         return redirect()->intended(route('admin.dashboard'));
                    }

                    Log::info('Redirecting regular user to movies page');
                    return redirect()->intended(route('movies.latest'));
               }

               Log::warning('Failed login attempt', ['email' => $request->email]);
               return back()->withErrors([
                    'email' => 'Email atau password salah.',
               ])->withInput($request->except('password'));

          } catch (\Exception $e) {
               Log::error('Login error', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
               ]);
               return back()->withErrors([
                    'error' => 'Terjadi kesalahan saat login. Silakan coba lagi.',
               ]);
          }
     }

     public function logout(Request $request)
     {
          try {
               Auth::logout();
               $request->session()->invalidate();
               $request->session()->regenerateToken();

               return redirect()->route('home');
          } catch (\Exception $e) {
               Log::error('Logout error', ['error' => $e->getMessage()]);
               return back()->withErrors([
                    'error' => 'Terjadi kesalahan saat logout. Silakan coba lagi.',
               ]);
          }
     }
}