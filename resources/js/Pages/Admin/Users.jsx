import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { FaEdit, FaBan, FaCheck, FaUserPlus, FaTrash } from "react-icons/fa";

export default function Users({ auth, users, flash }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterRole, setFilterRole] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const handleStatusUpdate = (userId, newStatus) => {
        if (confirm("Apakah Anda yakin ingin mengubah status user ini?")) {
            router.post(`/admin/users/${userId}/status`, {
                status: newStatus,
            });
        }
    };

    const handleDelete = (userId) => {
        if (
            confirm(
                "Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak dapat dibatalkan."
            )
        ) {
            router.post(`/admin/users/${userId}`, {
                _method: "DELETE",
            });
        }
    };

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = !filterRole || user.role === filterRole;
        const matchesStatus = !filterStatus || user.status === filterStatus;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const AddUserModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Tambah User Baru</h2>
                <form onSubmit={handleAddUser}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Nama
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="w-full px-3 py-2 bg-slate-700 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="w-full px-3 py-2 bg-slate-700 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="w-full px-3 py-2 bg-slate-700 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Role
                            </label>
                            <select
                                name="role"
                                className="w-full px-3 py-2 bg-slate-700 rounded-lg"
                                required
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Status
                            </label>
                            <select
                                name="status"
                                className="w-full px-3 py-2 bg-slate-700 rounded-lg"
                                required
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="banned">Banned</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={() => setShowAddModal(false)}
                            className="px-4 py-2 text-slate-300 hover:text-white"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    const EditUserModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Edit User</h2>
                <form onSubmit={handleEditUser}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Nama
                            </label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={editingUser?.name}
                                className="w-full px-3 py-2 bg-slate-700 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                defaultValue={editingUser?.email}
                                className="w-full px-3 py-2 bg-slate-700 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Password (kosongkan jika tidak ingin mengubah)
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="w-full px-3 py-2 bg-slate-700 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Role
                            </label>
                            <select
                                name="role"
                                defaultValue={editingUser?.role}
                                className="w-full px-3 py-2 bg-slate-700 rounded-lg"
                                required
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Status
                            </label>
                            <select
                                name="status"
                                defaultValue={editingUser?.status}
                                className="w-full px-3 py-2 bg-slate-700 rounded-lg"
                                required
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="banned">Banned</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={() => {
                                setShowEditModal(false);
                                setEditingUser(null);
                            }}
                            className="px-4 py-2 text-slate-300 hover:text-white"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    const handleAddUser = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        router.post("/admin/users", Object.fromEntries(formData));
        setShowAddModal(false);
    };

    const handleEditUser = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        router.post(`/admin/users/${editingUser.id}`, {
            _method: "PUT",
            ...Object.fromEntries(formData),
        });
        setShowEditModal(false);
        setEditingUser(null);
    };

    return (
        <MainLayout user={auth.user}>
            <Head title="Kelola User" />

            <div className="py-20">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-slate-200">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold">
                                    Kelola User
                                </h1>
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    <FaUserPlus className="mr-2" />
                                    Tambah User
                                </button>
                            </div>

                            {/* Flash Message */}
                            {flash?.success && (
                                <div className="bg-green-500 text-white px-4 py-2 rounded-lg mb-6">
                                    {flash.success}
                                </div>
                            )}

                            {/* Search and Filter */}
                            <div className="mb-6 flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Cari user..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <select
                                    value={filterRole}
                                    onChange={(e) =>
                                        setFilterRole(e.target.value)
                                    }
                                    className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Semua Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                                <select
                                    value={filterStatus}
                                    onChange={(e) =>
                                        setFilterStatus(e.target.value)
                                    }
                                    className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
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
                                        {filteredUsers.map((user) => (
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
                                                        {user.last_login_at
                                                            ? new Date(
                                                                  user.last_login_at
                                                              ).toLocaleString()
                                                            : "-"}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setEditingUser(
                                                                    user
                                                                );
                                                                setShowEditModal(
                                                                    true
                                                                );
                                                            }}
                                                            className="p-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        {user.status ===
                                                        "active" ? (
                                                            <button
                                                                onClick={() =>
                                                                    handleStatusUpdate(
                                                                        user.id,
                                                                        "banned"
                                                                    )
                                                                }
                                                                className="p-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                                                            >
                                                                <FaBan />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() =>
                                                                    handleStatusUpdate(
                                                                        user.id,
                                                                        "active"
                                                                    )
                                                                }
                                                                className="p-2 text-green-400 hover:text-green-300 transition-colors duration-200"
                                                            >
                                                                <FaCheck />
                                                            </button>
                                                        )}
                                                        {auth.user.id !==
                                                            user.id && (
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        user.id
                                                                    )
                                                                }
                                                                className="p-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                                                                title="Hapus User"
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {showAddModal && <AddUserModal />}
                            {showEditModal && editingUser && <EditUserModal />}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
