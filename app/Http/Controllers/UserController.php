<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class UserController extends Controller
{
     public function settings()
     {
          return Inertia::render('User/Settings', [
               'user' => auth()->user()
          ]);
     }

     public function updateProfile(Request $request)
     {
          $user = auth()->user();

          $validated = $request->validate([
               'name' => 'required|string|max:255',
               'email' => 'required|email|unique:users,email,' . $user->id,
               'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
               'current_password' => 'required_with:password',
               'password' => ['nullable', 'required_with:current_password', Password::defaults(), 'confirmed'],
          ]);

          // Cek password saat ini jika user ingin mengubah password
          if ($request->filled('current_password')) {
               if (!Hash::check($request->current_password, $user->password)) {
                    return back()->withErrors([
                         'current_password' => 'Password saat ini tidak sesuai.'
                    ]);
               }
          }

          // Update avatar jika ada
          if ($request->hasFile('avatar')) {
               // Hapus avatar lama jika ada
               if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                    Storage::disk('public')->delete($user->avatar);
               }

               // Simpan avatar baru
               $path = $request->file('avatar')->store('avatars', 'public');
               $user->avatar = $path;
          }

          // Update informasi dasar
          $user->name = $validated['name'];
          $user->email = $validated['email'];

          // Update password jika ada
          if ($request->filled('password')) {
               $user->password = Hash::make($validated['password']);
          }

          $user->save();

          return back()->with('success', 'Profil berhasil diperbarui!');
     }
}