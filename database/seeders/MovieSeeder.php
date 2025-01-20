<?php

namespace Database\Seeders;

use App\Models\Movie;
use Illuminate\Database\Seeder;

class MovieSeeder extends Seeder
{
     public function run(): void
     {
          $movies = [
               [
                    'title' => 'The Dark Knight',
                    'description' => 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept
one of the greatest psychological and physical tests of his ability to fight injustice.',
                    'video_url' => 'https://example.com/videos/dark-knight.mp4',
                    'poster_url' => 'https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
                    'year' => 2008,
                    'duration' => 152,
                    'rating' => 9.0,
                    'genres' => ['Action', 'Crime', 'Drama', 'Thriller'],
                    'director' => 'Christopher Nolan',
                    'writer' => 'Jonathan Nolan, Christopher Nolan',
                    'cast' => ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'],
                    'is_featured' => true,
                    'status' => 'active'
               ],
               [
                    'title' => 'Inception',
                    'description' => 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse
task of planting an idea into the mind of a C.E.O.',
                    'video_url' => 'https://example.com/videos/inception.mp4',
                    'poster_url' => 'https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
                    'year' => 2010,
                    'duration' => 148,
                    'rating' => 8.8,
                    'genres' => ['Action', 'Adventure', 'Sci-Fi', 'Thriller'],
                    'director' => 'Christopher Nolan',
                    'writer' => 'Christopher Nolan',
                    'cast' => ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page', 'Tom Hardy'],
                    'is_featured' => true,
                    'status' => 'active'
               ],
               [
                    'title' => 'Interstellar',
                    'description' => 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
                    'video_url' => 'https://example.com/videos/interstellar.mp4',
                    'poster_url' => 'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
                    'year' => 2014,
                    'duration' => 169,
                    'rating' => 8.6,
                    'genres' => ['Adventure', 'Drama', 'Sci-Fi'],
                    'director' => 'Christopher Nolan',
                    'writer' => 'Jonathan Nolan, Christopher Nolan',
                    'cast' => ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
                    'is_featured' => true,
                    'status' => 'active'
               ],
               [
                    'title' => 'The Matrix',
                    'description' => 'A computer programmer discovers that reality as he knows it is a simulation created by machines, and
joins a rebellion to break free.',
                    'video_url' => 'https://example.com/videos/matrix.mp4',
                    'poster_url' => 'https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
                    'year' => 1999,
                    'duration' => 136,
                    'rating' => 8.7,
                    'genres' => ['Action', 'Sci-Fi'],
                    'director' => 'Lana Wachowski, Lilly Wachowski',
                    'writer' => 'Lana Wachowski, Lilly Wachowski',
                    'cast' => ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
                    'is_featured' => true,
                    'status' => 'active'
               ],
          ];

          foreach ($movies as $movie) {
               Movie::create($movie);
          }
     }
}