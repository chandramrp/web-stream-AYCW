<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
     public function index()
     {
          $users = User::latest()
               ->select('id', 'name', 'email', 'role', 'status', 'last_login_at', 'created_at')
               ->get();

          return Inertia::render('Admin/Users', [
               'users' => $users
          ]);
     }

     public function store(Request $request)
     {
          $validated = $request->validate([
               'name' => 'required|string|max:255',
               'email' => 'required|string|email|max:255|unique:users',
               'password' => 'required|string|min:8',
               'role' => 'required|in:admin,user',
               'status' => 'required|in:active,inactive,banned'
          ]);

          $validated['password'] = bcrypt($validated['password']);
          $validated['email_verified_at'] = now();

          User::create($validated);

          return redirect()->back()->with('success', 'User berhasil ditambahkan');
     }

     public function update(Request $request, User $user)
     {
          $validated = $request->validate([
               'name' => 'required|string|max:255',
               'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
               'role' => 'required|in:admin,user',
               'status' => 'required|in:active,inactive,banned',
               'password' => 'nullable|string|min:8'
          ]);

          if (isset($validated['password'])) {
               $validated['password'] = bcrypt($validated['password']);
          } else {
               unset($validated['password']);
          }

          $user->update($validated);

          return redirect()->back()->with('success', 'User berhasil diperbarui');
     }

     public function updateStatus(User $user, Request $request)
     {
          $validated = $request->validate([
               'status' => 'required|in:active,inactive,banned'
          ]);

          $user->update($validated);

          return redirect()->back()->with('success', 'Status user berhasil diperbarui');
     }

     public function destroy(User $user)
     {
          // Prevent deleting self
          if ($user->id === auth()->id()) {
               return redirect()->back()->with('error', 'Anda tidak dapat menghapus akun Anda sendiri');
          }

          $user->delete();

          return redirect()->back()->with('success', 'User berhasil dihapus');
     }
}
