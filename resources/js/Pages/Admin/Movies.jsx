import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function Movies() {
    // Dummy data untuk testing
    const movies = [
        {
            id: 1,
            title: "The Dark Knight",
            genre: "Action, Crime, Drama",
            year: 2008,
            rating: 4.8,
            status: "Published",
        },
        {
            id: 2,
            title: "Inception",
            genre: "Action, Sci-Fi, Thriller",
            year: 2010,
            rating: 4.7,
            status: "Published",
        },
        {
            id: 3,
            title: "Interstellar",
            genre: "Adventure, Drama, Sci-Fi",
            year: 2014,
            rating: 4.6,
            status: "Draft",
        },
    ];

    return (
        <MainLayout>
            <Head title="Kelola Film" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-slate-200">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold">
                                    Kelola Film
                                </h1>
                                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                    <FaPlus className="mr-2" />
                                    Tambah Film
                                </button>
                            </div>

                            {/* Search and Filter */}
                            <div className="mb-6 flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Cari film..."
                                    className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Semua Genre</option>
                                    <option value="action">Action</option>
                                    <option value="drama">Drama</option>
                                    <option value="comedy">Comedy</option>
                                </select>
                                <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Semua Status</option>
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>

                            {/* Movies Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left border-b border-slate-700">
                                            <th className="pb-3 pr-4">Judul</th>
                                            <th className="pb-3 pr-4">Genre</th>
                                            <th className="pb-3 pr-4">Tahun</th>
                                            <th className="pb-3 pr-4">
                                                Rating
                                            </th>
                                            <th className="pb-3 pr-4">
                                                Status
                                            </th>
                                            <th className="pb-3">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {movies.map((movie) => (
                                            <tr
                                                key={movie.id}
                                                className="border-b border-slate-700"
                                            >
                                                <td className="py-4 pr-4">
                                                    {movie.title}
                                                </td>
                                                <td className="py-4 pr-4">
                                                    {movie.genre}
                                                </td>
                                                <td className="py-4 pr-4">
                                                    {movie.year}
                                                </td>
                                                <td className="py-4 pr-4">
                                                    ★ {movie.rating}
                                                </td>
                                                <td className="py-4 pr-4">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs ${
                                                            movie.status ===
                                                            "Published"
                                                                ? "bg-green-500/20 text-green-400"
                                                                : "bg-yellow-500/20 text-yellow-400"
                                                        }`}
                                                    >
                                                        {movie.status}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <div className="flex gap-2">
                                                        <button className="p-2 text-blue-400 hover:text-blue-300 transition-colors duration-200">
                                                            <FaEdit />
                                                        </button>
                                                        <button className="p-2 text-red-400 hover:text-red-300 transition-colors duration-200">
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-6 flex justify-between items-center">
                                <p className="text-sm text-slate-400">
                                    Menampilkan 1-3 dari 3 film
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors duration-200"
                                        disabled
                                    >
                                        Previous
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors duration-200"
                                        disabled
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
