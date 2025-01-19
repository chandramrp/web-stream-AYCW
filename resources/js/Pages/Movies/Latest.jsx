import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import MovieGrid from "@/Components/MovieGrid";
import { FaFilter, FaSort, FaSearch } from "react-icons/fa";

export default function Latest() {
    // Data dummy untuk testing
    const latestMovies = [
        {
            id: 1,
            title: "The Dark Knight",
            poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            rating: 4.5,
            year: 2024,
            genres: ["Action", "Adventure"],
        },
        {
            id: 2,
            title: "Inception",
            poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
            rating: 4.2,
            year: 2024,
            genres: ["Drama", "Sci-Fi"],
        },
        {
            id: 3,
            title: "Interstellar",
            poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
            rating: 4.8,
            year: 2024,
            genres: ["Sci-Fi", "Adventure"],
        },
        {
            id: 4,
            title: "The Shawshank Redemption",
            poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
            rating: 4.9,
            year: 2024,
            genres: ["Drama"],
        },
        {
            id: 5,
            title: "Pulp Fiction",
            poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
            rating: 4.7,
            year: 2024,
            genres: ["Crime", "Drama"],
        },
        {
            id: 6,
            title: "The Matrix",
            poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
            rating: 4.6,
            year: 2024,
            genres: ["Action", "Sci-Fi"],
        },
    ];

    return (
        <MainLayout>
            {/* Hero Section dengan Background Gradient */}
            <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 pt-24 pb-12">
                <div className="absolute inset-0 bg-slate-900/50" />
                <div className="relative container mx-auto px-4">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            Film Terbaru
                        </h1>
                        <p className="text-lg text-slate-300 mb-8">
                            Jelajahi koleksi film terbaru dan terpopuler minggu
                            ini. Temukan film-film berkualitas dengan rating
                            tertinggi dari berbagai genre.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-slate-900 py-8">
                <div className="container mx-auto px-4">
                    {/* Filter & Search Section */}
                    <div className="mb-12">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Search Input */}
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari film..."
                                        className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                {/* Genre Filter */}
                                <div className="relative">
                                    <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <select className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                        <option value="">Semua Genre</option>
                                        <option value="action">Action</option>
                                        <option value="drama">Drama</option>
                                        <option value="comedy">Comedy</option>
                                        <option value="horror">Horror</option>
                                        <option value="sci-fi">Sci-Fi</option>
                                    </select>
                                </div>

                                {/* Year Filter */}
                                <div className="relative">
                                    <select className="w-full pl-4 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                        <option value="">Tahun Rilis</option>
                                        <option value="2024">2024</option>
                                        <option value="2023">2023</option>
                                        <option value="2022">2022</option>
                                        <option value="2021">2021</option>
                                        <option value="2020">2020</option>
                                    </select>
                                </div>

                                {/* Sort Filter */}
                                <div className="relative">
                                    <FaSort className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <select className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                        <option value="">Urutkan</option>
                                        <option value="rating">
                                            Rating Tertinggi
                                        </option>
                                        <option value="date">Terbaru</option>
                                        <option value="title">Judul A-Z</option>
                                        <option value="popular">
                                            Terpopuler
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Filters (if any) */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center">
                            Action
                            <button className="ml-2 hover:text-blue-300">
                                ×
                            </button>
                        </span>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center">
                            2024
                            <button className="ml-2 hover:text-blue-300">
                                ×
                            </button>
                        </span>
                    </div>

                    {/* Movies Grid */}
                    <MovieGrid movies={latestMovies} />

                    {/* Pagination */}
                    <div className="mt-12">
                        <div className="flex justify-center">
                            <nav className="flex items-center bg-slate-800/50 rounded-lg p-1">
                                <button className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors duration-200">
                                    Previous
                                </button>
                                <div className="flex space-x-1 mx-2">
                                    <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-600 text-white">
                                        1
                                    </button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded text-slate-400 hover:bg-slate-700 hover:text-white transition-colors duration-200">
                                        2
                                    </button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded text-slate-400 hover:bg-slate-700 hover:text-white transition-colors duration-200">
                                        3
                                    </button>
                                    <span className="w-8 h-8 flex items-center justify-center text-slate-400">
                                        ...
                                    </span>
                                    <button className="w-8 h-8 flex items-center justify-center rounded text-slate-400 hover:bg-slate-700 hover:text-white transition-colors duration-200">
                                        10
                                    </button>
                                </div>
                                <button className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors duration-200">
                                    Next
                                </button>
                            </nav>
                        </div>
                        <p className="text-center text-sm text-slate-400 mt-4">
                            Menampilkan 1-12 dari 120 film
                        </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
