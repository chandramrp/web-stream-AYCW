import React from "react";
import { Link } from "@inertiajs/react";
import {
    FaStar,
    FaPlayCircle,
    FaHeart,
    FaShareAlt,
    FaPlus,
} from "react-icons/fa";

const MovieCard = ({ movie }) => {
    return (
        <div className="group relative overflow-hidden rounded-xl bg-slate-800 shadow-lg transition-transform duration-300 hover:-translate-y-2">
            {/* Poster Image with Shimmer Effect */}
            <div className="relative aspect-[2/3] overflow-hidden">
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />

                {/* Rating Badge */}
                <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 backdrop-blur-sm">
                    <FaStar className="text-yellow-500" />
                    <span className="text-sm font-medium text-white">
                        {movie.rating}
                    </span>
                </div>

                {/* Year Badge */}
                <div className="absolute right-2 top-2 rounded-full bg-blue-500/70 px-2 py-1 text-sm font-medium text-white backdrop-blur-sm">
                    {movie.year}
                </div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100">
                {/* Quick Actions */}
                <div className="absolute right-2 top-14 flex flex-col gap-2">
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800/90 text-white shadow-lg backdrop-blur-sm transition-transform hover:scale-110 hover:bg-blue-600">
                        <FaHeart className="h-4 w-4" />
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800/90 text-white shadow-lg backdrop-blur-sm transition-transform hover:scale-110 hover:bg-blue-600">
                        <FaShareAlt className="h-4 w-4" />
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800/90 text-white shadow-lg backdrop-blur-sm transition-transform hover:scale-110 hover:bg-blue-600">
                        <FaPlus className="h-4 w-4" />
                    </button>
                </div>

                {/* Play Button */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <button className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/90 text-white shadow-lg backdrop-blur-sm transition-transform hover:scale-110 hover:bg-blue-700">
                        <FaPlayCircle className="h-8 w-8" />
                    </button>
                </div>

                {/* Movie Info */}
                <div className="space-y-3 p-4">
                    <h3 className="text-lg font-bold text-white line-clamp-1">
                        {movie.title}
                    </h3>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2">
                        {movie.genres.map((genre, index) => (
                            <span
                                key={index}
                                className="rounded-full bg-blue-600/30 px-2.5 py-0.5 text-xs font-medium text-blue-200 backdrop-blur-sm transition-colors hover:bg-blue-500/50"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Link overlay */}
            <Link
                href={`/movies/${movie.id}`}
                className="absolute inset-0 z-20 bg-transparent"
            >
                <span className="sr-only">Lihat {movie.title}</span>
            </Link>
        </div>
    );
};

export default MovieCard;
