import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import MovieGrid from "@/Components/MovieGrid";

export default function Latest() {
    // Data dummy untuk testing
    const latestMovies = [
        {
            id: 1,
            title: "Film 1",
            poster: "https://via.placeholder.com/300x450",
            rating: 4.5,
            year: 2024,
            genres: ["Action", "Adventure"],
        },
        {
            id: 2,
            title: "Film 2",
            poster: "https://via.placeholder.com/300x450",
            rating: 4.2,
            year: 2024,
            genres: ["Drama", "Romance"],
        },
        {
            id: 3,
            title: "Film 3",
            poster: "https://via.placeholder.com/300x450",
            rating: 4.8,
            year: 2024,
            genres: ["Sci-Fi", "Thriller"],
        },
        // Tambahkan lebih banyak film dummy jika diperlukan
    ];

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-slate-200 mb-4">
                        Film Terbaru
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Jelajahi koleksi film terbaru dan terpopuler minggu ini
                    </p>
                </div>

                {/* Filter Section */}
                <div className="mb-8 flex flex-wrap gap-4">
                    <select className="bg-slate-800 text-slate-200 rounded-md px-4 py-2 border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Semua Genre</option>
                        <option value="action">Action</option>
                        <option value="drama">Drama</option>
                        <option value="comedy">Comedy</option>
                    </select>

                    <select className="bg-slate-800 text-slate-200 rounded-md px-4 py-2 border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Tahun Rilis</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                    </select>

                    <select className="bg-slate-800 text-slate-200 rounded-md px-4 py-2 border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Urutkan</option>
                        <option value="rating">Rating Tertinggi</option>
                        <option value="date">Terbaru</option>
                        <option value="title">Judul A-Z</option>
                    </select>
                </div>

                {/* Movies Grid */}
                <MovieGrid movies={latestMovies} />

                {/* Pagination */}
                <div className="mt-12 flex justify-center">
                    <nav className="flex items-center space-x-2">
                        <button className="px-4 py-2 text-sm bg-slate-800 text-slate-300 rounded-md hover:bg-slate-700 transition-colors duration-200">
                            Previous
                        </button>
                        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md">
                            1
                        </button>
                        <button className="px-4 py-2 text-sm bg-slate-800 text-slate-300 rounded-md hover:bg-slate-700 transition-colors duration-200">
                            2
                        </button>
                        <button className="px-4 py-2 text-sm bg-slate-800 text-slate-300 rounded-md hover:bg-slate-700 transition-colors duration-200">
                            3
                        </button>
                        <button className="px-4 py-2 text-sm bg-slate-800 text-slate-300 rounded-md hover:bg-slate-700 transition-colors duration-200">
                            Next
                        </button>
                    </nav>
                </div>
            </div>
        </MainLayout>
    );
}
