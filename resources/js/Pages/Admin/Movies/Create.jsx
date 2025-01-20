import React from "react";
import { Head, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { FaSave, FaTimes } from "react-icons/fa";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        video_url: "",
        poster_url: "",
        year: new Date().getFullYear(),
        duration: "",
        rating: "",
        genres: [],
        director: "",
        writer: "",
        cast: [],
        is_featured: false,
        status: "active",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/movies");
    };

    const genreOptions = [
        "Action",
        "Adventure",
        "Animation",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "Horror",
        "Mystery",
        "Romance",
        "Sci-Fi",
        "Thriller",
        "War",
        "Western",
    ];

    return (
        <MainLayout user={auth.user}>
            <Head title="Tambah Film" />

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">
                        Tambah Film
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                    <div className="bg-slate-800 rounded-lg p-6 space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Judul Film
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    URL Video
                                </label>
                                <input
                                    type="url"
                                    value={data.video_url}
                                    onChange={(e) =>
                                        setData("video_url", e.target.value)
                                    }
                                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.video_url && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.video_url}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    URL Poster
                                </label>
                                <input
                                    type="url"
                                    value={data.poster_url}
                                    onChange={(e) =>
                                        setData("poster_url", e.target.value)
                                    }
                                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.poster_url && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.poster_url}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Tahun
                                </label>
                                <input
                                    type="number"
                                    value={data.year}
                                    onChange={(e) =>
                                        setData("year", e.target.value)
                                    }
                                    min="1900"
                                    max={new Date().getFullYear() + 1}
                                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.year && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.year}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Durasi (menit)
                                </label>
                                <input
                                    type="number"
                                    value={data.duration}
                                    onChange={(e) =>
                                        setData("duration", e.target.value)
                                    }
                                    min="1"
                                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.duration && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.duration}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Rating
                                </label>
                                <input
                                    type="number"
                                    value={data.rating}
                                    onChange={(e) =>
                                        setData("rating", e.target.value)
                                    }
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.rating && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.rating}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Deskripsi
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                rows="4"
                                className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Genres */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Genre
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                {genreOptions.map((genre) => (
                                    <label
                                        key={genre}
                                        className="inline-flex items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={data.genres.includes(
                                                genre
                                            )}
                                            onChange={(e) => {
                                                const newGenres = e.target
                                                    .checked
                                                    ? [...data.genres, genre]
                                                    : data.genres.filter(
                                                          (g) => g !== genre
                                                      );
                                                setData("genres", newGenres);
                                            }}
                                            className="form-checkbox h-4 w-4 text-blue-500 rounded focus:ring-blue-500 border-slate-600 bg-slate-700"
                                        />
                                        <span className="ml-2 text-sm text-slate-300">
                                            {genre}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {errors.genres && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.genres}
                                </p>
                            )}
                        </div>

                        {/* Credits */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Sutradara
                                </label>
                                <input
                                    type="text"
                                    value={data.director}
                                    onChange={(e) =>
                                        setData("director", e.target.value)
                                    }
                                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.director && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.director}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Penulis
                                </label>
                                <input
                                    type="text"
                                    value={data.writer}
                                    onChange={(e) =>
                                        setData("writer", e.target.value)
                                    }
                                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.writer && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.writer}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Cast */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Pemeran (pisahkan dengan koma)
                            </label>
                            <input
                                type="text"
                                value={data.cast.join(", ")}
                                onChange={(e) =>
                                    setData(
                                        "cast",
                                        e.target.value
                                            .split(",")
                                            .map((item) => item.trim())
                                            .filter(Boolean)
                                    )
                                }
                                className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.cast && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.cast}
                                </p>
                            )}
                        </div>

                        {/* Status and Featured */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="active">Aktif</option>
                                    <option value="inactive">Nonaktif</option>
                                    <option value="coming_soon">
                                        Coming Soon
                                    </option>
                                </select>
                                {errors.status && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center">
                                <label className="inline-flex items-center mt-6">
                                    <input
                                        type="checkbox"
                                        checked={data.is_featured}
                                        onChange={(e) =>
                                            setData(
                                                "is_featured",
                                                e.target.checked
                                            )
                                        }
                                        className="form-checkbox h-4 w-4 text-blue-500 rounded focus:ring-blue-500 border-slate-600 bg-slate-700"
                                    />
                                    <span className="ml-2 text-sm text-slate-300">
                                        Tampilkan di Featured
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200 flex items-center"
                            >
                                <FaTimes className="mr-2" />
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaSave className="mr-2" />
                                Simpan
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
