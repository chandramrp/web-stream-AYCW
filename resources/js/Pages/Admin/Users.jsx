import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { FaEdit, FaBan, FaCheck, FaUserPlus } from "react-icons/fa";

export default function Users() {
    // Dummy data untuk testing
    const users = [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "user",
            status: "active",
            lastLogin: "2024-03-19 10:30:00",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "user",
            status: "inactive",
            lastLogin: "2024-03-18 15:45:00",
        },
        {
            id: 3,
            name: "Administrator",
            email: "admin@aycw.com",
            role: "admin",
            status: "active",
            lastLogin: "2024-03-19 09:00:00",
        },
    ];

    return (
        <MainLayout>
            <Head title="Kelola User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-slate-200">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold">
                                    Kelola User
                                </h1>
                                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                    <FaUserPlus className="mr-2" />
                                    Tambah User
                                </button>
                            </div>

                            {/* Search and Filter */}
                            <div className="mb-6 flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Cari user..."
                                    className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Semua Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                                <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Semua Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="banned">Banned</option>
                                </select>
                            </div>

                            {/* Users Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left border-b border-slate-700">
                                            <th className="pb-3 pr-4">Nama</th>
                                            <th className="pb-3 pr-4">Email</th>
                                            <th className="pb-3 pr-4">Role</th>
                                            <th className="pb-3 pr-4">
                                                Status
                                            </th>
                                            <th className="pb-3 pr-4">
                                                Login Terakhir
                                            </th>
                                            <th className="pb-3">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="border-b border-slate-700"
                                            >
                                                <td className="py-4 pr-4">
                                                    {user.name}
                                                </td>
                                                <td className="py-4 pr-4">
                                                    {user.email}
                                                </td>
                                                <td className="py-4 pr-4">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs ${
                                                            user.role ===
                                                            "admin"
                                                                ? "bg-purple-500/20 text-purple-400"
                                                                : "bg-blue-500/20 text-blue-400"
                                                        }`}
                                                    >
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="py-4 pr-4">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs ${
                                                            user.status ===
                                                            "active"
                                                                ? "bg-green-500/20 text-green-400"
                                                                : user.status ===
                                                                  "inactive"
                                                                ? "bg-yellow-500/20 text-yellow-400"
                                                                : "bg-red-500/20 text-red-400"
                                                        }`}
                                                    >
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 pr-4">
                                                    <span className="text-slate-400">
                                                        {user.lastLogin}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <div className="flex gap-2">
                                                        <button className="p-2 text-blue-400 hover:text-blue-300 transition-colors duration-200">
                                                            <FaEdit />
                                                        </button>
                                                        {user.status ===
                                                        "active" ? (
                                                            <button className="p-2 text-red-400 hover:text-red-300 transition-colors duration-200">
                                                                <FaBan />
                                                            </button>
                                                        ) : (
                                                            <button className="p-2 text-green-400 hover:text-green-300 transition-colors duration-200">
                                                                <FaCheck />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-6 flex justify-between items-center">
                                <p className="text-sm text-slate-400">
                                    Menampilkan 1-3 dari 3 user
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors duration-200"
                                        disabled
                                    >
                                        Previous
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors duration-200"
                                        disabled
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
