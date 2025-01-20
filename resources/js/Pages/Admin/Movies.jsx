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

            <div className="py-20">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-slate-200">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold">
                                    Kelola Film
                                </h1>
                                <button
                                    onClick={() =>
                                        router.visit("/admin/movies/create")
                                    }
                                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    <FaPlus className="mr-2" />
                                    Tambah Film
                                </button>
                            </div>

                            {/* Flash Message */}
                            {flash?.success && (
                                <div className="bg-green-500 text-white px-4 py-2 rounded-lg mb-6">
                                    {flash.success}
                                </div>
                            )}

                            {/* Search and Filter */}
                            <div className="mb-6 flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Cari film..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="w-full px-4 py-2 pl-10 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <FaSearch className="absolute left-3 top-3 text-slate-400" />
                                </div>
                                <select
                                    value={filterStatus}
                                    onChange={(e) =>
                                        setFilterStatus(e.target.value)
                                    }
                                    className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">Semua Status</option>
                                    <option value="active">Aktif</option>
                                    <option value="inactive">Nonaktif</option>
                                    <option value="coming_soon">
                                        Coming Soon
                                    </option>
                                </select>
                            </div>

                            {/* Movies Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left border-b border-slate-700">
                                            <th className="pb-3 pr-4">Film</th>
                                            <th className="pb-3 pr-4">Tahun</th>
                                            <th className="pb-3 pr-4">
                                                Durasi
                                            </th>
                                            <th className="pb-3 pr-4">
                                                Rating
                                            </th>
                                            <th className="pb-3 pr-4">
                                                Status
                                            </th>
                                            <th className="pb-3 text-right">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMovies.map((movie) => (
                                            <tr
                                                key={movie.id}
                                                className="border-b border-slate-700"
                                            >
                                                <td className="py-4 pr-4">
                                                    <div className="flex items-center">
                                                        <img
                                                            src={
                                                                movie.poster_url
                                                            }
                                                            alt={movie.title}
                                                            className="w-12 h-16 object-cover rounded"
                                                        />
                                                        <div className="ml-3">
                                                            <div className="font-medium">
                                                                {movie.title}
                                                            </div>
                                                            <div className="text-slate-400 text-sm">
                                                                {movie.genres.join(
                                                                    ", "
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 pr-4 text-slate-300">
                                                    {movie.year}
                                                </td>
                                                <td className="py-4 pr-4 text-slate-300">
                                                    {movie.duration} menit
                                                </td>
                                                <td className="py-4 pr-4">
                                                    <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                                                        {movie.rating}
                                                    </span>
                                                </td>
                                                <td className="py-4 pr-4">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs ${
                                                            movie.status ===
                                                            "active"
                                                                ? "bg-green-500/20 text-green-400"
                                                                : movie.status ===
                                                                  "coming_soon"
                                                                ? "bg-yellow-500/20 text-yellow-400"
                                                                : "bg-red-500/20 text-red-400"
                                                        }`}
                                                    >
                                                        {movie.status ===
                                                        "active"
                                                            ? "Aktif"
                                                            : movie.status ===
                                                              "coming_soon"
                                                            ? "Coming Soon"
                                                            : "Nonaktif"}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() =>
                                                                router.visit(
                                                                    `/movies/${movie.id}/watch`
                                                                )
                                                            }
                                                            className="p-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                                            title="Tonton"
                                                        >
                                                            <FaEye />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                router.visit(
                                                                    `/admin/movies/${movie.id}/edit`
                                                                )
                                                            }
                                                            className="p-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                                            title="Edit"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    movie.id
                                                                )
                                                            }
                                                            className="p-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                                                            title="Hapus"
                                                        >
                                                            <FaTrash />
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
            </div>
        </MainLayout>
    );
}
