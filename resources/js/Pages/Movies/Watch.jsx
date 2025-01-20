import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import VideoPlayer from "@/Components/VideoPlayer";
import { FaArrowLeft, FaHeart, FaShareAlt, FaPlus } from "react-icons/fa";

export default function Watch({ movie }) {
    return (
        <MainLayout>
            <Head title={`Nonton ${movie?.title || "Film"}`} />

            <div className="min-h-screen bg-slate-900 pt-16">
                {/* Video Player Section */}
                <div className="w-full max-w-7xl mx-auto">
                    <VideoPlayer
                        videoUrl={movie?.video_url}
                        poster={movie?.poster_url}
                    />
                </div>

                {/* Movie Info Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => window.history.back()}
                            className="text-slate-400 hover:text-white transition-colors mr-4"
                        >
                            <FaArrowLeft className="w-5 h-5" />
                        </button>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">
                            {movie?.title}
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Movie Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Quick Actions */}
                            <div className="flex items-center space-x-4">
                                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    <FaHeart />
                                    <span>Favorit</span>
                                </button>
                                <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
                                    <FaPlus />
                                    <span>Watchlist</span>
                                </button>
                                <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
                                    <FaShareAlt />
                                    <span>Bagikan</span>
                                </button>
                            </div>

                            {/* Movie Info */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 text-sm text-slate-400">
                                    <span>{movie?.year}</span>
                                    <span>•</span>
                                    <span>{movie?.duration}</span>
                                    <span>•</span>
                                    <span>{movie?.rating} Rating</span>
                                </div>

                                <p className="text-slate-300 leading-relaxed">
                                    {movie?.description}
                                </p>

                                {/* Genres */}
                                <div className="flex flex-wrap gap-2">
                                    {movie?.genres?.map((genre, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm"
                                        >
                                            {genre}
                                        </span>
                                    ))}
                                </div>

                                {/* Cast & Crew */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-white">
                                        Pemeran & Kru
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-slate-400">
                                                Sutradara
                                            </p>
                                            <p className="text-white">
                                                {movie?.director}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-slate-400">
                                                Penulis
                                            </p>
                                            <p className="text-white">
                                                {movie?.writer}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-slate-400">
                                                Pemain
                                            </p>
                                            <p className="text-white">
                                                {movie?.cast?.join(", ")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Related Movies */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white">
                                Film Terkait
                            </h3>
                            <div className="space-y-4">
                                {movie?.related_movies?.map((relatedMovie) => (
                                    <div
                                        key={relatedMovie.id}
                                        className="flex space-x-4"
                                    >
                                        <img
                                            src={relatedMovie.poster_url}
                                            alt={relatedMovie.title}
                                            className="w-24 h-36 object-cover rounded-lg"
                                        />
                                        <div>
                                            <h4 className="text-white font-medium">
                                                {relatedMovie.title}
                                            </h4>
                                            <p className="text-sm text-slate-400">
                                                {relatedMovie.year}
                                            </p>
                                            <p className="text-sm text-slate-400">
                                                {relatedMovie.duration}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
