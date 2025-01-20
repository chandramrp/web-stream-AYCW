import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaCamera,
    FaCheck,
    FaExclamationCircle,
} from "react-icons/fa";

export default function Settings({ user }) {
    const [isEditing, setIsEditing] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const { data, setData, post, processing, errors, reset, wasSuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            current_password: "",
            password: "",
            password_confirmation: "",
            avatar: null,
        });

    // Reset form ketika mode edit dimatikan
    useEffect(() => {
        if (!isEditing) {
            setData({
                name: user.name,
                email: user.email,
                current_password: "",
                password: "",
                password_confirmation: "",
                avatar: null,
            });
            setAvatarPreview(null);
        }
    }, [isEditing]);

    // Tampilkan alert sukses ketika update berhasil
    useEffect(() => {
        if (wasSuccessful) {
            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 3000);
            setIsEditing(false);
        }
    }, [wasSuccessful]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/user/settings", {
            preserveScroll: true,
            onSuccess: () => {
                reset("password", "current_password", "password_confirmation");
            },
        });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("avatar", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Function untuk mendapatkan URL avatar
    const getAvatarUrl = () => {
        if (avatarPreview) return avatarPreview;
        if (user.avatar) return `/storage/${user.avatar}`;
        return null;
    };

    return (
        <MainLayout>
            <Head title="Pengaturan Profil" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold text-white">
                                    Pengaturan Profil
                                </h1>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    {isEditing ? "Batal" : "Edit Profil"}
                                </button>
                            </div>

                            {/* Success Alert */}
                            {showSuccessAlert && (
                                <div className="mb-4 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-center text-green-400">
                                    <FaCheck className="w-5 h-5 mr-2" />
                                    Profil berhasil diperbarui!
                                </div>
                            )}

                            <form
                                onSubmit={handleSubmit}
                                encType="multipart/form-data"
                            >
                                {/* Avatar Section */}
                                <div className="mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative">
                                            <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-700">
                                                {getAvatarUrl() ? (
                                                    <img
                                                        src={getAvatarUrl()}
                                                        alt="Avatar"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <FaUser className="w-full h-full p-4 text-slate-400" />
                                                )}
                                            </div>
                                            {isEditing && (
                                                <label
                                                    htmlFor="avatar"
                                                    className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
                                                >
                                                    <FaCamera className="w-4 h-4 text-white" />
                                                    <input
                                                        type="file"
                                                        id="avatar"
                                                        className="hidden"
                                                        onChange={
                                                            handleAvatarChange
                                                        }
                                                        accept="image/*"
                                                    />
                                                </label>
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-medium text-white">
                                                Foto Profil
                                            </h2>
                                            <p className="text-sm text-slate-400">
                                                Format: JPG, PNG, GIF (Max. 2MB)
                                            </p>
                                        </div>
                                    </div>
                                    {errors.avatar && (
                                        <p className="mt-2 text-sm text-red-500">
                                            {errors.avatar}
                                        </p>
                                    )}
                                </div>

                                {/* Profile Form */}
                                <div className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-slate-300 mb-2"
                                        >
                                            Nama Lengkap
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaUser className="h-5 w-5 text-slate-500" />
                                            </div>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                disabled={!isEditing}
                                                className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg bg-slate-900 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                placeholder="Masukkan nama lengkap"
                                            />
                                        </div>
                                        {errors.name && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-slate-300 mb-2"
                                        >
                                            Email
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaEnvelope className="h-5 w-5 text-slate-500" />
                                            </div>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                disabled={!isEditing}
                                                className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg bg-slate-900 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                placeholder="Masukkan email"
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Password Section */}
                                    {isEditing && (
                                        <div className="border-t border-slate-700 pt-6 mt-6">
                                            <h3 className="text-lg font-medium text-white mb-4">
                                                Ubah Password
                                            </h3>
                                            <div className="space-y-4">
                                                {/* Current Password */}
                                                <div>
                                                    <label
                                                        htmlFor="current_password"
                                                        className="block text-sm font-medium text-slate-300 mb-2"
                                                    >
                                                        Password Saat Ini
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <FaLock className="h-5 w-5 text-slate-500" />
                                                        </div>
                                                        <input
                                                            type="password"
                                                            id="current_password"
                                                            name="current_password"
                                                            value={
                                                                data.current_password
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "current_password",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg bg-slate-900 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="Masukkan password saat ini"
                                                        />
                                                    </div>
                                                    {errors.current_password && (
                                                        <p className="mt-2 text-sm text-red-500">
                                                            {
                                                                errors.current_password
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                {/* New Password */}
                                                <div>
                                                    <label
                                                        htmlFor="password"
                                                        className="block text-sm font-medium text-slate-300 mb-2"
                                                    >
                                                        Password Baru
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <FaLock className="h-5 w-5 text-slate-500" />
                                                        </div>
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            name="password"
                                                            value={
                                                                data.password
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "password",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg bg-slate-900 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="Masukkan password baru"
                                                        />
                                                    </div>
                                                    {errors.password && (
                                                        <p className="mt-2 text-sm text-red-500">
                                                            {errors.password}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Confirm Password */}
                                                <div>
                                                    <label
                                                        htmlFor="password_confirmation"
                                                        className="block text-sm font-medium text-slate-300 mb-2"
                                                    >
                                                        Konfirmasi Password Baru
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <FaLock className="h-5 w-5 text-slate-500" />
                                                        </div>
                                                        <input
                                                            type="password"
                                                            id="password_confirmation"
                                                            name="password_confirmation"
                                                            value={
                                                                data.password_confirmation
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "password_confirmation",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg bg-slate-900 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="Konfirmasi password baru"
                                                        />
                                                    </div>
                                                    {errors.password_confirmation && (
                                                        <p className="mt-2 text-sm text-red-500">
                                                            {
                                                                errors.password_confirmation
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    {isEditing && (
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {processing
                                                    ? "Menyimpan..."
                                                    : "Simpan Perubahan"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
