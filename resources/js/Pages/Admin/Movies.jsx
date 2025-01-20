import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaEye,
    FaSearch,
    FaFilter,
} from "react-icons/fa";

export default function Movies({ auth, movies, flash }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const handleDelete = (movieId) => {
        if (confirm("Apakah Anda yakin ingin menghapus film ini?")) {
            router.post(`/admin/movies/${movieId}`, {
                _method: "DELETE",
            });
        }
    };

    const filteredMovies = movies.filter((movie) => {
        const matchesSearch = movie.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesStatus =
            filterStatus === "all" || movie.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <MainLayout user={auth.user}>
            <Head title="Kelola Film" />
            <div className="min-h-screen bg-slate-900 pt-20">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-white">
                            Kelola Film
                        </h1>
                        <button
                            onClick={() => router.visit("/admin/movies/create")}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center transition-colors duration-200"
                        >
                            <FaPlus className="mr-2" />
                            Tambah Film
                        </button>
                    </div>

                    {/* Flash Message */}
                    {flash?.success && (
                        <div className="bg-green-500 text-white px-6 py-4 rounded-lg mb-8">
                            {flash.success}
                        </div>
                    )}

                    {/* Search and Filter */}
                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Cari film..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full bg-slate-700 text-white rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                />
                                <FaSearch className="absolute left-4 top-3.5 text-slate-400" />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaFilter className="text-slate-400 text-lg" />
                            <select
                                value={filterStatus}
                                onChange={(e) =>
                                    setFilterStatus(e.target.value)
                                }
                                className="bg-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            >
                                <option value="all">Semua Status</option>
                                <option value="active">Aktif</option>
                                <option value="inactive">Nonaktif</option>
                                <option value="coming_soon">Coming Soon</option>
                            </select>
                        </div>
                    </div>

                    {/* Movies Table */}
                    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-700">
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                            Film
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                            Tahun
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                            Durasi
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                            Rating
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-white">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {filteredMovies.map((movie) => (
                                        <tr
                                            key={movie.id}
                                            className="hover:bg-slate-700/50 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <img
                                                        src={movie.poster_url}
                                                        alt={movie.title}
                                                        className="w-12 h-16 object-cover rounded shadow-md"
                                                    />
                                                    <div className="ml-4">
                                                        <div className="text-white font-medium">
                                                            {movie.title}
                                                        </div>
                                                        <div className="text-slate-400 text-sm mt-1">
                                                            {movie.genres.join(
                                                                ", "
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-300">
                                                {movie.year}
                                            </td>
                                            <td className="px-6 py-4 text-slate-300">
                                                {movie.duration} menit
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {movie.rating}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                                        movie.status ===
                                                        "active"
                                                            ? "bg-green-100 text-green-800"
                                                            : movie.status ===
                                                              "coming_soon"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                                >
                                                    {movie.status === "active"
                                                        ? "Aktif"
                                                        : movie.status ===
                                                          "coming_soon"
                                                        ? "Coming Soon"
                                                        : "Nonaktif"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end space-x-3">
                                                    <button
                                                        onClick={() =>
                                                            router.visit(
                                                                `/movies/${movie.id}/watch`
                                                            )
                                                        }
                                                        className="text-slate-400 hover:text-white transition-colors duration-200"
                                                        title="Tonton"
                                                    >
                                                        <FaEye className="text-lg" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            router.visit(
                                                                `/admin/movies/${movie.id}/edit`
                                                            )
                                                        }
                                                        className="text-slate-400 hover:text-white transition-colors duration-200"
                                                        title="Edit"
                                                    >
                                                        <FaEdit className="text-lg" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                movie.id
                                                            )
                                                        }
                                                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
                                                        title="Hapus"
                                                    >
                                                        <FaTrash className="text-lg" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
