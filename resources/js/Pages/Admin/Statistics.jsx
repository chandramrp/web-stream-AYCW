import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { FaUsers, FaFilm, FaEye, FaStar, FaChartLine } from "react-icons/fa";

export default function Statistics() {
    // Dummy data untuk testing
    const stats = [
        {
            title: "Total User",
            value: "1,234",
            change: "+12%",
            trend: "up",
            icon: FaUsers,
            color: "blue",
        },
        {
            title: "Total Film",
            value: "567",
            change: "+8%",
            trend: "up",
            icon: FaFilm,
            color: "purple",
        },
        {
            title: "Total Views",
            value: "45.2K",
            change: "+25%",
            trend: "up",
            icon: FaEye,
            color: "green",
        },
        {
            title: "Rating Rata-rata",
            value: "4.5",
            change: "+0.2",
            trend: "up",
            icon: FaStar,
            color: "yellow",
        },
    ];

    const topMovies = [
        { title: "The Dark Knight", views: "2.5K", rating: 4.8 },
        { title: "Inception", views: "2.1K", rating: 4.7 },
        { title: "Interstellar", views: "1.8K", rating: 4.6 },
        { title: "The Matrix", views: "1.5K", rating: 4.5 },
        { title: "Pulp Fiction", views: "1.2K", rating: 4.4 },
    ];

    const recentActivity = [
        {
            action: "New user registered",
            user: "John Doe",
            time: "2 minutes ago",
        },
        { action: "Movie added", user: "Admin", time: "1 hour ago" },
        { action: "User reported", user: "Jane Smith", time: "3 hours ago" },
        {
            action: "Rating submitted",
            user: "Mike Johnson",
            time: "5 hours ago",
        },
        { action: "Comment added", user: "Sarah Wilson", time: "6 hours ago" },
    ];

    return (
        <MainLayout>
            <Head title="Statistik" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-slate-200">
                            {/* Header */}
                            <div className="flex items-center mb-6">
                                <FaChartLine className="w-8 h-8 mr-3 text-blue-500" />
                                <h1 className="text-2xl font-semibold">
                                    Statistik Platform
                                </h1>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-slate-700 p-6 rounded-lg"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-sm text-slate-400">
                                                    {stat.title}
                                                </p>
                                                <p className="text-2xl font-bold mt-1">
                                                    {stat.value}
                                                </p>
                                                <p
                                                    className={`text-sm mt-1 ${
                                                        stat.trend === "up"
                                                            ? "text-green-400"
                                                            : "text-red-400"
                                                    }`}
                                                >
                                                    {stat.change}
                                                </p>
                                            </div>
                                            <stat.icon
                                                className={`w-8 h-8 text-${stat.color}-500`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Charts Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                {/* Top Movies */}
                                <div className="bg-slate-700 p-6 rounded-lg">
                                    <h2 className="text-lg font-semibold mb-4">
                                        Film Terpopuler
                                    </h2>
                                    <div className="space-y-4">
                                        {topMovies.map((movie, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex items-center">
                                                    <span className="text-slate-400 w-6">
                                                        {index + 1}.
                                                    </span>
                                                    <span className="ml-2">
                                                        {movie.title}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <span className="text-slate-400">
                                                        {movie.views} views
                                                    </span>
                                                    <span className="text-yellow-400">
                                                        ★ {movie.rating}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="bg-slate-700 p-6 rounded-lg">
                                    <h2 className="text-lg font-semibold mb-4">
                                        Aktivitas Terbaru
                                    </h2>
                                    <div className="space-y-4">
                                        {recentActivity.map(
                                            (activity, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between"
                                                >
                                                    <div>
                                                        <p className="text-slate-200">
                                                            {activity.action}
                                                        </p>
                                                        <p className="text-sm text-slate-400">
                                                            by {activity.user}
                                                        </p>
                                                    </div>
                                                    <span className="text-sm text-slate-400">
                                                        {activity.time}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
