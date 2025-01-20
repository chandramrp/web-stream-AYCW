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
          $histories = WatchHistory::with('movie')
               ->where('user_id', Auth::id())
               ->latest()
               ->get()
               ->map(function ($history) {
                    return [
                         'id' => $history->id,
                         'movie' => [
                              'id' => $history->movie->id,
                              'title' => $history->movie->title,
                              'poster_url' => $history->movie->poster_url,
                              'year' => $history->movie->year,
                              'duration' => $history->movie->duration,
                              'genres' => $history->movie->genres,
                         ],
                         'progress' => $history->progress,
                         'last_watched_at' => $history->updated_at->diffForHumans(),
                    ];
               });

          return Inertia::render('User/History', [
               'histories' => $histories
          ]);
     }

     public function store(Request $request)
     {
          $validated = $request->validate([
               'movie_id' => 'required|exists:movies,id',
               'progress' => 'required|numeric|min:0|max:100',
          ]);

          WatchHistory::updateOrCreate(
               [
                    'user_id' => Auth::id(),
                    'movie_id' => $validated['movie_id'],
               ],
               [
                    'progress' => $validated['progress'],
               ]
          );

          return response()->json(['message' => 'Progress updated successfully']);
     }

     public function destroy(WatchHistory $history)
     {
          // Pastikan user hanya bisa menghapus riwayat tontonannya sendiri
          if ($history->user_id !== Auth::id()) {
               abort(403);
          }

          $history->delete();

          return back()->with('message', 'Riwayat berhasil dihapus');
     }
}