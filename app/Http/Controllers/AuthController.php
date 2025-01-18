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
               ]);

               Auth::login($user);

               // Debug log untuk memeriksa status auth
               Log::info('User registered and logged in:', [
                    'user_id' => $user->id,
                    'is_authenticated' => Auth::check(),
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
          try {
               $credentials = $request->validate([
                    'email' => 'required|string|email',
                    'password' => 'required|string',
               ]);

               if (Auth::attempt($credentials, $request->boolean('remember'))) {
                    $request->session()->regenerate();

                    // Debug log untuk memeriksa status auth
                    Log::info('User logged in:', [
                         'user_id' => Auth::id(),
                         'is_authenticated' => Auth::check(),
                    ]);

                    return redirect()->intended(route('movies.latest'))
                         ->with('success', 'Login berhasil! Selamat datang kembali!');
               }

               return back()
                    ->withInput($request->except('password'))
                    ->with('error', 'Email atau password salah.');
          } catch (\Exception $e) {
               Log::error('Login error: ' . $e->getMessage());
               return back()
                    ->withInput($request->except('password'))
                    ->with('error', 'Terjadi kesalahan saat login. Silakan coba lagi.');
          }
     }

     public function logout(Request $request)
     {
          Auth::logout();
          $request->session()->invalidate();
          $request->session()->regenerateToken();

          return redirect()->route('home')
               ->with('success', 'Anda telah berhasil logout.');
     }
}