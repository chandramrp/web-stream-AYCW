import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { FaUsers, FaFilm, FaEye, FaStar, FaChartLine } from "react-icons/fa";

export default function Statistics({ auth, stats }) {
    const statCards = [
        {
            title: "Total User",
            value: stats.users.total,
            change: `${stats.users.active} aktif`,
            trend: "up",
            icon: FaUsers,
            color: "blue",
        },
        {
            title: "Total Film",
            value: stats.movies.total,
            change: `${stats.movies.active} aktif`,
            trend: "up",
            icon: FaFilm,
            color: "purple",
        },
        {
            title: "Total Views",
            value: stats.watches.total,
            change: `${stats.watches.uniqueWatchers} penonton unik`,
            trend: "up",
            icon: FaEye,
            color: "green",
        },
        {
            title: "Film Unggulan",
            value: stats.movies.featured,
            change: `dari ${stats.movies.total} film`,
            trend: "up",
            icon: FaStar,
            color: "yellow",
        },
    ];

    return (
        <MainLayout user={auth.user}>
            <Head title="Statistik" />

            <div className="py-20">
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
                                {statCards.map((stat, index) => (
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
                                                <p className="text-sm mt-1 text-slate-400">
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
                                {/* Most Watched Movies */}
                                <div className="bg-slate-700 p-6 rounded-lg">
                                    <h2 className="text-lg font-semibold mb-4">
                                        Film Terpopuler
                                    </h2>
                                    <div className="space-y-4">
                                        {stats.mostWatchedMovies.map(
                                            (movie, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between"
                                                >
                                                    <div className="flex items-center">
                                                        <span className="text-slate-400 w-6">
                                                            {index + 1}.
                                                        </span>
                                                        <span className="ml-2">
                                                            {movie.movie.title}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <span className="text-slate-400">
                                                            {
                                                                movie.total_watches
                                                            }{" "}
                                                            views
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Latest Activities */}
                                <div className="bg-slate-700 p-6 rounded-lg">
                                    <h2 className="text-lg font-semibold mb-4">
                                        Aktivitas Terbaru
                                    </h2>
                                    <div className="space-y-4">
                                        {stats.latestActivities.map(
                                            (activity, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between"
                                                >
                                                    <div>
                                                        <p className="text-slate-200">
                                                            {activity.user.name}{" "}
                                                            menonton film
                                                        </p>
                                                        <p className="text-sm text-slate-400">
                                                            {
                                                                activity.movie
                                                                    .title
                                                            }
                                                        </p>
                                                    </div>
                                                    <span className="text-sm text-slate-400">
                                                        {new Date(
                                                            activity.created_at
                                                        ).toLocaleString()}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Latest Users */}
                            <div className="bg-slate-700 p-6 rounded-lg">
                                <h2 className="text-lg font-semibold mb-4">
                                    User Terbaru
                                </h2>
                                <div className="space-y-4">
                                    {stats.latestUsers.map((user, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between"
                                        >
                                            <div>
                                                <p className="text-slate-200">
                                                    {user.name}
                                                </p>
                                                <p className="text-sm text-slate-400">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <span className="text-sm text-slate-400">
                                                Bergabung{" "}
                                                {new Date(
                                                    user.created_at
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
