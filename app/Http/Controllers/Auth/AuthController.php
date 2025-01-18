<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AuthController extends Controller
{
     public function showLogin()
     {
          return Inertia::render('Auth/Login');
     }

     public function showRegister()
     {
          return Inertia::render('Auth/Register');
     }

     public function login(Request $request)
     {
          try {
               $credentials = $request->validate([
                    'email' => ['required', 'string', 'email'],
                    'password' => ['required', 'string'],
               ]);

               if (!Auth::attempt($credentials, $request->boolean('remember'))) {
                    throw ValidationException::withMessages([
                         'email' => __('auth.failed'),
                    ]);
               }

               $request->session()->regenerate();

               return redirect()->intended('/');
          } catch (ValidationException $e) {
               return back()->withErrors($e->errors());
          } catch (\Exception $e) {
               Log::error('Login error: ' . $e->getMessage());
               return back()->withErrors([
                    'email' => 'Terjadi kesalahan saat login. Silakan coba lagi.',
               ]);
          }
     }

     public function register(Request $request)
     {
          try {
               Log::info('Register attempt', ['email' => $request->email]);

               $validated = $request->validate([
                    'name' => ['required', 'string', 'max:255'],
                    'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                    'password' => ['required', 'string', 'min:8', 'confirmed'],
                    'password_confirmation' => ['required'],
               ]);

               Log::info('Validation passed, creating user');

               $user = User::create([
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                    'password' => Hash::make($validated['password']),
               ]);

               Log::info('User created', ['user_id' => $user->id]);

               Auth::login($user);

               $request->session()->regenerate();

               Log::info('User logged in after registration', ['user_id' => $user->id]);

               return redirect('/');
          } catch (ValidationException $e) {
               Log::warning('Registration validation failed', ['errors' => $e->errors()]);
               return back()->withErrors($e->errors())->withInput($request->except('password', 'password_confirmation'));
          } catch (\Exception $e) {
               Log::error('Registration error: ' . $e->getMessage());
               return back()->withErrors([
                    'email' => 'Terjadi kesalahan saat registrasi. Silakan coba lagi.',
               ])->withInput($request->except('password', 'password_confirmation'));
          }
     }

     public function logout(Request $request)
     {
          Auth::guard('web')->logout();

          $request->session()->invalidate();
          $request->session()->regenerateToken();

          return redirect('/');
     }
}