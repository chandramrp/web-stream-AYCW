<?php

namespace App\Http\Controllers;

use App\Models\WatchHistory;
use App\Models\Movie;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class WatchHistoryController extends Controller
{
     public function index()
     {
          $watchHistory = WatchHistory::with('movie')
               ->where('user_id', Auth::id())
               ->orderBy('last_watched_at', 'desc')
               ->get();

          return Inertia::render('User/History', [
               'watchHistory' => $watchHistory
          ]);
     }

     public function store(Request $request, Movie $movie)
     {
          $history = WatchHistory::firstOrNew([
               'user_id' => Auth::id(),
               'movie_id' => $movie->id,
          ]);

          if (!$history->exists) {
               $history->watched_at = now();
          }

          $history->updateProgress($request->input('duration', 0));

          return response()->json([
               'message' => 'Progress updated successfully',
               'history' => $history
          ]);
     }

     public function destroy(WatchHistory $history)
     {
          // Pastikan user hanya bisa menghapus riwayat tontonannya sendiri
          if ($history->user_id !== Auth::id()) {
               abort(403);
          }

          $history->delete();

          return redirect()->back()->with('success', 'Riwayat tontonan berhasil dihapus');
     }
}