import React from "react";
import { Link } from "@inertiajs/react";

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

const GenreTags = () => {
    return (
        <div className="mt-24 flex items-center justify-center gap-4 flex-wrap">
            {genres.map((genre) => (
                <Link
                    key={genre}
                    href={`/genre/${genre.toLowerCase()}`}
                    className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-full hover:bg-slate-700/50 transition-all duration-200"
                >
                    {genre}
                </Link>
            ))}
        </div>
    );
};

export default GenreTags;
