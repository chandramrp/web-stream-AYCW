import React from "react";
import { Link } from "@inertiajs/react";
import { FaStar } from "react-icons/fa";

export default function MovieGrid({ movies }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
                <div
                    key={movie.id}
                    className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                    {/* Poster Image */}
                    <div className="relative aspect-[2/3] group">
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
                            <Link
                                href={`/movies/${movie.id}/watch`}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full mb-4 transition-colors duration-200"
                            >
                                Tonton
                            </Link>
                            <p className="text-sm text-center">
                                Klik untuk menonton film
                            </p>
                        </div>
                    </div>

                    {/* Movie Info */}
                    <div className="p-4">
                        <Link
                            href={`/movies/${movie.id}/watch`}
                            className="block"
                        >
                            <h3 className="text-lg font-semibold text-slate-200 mb-2 truncate hover:text-blue-400 transition-colors">
                                {movie.title}
                            </h3>
                        </Link>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                                <FaStar className="text-yellow-400 w-4 h-4 mr-1" />
                                <span className="text-slate-300 text-sm">
                                    {movie.rating}
                                </span>
                            </div>
                            <span className="text-slate-400 text-sm">
                                {movie.year}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map((genre, index) => (
                                <span
                                    key={index}
                                    className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded-full"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
