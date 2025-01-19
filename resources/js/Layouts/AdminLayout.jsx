import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { FaUsers, FaFilm, FaDashboard, FaBars, FaTimes } from "react-icons/fa";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { auth } = usePage().props;

    const menuItems = [
        { icon: FaDashboard, label: "Dashboard", href: "/admin/dashboard" },
        { icon: FaFilm, label: "Manajemen Film", href: "/admin/movies" },
        { icon: FaUsers, label: "Manajemen User", href: "/admin/users" },
    ];

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } bg-slate-800 border-r border-slate-700`}
            >
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <div className="flex items-center justify-between mb-6 px-2">
                        <Link
                            href="/admin/dashboard"
                            className="text-2xl font-caesar text-slate-200"
                        >
                            AYCW Admin
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-slate-400 hover:text-slate-200"
                        >
                            <FaTimes size={24} />
                        </button>
                    </div>
                    <ul className="space-y-2">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    className="flex items-center p-3 text-slate-300 rounded-lg hover:bg-slate-700 group transition-colors duration-200"
                                >
                                    <item.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors duration-200" />
                                    <span className="ml-3">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <div
                className={`p-4 ${
                    sidebarOpen ? "lg:ml-64" : ""
                } transition-all duration-300`}
            >
                {/* Header */}
                <header className="mb-6 bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-slate-400 hover:text-slate-200 transition-colors duration-200"
                    >
                        <FaBars size={24} />
                    </button>
                    <div className="flex items-center space-x-4">
                        <span className="text-slate-300">
                            {auth?.user?.name}
                        </span>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="text-sm text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                            Logout
                        </Link>
                    </div>
                </header>

                {/* Content */}
                <main className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
