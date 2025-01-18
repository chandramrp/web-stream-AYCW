import React, { useEffect, useRef } from "react";
import { SearchIcon, CloseIcon } from "./Icons";

const SearchBar = ({
    searchQuery,
    setSearchQuery,
    handleSearch,
    isVisible,
    onClose,
}) => {
    const searchRef = useRef(null);

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

        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
            searchRef.current?.querySelector("input")?.focus();
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isVisible, onClose]);

    return (
        <div
            ref={searchRef}
            className={`absolute right-10 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                isVisible
                    ? "opacity-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 translate-x-10 pointer-events-none"
            }`}
        >
            <form
                onSubmit={handleSearch}
                className="relative flex items-center"
            >
                <div className="relative bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg">
                    <input
                        type="text"
                        placeholder="Cari..."
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
        </div>
    );
};

export default SearchBar;
