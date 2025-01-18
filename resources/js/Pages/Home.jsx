import MainLayout from "../Layouts/MainLayout";
import Hero from "../Components/Hero";
import MovieGrid from "../Components/MovieGrid";

// Sample data
const sampleMovies = [
    {
        id: 1,
        title: "The Dark Knight",
        poster_url:
            "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        rating: 8.9,
        year: 2008,
        genres: ["Action", "Crime", "Drama"],
    },
    {
        id: 2,
        title: "Inception",
        poster_url:
            "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        rating: 8.8,
        year: 2010,
        genres: ["Action", "Sci-Fi", "Thriller"],
    },
    {
        id: 3,
        title: "Interstellar",
        poster_url:
            "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        rating: 8.6,
        year: 2014,
        genres: ["Adventure", "Drama", "Sci-Fi"],
    },
    {
        id: 4,
        title: "The Shawshank Redemption",
        poster_url:
            "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        rating: 9.3,
        year: 1994,
        genres: ["Drama", "Crime"],
    },
    {
        id: 5,
        title: "Pulp Fiction",
        poster_url:
            "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        rating: 8.9,
        year: 1994,
        genres: ["Crime", "Drama"],
    },
    {
        id: 6,
        title: "The Matrix",
        poster_url:
            "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        rating: 8.7,
        year: 1999,
        genres: ["Action", "Sci-Fi"],
    },
];

export default function Home() {
    return (
        <MainLayout>
            <Hero />
            <div className="bg-slate-900">
                <MovieGrid title="Film Populer" movies={sampleMovies} />
                <MovieGrid title="Film Terbaru" movies={sampleMovies} />
            </div>
        </MainLayout>
    );
}
