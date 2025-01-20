import React from "react";
import { Head, router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { FaCalendar, FaClock, FaTrash } from "react-icons/fa";

export default function History({ auth, watchHistory, flash }) {
    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    const handleDeleteHistory = (historyId) => {
        if (
            confirm("Apakah Anda yakin ingin menghapus riwayat tontonan ini?")
        ) {
            router.delete(`/watch-history/${historyId}`, {
                onSuccess: () => {
                    // Flash message akan otomatis ditangani oleh Inertia
                },
            });
        }
    };

    return (
        <MainLayout user={auth.user}>
            <Head title="Riwayat Tontonan" />

            <div className="container mx-auto px-4 py-8">
                {/* Flash Message */}
                {flash?.success && (
                    <div className="bg-green-500 text-white px-4 py-3 rounded-lg mb-6">
                        {flash.success}
                    </div>
                )}

                <h1 className="text-2xl font-bold text-white mb-6">
                    Riwayat Tontonan
                </h1>

                {watchHistory && watchHistory.length > 0 ? (
                    <div className="grid gap-6">
                        {watchHistory.map((item) => (
                            <div
                                key={item.id}
                                className="bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:bg-slate-700 transition-colors duration-200"
                            >
                                <div className="flex items-start p-4">
                                    {/* Movie Poster */}
                                    <div className="w-32 h-48 flex-shrink-0">
                                        <img
                                            src={item.movie.poster_url}
                                            alt={item.movie.title}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 ml-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-semibold text-white">
                                                    {item.movie.title}
                                                </h3>
                                                <p className="text-slate-400 mt-1">
                                                    {item.movie.year} •{" "}
                                                    {item.movie.duration} menit
                                                </p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    handleDeleteHistory(item.id)
                                                }
                                                className="text-red-400 hover:text-red-300 transition-colors duration-200"
                                                title="Hapus dari riwayat"
                                            >
                                                <FaTrash className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="mt-4 space-y-2">
                                            <div className="flex items-center text-slate-300">
                                                <FaCalendar className="w-4 h-4 mr-2" />
                                                <span>
                                                    Ditonton pada{" "}
                                                    {formatDate(
                                                        item.watched_at
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-slate-300">
                                                <FaClock className="w-4 h-4 mr-2" />
                                                <span>
                                                    Durasi tonton:{" "}
                                                    {item.watch_duration} menit
                                                </span>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mt-4">
                                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                <span>Progress</span>
                                                <span>
                                                    {Math.round(
                                                        (item.watch_duration /
                                                            item.movie
                                                                .duration) *
                                                            100
                                                    )}
                                                    %
                                                </span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-600 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500 rounded-full"
                                                    style={{
                                                        width: `${
                                                            (item.watch_duration /
                                                                item.movie
                                                                    .duration) *
                                                            100
                                                        }%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-slate-400 text-lg">
                            Belum ada riwayat tontonan.
                        </p>
                        <p className="text-slate-500 mt-2">
                            Mulai tonton film untuk melihat riwayat di sini.
                        </p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
