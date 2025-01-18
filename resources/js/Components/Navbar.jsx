import React, { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import { SearchIcon } from "./Icons";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

export default function Navbar() {
    const page = usePage();
    const { auth } = page.props;
    const [searchQuery, setSearchQuery] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const searchButtonRef = useRef(null);

    // Debug auth status dengan lebih detail
    useEffect(() => {
        console.log("Auth Status:", {
            authenticated: auth?.authenticated,
            user: auth?.user,
            fullAuth: auth,
            pageProps: page.props,
        });
    }, [auth, page.props]);

    useEffect(() => {
        if (auth?.authenticated) {
            setIsSearchVisible(false);
        }
    }, [auth]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log("Searching for:", searchQuery);
            setSearchQuery("");
            setIsSearchVisible(false);
        }
    };

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    // Memastikan auth memiliki nilai default yang aman
    const isAuthenticated = auth?.authenticated ?? false;
    const user = auth?.user ?? null;

    // Debug render condition dengan nilai default
    console.log("Render condition with defaults:", {
        showUserMenu: isAuthenticated && user,
        authUser: user,
        isAuthenticated: isAuthenticated,
        rawAuth: auth,
    });

    // Render section berdasarkan nilai default yang aman
    const authSection =
        isAuthenticated && user ? (
            <UserMenu user={user} />
        ) : (
            <>
                <Link
                    href="/login"
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-200"
                >
                    Masuk
                </Link>
                <Link
                    href="/register"
                    className="bg-blue-600/90 text-slate-200 px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                    Daftar
                </Link>
            </>
        );

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-slate-900/80 backdrop-blur-md shadow-lg"
                    : "bg-slate-900"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex-1 flex items-center">
                        <Link
                            href={isAuthenticated ? "/movies/latest" : "/"}
                            className="text-2xl font-caesar tracking-wide text-slate-200 hover:text-blue-400 transition-colors duration-200"
                        >
                            <div className="flex flex-col text-2lg tracking-tighter">
                                <span className="block mb-0 p-0 h-5">A Y</span>
                                <span className="block mt-0 p-0 h-fit">
                                    C W
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {/* Search Button & Bar */}
                        <div className="relative">
                            <button
                                ref={searchButtonRef}
                                onClick={toggleSearch}
                                className={`p-2 transition-all duration-200 rounded-full ${
                                    isSearchVisible
                                        ? "bg-slate-800 text-blue-400"
                                        : "text-slate-300 hover:text-blue-400 hover:bg-slate-800/70"
                                }`}
                                aria-label="Toggle search"
                            >
                                <SearchIcon className="w-5 h-5" />
                            </button>
                            <SearchBar
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                handleSearch={handleSearch}
                                isVisible={isSearchVisible}
                                onClose={() => setIsSearchVisible(false)}
                            />
                        </div>

                        {/* Auth Section */}
                        <div className="flex items-center space-x-4">
                            {authSection}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
