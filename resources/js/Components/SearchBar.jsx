import React, { useEffect, useRef } from "react";
import { SearchIcon, CloseIcon } from "./Icons";
import { usePage, router } from "@inertiajs/react";

const SearchBar = ({
    searchQuery,
    setSearchQuery,
    handleSearch,
    isVisible,
    onClose,
}) => {
    const searchRef = useRef(null);
    const { props } = usePage();
    const savedSearchQuery = props.searchQuery;
    const movies = props.movies || [];

    // Filter movies berdasarkan search query
    const filteredMovies = searchQuery
        ? movies.filter((movie) => {
              const matchTitle = movie.title
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
              const matchGenres = movie.genres.some((genre) =>
                  genre.toLowerCase().includes(searchQuery.toLowerCase())
              );
              return matchTitle || matchGenres;
          })
        : [];

    // Set searchQuery from props when component mounts or when savedSearchQuery changes
    useEffect(() => {
        if (savedSearchQuery) {
            setSearchQuery(savedSearchQuery);
        }
    }, [savedSearchQuery]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                onClose();
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        const handleEnter = (event) => {
            if (event.key === "Enter" && searchQuery.trim()) {
                handleSearch(event);
            }
        };

        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
            document.addEventListener("keydown", handleEnter);
            searchRef.current?.querySelector("input")?.focus();
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
            document.removeEventListener("keydown", handleEnter);
        };
    }, [isVisible, onClose, searchQuery, handleSearch]);

    const handleMovieClick = (movieId) => {
        router.get(`/watch/${movieId}`);
        onClose();
    };

    return (
        <div
            ref={searchRef}
            className="absolute right-10 top-1/2 -translate-y-1/2 transition-all duration-300"
        >
            <div
                className={`transition-all duration-300 ${
                    isVisible
                        ? "opacity-100 translate-x-0 pointer-events-auto"
                        : "opacity-0 translate-x-10 pointer-events-none"
                }`}
            >
                <form
                    onSubmit={handleSearch}
                    className="relative flex items-center"
                >
                    <div className="relative bg-slate-800/90 backdrop-blur-sm rounded-t-full rounded-b-full shadow-lg">
                        <input
                            type="text"
                            placeholder="Cari film, genre, atau aktor..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-[280px] bg-transparent text-slate-200 px-4 py-2 pl-10 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/40 placeholder-slate-400"
                        />
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                            >
                                <CloseIcon className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </form>

                {/* Dropdown Rekomendasi */}
                {searchQuery && filteredMovies.length > 0 && (
                    <div className="absolute w-full mt-2 py-2 bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-xl max-h-[400px] overflow-y-auto">
                        {filteredMovies.map((movie) => (
                            <button
                                key={movie.id}
                                onClick={() => handleMovieClick(movie.id)}
                                className="w-full px-4 py-2 flex items-center space-x-3 hover:bg-slate-700/50 transition-colors"
                            >
                                <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    className="w-10 h-14 object-cover rounded"
                                />
                                <div className="flex-1 text-left">
                                    <h3 className="text-slate-200 font-medium">
                                        {movie.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm">
                                        {movie.year} • {movie.rating}★
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {movie.genres
                                            .slice(0, 2)
                                            .map((genre, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs px-2 py-0.5 bg-slate-700/50 text-slate-300 rounded-full"
                                                >
                                                    {genre}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
