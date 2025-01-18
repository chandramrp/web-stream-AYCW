import React, { useState, useRef, useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import { FaUser, FaSignOutAlt, FaHistory, FaCog } from "react-icons/fa";

export default function UserMenu({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        router.post("/logout");
    };

    return (
        <div className="relative" ref={menuRef}>
            {/* Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors duration-200"
            >
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                ) : (
                    <FaUser className="w-4 h-4 text-slate-300" />
                )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg py-1 bg-slate-800 ring-1 ring-black ring-opacity-5">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-slate-700">
                        <p className="text-sm font-medium text-slate-200">
                            {user.name}
                        </p>
                        <p className="text-sm text-slate-400 truncate">
                            {user.email}
                        </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                        <Link
                            href="/profile"
                            className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-blue-400 transition-colors duration-200"
                        >
                            <FaUser className="w-4 h-4 mr-3" />
                            Profil
                        </Link>
                        <Link
                            href="/watchlist"
                            className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-blue-400 transition-colors duration-200"
                        >
                            <FaHistory className="w-4 h-4 mr-3" />
                            Watchlist
                        </Link>
                        <Link
                            href="/settings"
                            className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-blue-400 transition-colors duration-200"
                        >
                            <FaCog className="w-4 h-4 mr-3" />
                            Pengaturan
                        </Link>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-red-400 transition-colors duration-200"
                        >
                            <FaSignOutAlt className="w-4 h-4 mr-3" />
                            Keluar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
