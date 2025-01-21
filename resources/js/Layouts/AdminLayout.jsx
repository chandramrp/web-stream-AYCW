import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { FaFilm, FaUsers, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import { router } from "@inertiajs/react";

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;

    const navigation = [
        {
            name: "Film",
            href: "/admin/movies",
            icon: FaFilm,
            current: window.location.pathname.startsWith("/admin/movies"),
        },
        {
            name: "Pengguna",
            href: "/admin/users",
            icon: FaUsers,
            current: window.location.pathname.startsWith("/admin/users"),
        },
        {
            name: "Statistik",
            href: "/admin/statistics",
            icon: FaChartLine,
            current: window.location.pathname.startsWith("/admin/statistics"),
        },
    ];

    const handleLogout = () => {
        router.post("/logout");
    };

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-64 bg-slate-800">
                <div className="flex h-16 items-center justify-center">
                    <Link
                        href="/"
                        className="text-2xl font-caesar tracking-wide text-slate-200 hover:text-blue-400 transition-colors duration-200"
                    >
                        <div className="flex flex-col text-2lg tracking-tighter">
                            <span className="block mb-0 p-0 h-5">A Y</span>
                            <span className="block mt-0 p-0 h-fit">C W</span>
                        </div>
                    </Link>
                </div>

                <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                                item.current
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                            }`}
                        >
                            <item.icon
                                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                                    item.current
                                        ? "text-white"
                                        : "text-slate-400 group-hover:text-white"
                                }`}
                            />
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="pl-64">
                {/* Header */}
                <header className="bg-slate-800 shadow">
                    <div className="flex justify-between items-center h-16 px-8">
                        <h1 className="text-xl font-semibold text-white">
                            Admin Panel
                        </h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-slate-300">
                                {auth.user.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center text-slate-300 hover:text-white transition-colors"
                            >
                                <FaSignOutAlt className="w-4 h-4 mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main>{children}</main>
            </div>
        </div>
    );
}
