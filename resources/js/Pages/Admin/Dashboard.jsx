import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    FaFilm,
    FaUsers,
    FaEye,
    FaClock,
    FaChartLine,
    FaCalendarAlt,
} from "react-icons/fa";

export default function Dashboard({
    auth,
    stats,
    recentMovies,
    recentUsers,
    popularMovies,
}) {
    const StatCard = ({
        icon: Icon,
        title,
        value,
        description,
        colorClass,
    }) => (
        <div className="bg-slate-700 p-6 rounded-lg">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-slate-400">{title}</p>
                    <p className="text-2xl font-bold mt-1">{value}</p>
                    {description && (
                        <p className="text-sm text-slate-400 mt-1">
                            {description}
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-lg ${colorClass}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </div>
    );

    const MovieCard = ({ movie }) => (
        <div className="bg-slate-700 rounded-lg overflow-hidden">
            <img
                src={movie.poster_url}
                alt={movie.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h4 className="text-white font-medium truncate">
                    {movie.title}
                </h4>
                <p className="text-slate-400 text-sm mt-1">
                    {movie.year} • {movie.duration} menit
                </p>
                <div className="flex items-center mt-2">
                    <FaEye className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-400 text-sm ml-1">
                        {movie.views} views
                    </span>
                </div>
            </div>
        </div>
    );

    const UserCard = ({ user }) => (
        <div className="flex items-center space-x-3 bg-slate-700 p-3 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center">
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                    />
                ) : (
                    <FaUsers className="w-5 h-5 text-slate-400" />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{user.name}</p>
                <p className="text-slate-400 text-sm truncate">{user.email}</p>
            </div>
            <div className="text-right">
                <p className="text-slate-400 text-sm">
                    {new Date(user.created_at).toLocaleDateString()}
                </p>
            </div>
        </div>
    );

    return (
        <MainLayout user={auth.user}>
            <Head title="Dashboard Admin" />

            <div className="py-20">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-slate-200">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold">
                                    Dashboard Admin
                                </h1>
                                <div className="flex items-center text-slate-400">
                                    <FaCalendarAlt className="w-4 h-4 mr-2" />
                                    <span>
                                        {new Date().toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Statistik */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <StatCard
                                    icon={FaFilm}
                                    title="Total Film"
                                    value={stats.totalMovies}
                                    description="Film yang tersedia"
                                    colorClass="bg-blue-600"
                                />
                                <StatCard
                                    icon={FaUsers}
                                    title="Total User"
                                    value={stats.totalUsers}
                                    description="User terdaftar"
                                    colorClass="bg-green-600"
                                />
                                <StatCard
                                    icon={FaEye}
                                    title="Total Views"
                                    value={stats.totalViews}
                                    description="Total tontonan"
                                    colorClass="bg-purple-600"
                                />
                                <StatCard
                                    icon={FaClock}
                                    title="Waktu Tonton"
                                    value={`${stats.totalWatchTime} jam`}
                                    description="Total durasi tontonan"
                                    colorClass="bg-orange-600"
                                />
                            </div>

                            {/* Film Terbaru dan Populer */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                                        <FaFilm className="w-5 h-5 mr-2" />
                                        Film Terbaru
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {recentMovies.map((movie) => (
                                            <MovieCard
                                                key={movie.id}
                                                movie={movie}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                                        <FaChartLine className="w-5 h-5 mr-2" />
                                        Film Terpopuler
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {popularMovies.map((movie) => (
                                            <MovieCard
                                                key={movie.id}
                                                movie={movie}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* User Terbaru */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4 flex items-center">
                                    <FaUsers className="w-5 h-5 mr-2" />
                                    User Terbaru
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {recentUsers.map((user) => (
                                        <UserCard key={user.id} user={user} />
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
