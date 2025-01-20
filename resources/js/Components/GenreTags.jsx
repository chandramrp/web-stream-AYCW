import React from "react";
import { router } from "@inertiajs/react";

const genres = [
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Sci-Fi",
    "Romance",
    "Thriller",
    "Documentary",
    "Animation",
];

const GenreTags = ({ activeGenre = null }) => {
    const handleGenreClick = (genre) => {
        router.get(
            "/",
            {
                genre: genre.toLowerCase(),
            },
            {
                preserveState: true,
                preserveScroll: true,
                only: ["movies"],
            }
        );
    };

    return (
        <div className="mt-24 flex items-center justify-center gap-4 flex-wrap">
            {genres.map((genre) => (
                <button
                    key={genre}
                    onClick={() => handleGenreClick(genre)}
                    className={`px-4 py-2 rounded-full transition-all duration-200 ${
                        activeGenre === genre.toLowerCase()
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"
                    } hover:scale-105 transform`}
                >
                    {genre}
                </button>
            ))}
            {activeGenre && (
                <button
                    onClick={() => handleGenreClick("")}
                    className="px-4 py-2 bg-red-600/50 text-red-100 rounded-full hover:bg-red-700/50 transition-all duration-200 hover:scale-105 transform"
                >
                    Clear Filter
                </button>
            )}
        </div>
    );
};

export default GenreTags;
