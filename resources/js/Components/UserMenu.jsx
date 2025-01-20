import React, { useState, useRef, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    FaUserCircle,
    FaHistory,
    FaCog,
    FaSignOutAlt,
    FaTachometerAlt,
    FaFilm,
    FaUsers,
    FaChartBar,
    FaChevronDown,
} from "react-icons/fa";

export default function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const page = usePage();
    const { auth } = page.props;
    const user = auth?.user;

    // Debug: Log user data
    useEffect(() => {
        console.log("UserMenu - Props:", {
            auth,
            user,
            role: user?.role,
            status: user?.status,
            isAdmin: user?.is_admin,
        });
    }, [auth, user]);

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

    // Cek role dan is_admin dengan lebih detail
    const isAdmin = user?.role === "admin" || user?.is_admin === true;

    // Menu items berdasarkan role
    const menuItems = isAdmin
        ? [
              {
                  icon: FaTachometerAlt,
                  label: "Dashboard Admin",
                  href: "/admin/dashboard",
              },
              {
                  icon: FaFilm,
                  label: "Kelola Film",
                  href: "/admin/movies",
              },
              {
                  icon: FaUsers,
                  label: "Kelola User",
                  href: "/admin/users",
              },
              {
                  icon: FaChartBar,
                  label: "Statistik",
                  href: "/admin/statistics",
              },
          ]
        : [
              {
                  icon: FaHistory,
                  label: "Riwayat Tontonan",
                  href: "/user/history",
              },
              {
                  icon: FaCog,
                  label: "Pengaturan",
                  href: "/user/settings",
              },
          ];

    // Function untuk memformat nama user
    const formatName = (name) => {
        if (!name) return "";
        const words = name.split(" ");
        if (words.length === 1) return name;
        if (words.length === 2) return name;
        return `${words[0]} ${words[1].charAt(0)}.`;
    };

    // Function untuk mendapatkan URL avatar
    const getAvatarUrl = () => {
        if (!user?.avatar) return null;
        if (user.avatar.startsWith("http")) return user.avatar;
        return `/storage/${user.avatar}`;
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors duration-200 group"
            >
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center">
                        {getAvatarUrl() ? (
                            <img
                                src={getAvatarUrl()}
                                alt={user?.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = null;
                                    e.target.parentElement.innerHTML =
                                        '<div class="w-full h-full flex items-center justify-center"><FaUserCircle className="w-5 h-5 text-slate-400" /></div>';
                                }}
                            />
                        ) : (
                            <FaUserCircle className="w-5 h-5 text-slate-400" />
                        )}
                    </div>
                    <div className="ml-2 flex items-center">
                        <span className="max-w-[150px] truncate">
                            {formatName(user?.name)}
                        </span>
                        <FaChevronDown className="w-4 h-4 ml-1 group-hover:text-blue-400 transition-colors" />
                        {isAdmin && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                                Admin
                            </span>
                        )}
                    </div>
                </div>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 py-2 bg-slate-800 rounded-lg shadow-xl border border-slate-700">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-slate-700">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center">
                                {getAvatarUrl() ? (
                                    <img
                                        src={getAvatarUrl()}
                                        alt={user?.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = null;
                                            e.target.parentElement.innerHTML =
                                                '<div class="w-full h-full flex items-center justify-center"><FaUserCircle className="w-6 h-6 text-slate-400" /></div>';
                                        }}
                                    />
                                ) : (
                                    <FaUserCircle className="w-6 h-6 text-slate-400" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-slate-200 font-medium truncate">
                                    {user?.name}
                                </p>
                                <p className="text-xs text-slate-400 truncate mt-0.5">
                                    {user?.email}
                                </p>
                                <p className="text-xs text-blue-400 mt-1">
                                    {user?.role === "admin"
                                        ? "Administrator"
                                        : "User"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                            >
                                <item.icon className="w-4 h-4 mr-2" />
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-700 my-1"></div>

                    {/* Logout */}
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors duration-200"
                    >
                        <FaSignOutAlt className="w-4 h-4 mr-2" />
                        Logout
                    </Link>
                </div>
            )}
        </div>
    );
}
