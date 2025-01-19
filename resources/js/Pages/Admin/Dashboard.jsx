import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

export default function Dashboard() {
    return (
        <MainLayout>
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-slate-200">
                            <h1 className="text-2xl font-semibold mb-6">
                                Dashboard Admin
                            </h1>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                                <div className="bg-slate-700 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium text-slate-300">
                                        Total Users
                                    </h3>
                                    <p className="text-2xl font-bold text-blue-400">
                                        1,234
                                    </p>
                                </div>
                                <div className="bg-slate-700 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium text-slate-300">
                                        Total Movies
                                    </h3>
                                    <p className="text-2xl font-bold text-blue-400">
                                        567
                                    </p>
                                </div>
                                <div className="bg-slate-700 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium text-slate-300">
                                        Active Users
                                    </h3>
                                    <p className="text-2xl font-bold text-green-400">
                                        89%
                                    </p>
                                </div>
                                <div className="bg-slate-700 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium text-slate-300">
                                        New Users Today
                                    </h3>
                                    <p className="text-2xl font-bold text-blue-400">
                                        45
                                    </p>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-slate-700 rounded-lg p-6">
                                <h2 className="text-xl font-semibold mb-4">
                                    Recent Activity
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-slate-200">
                                                New user registered
                                            </p>
                                            <p className="text-sm text-slate-400">
                                                John Doe
                                            </p>
                                        </div>
                                        <span className="text-sm text-slate-400">
                                            2 minutes ago
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-slate-200">
                                                New movie added
                                            </p>
                                            <p className="text-sm text-slate-400">
                                                The Dark Knight
                                            </p>
                                        </div>
                                        <span className="text-sm text-slate-400">
                                            1 hour ago
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-slate-200">
                                                User reported
                                            </p>
                                            <p className="text-sm text-slate-400">
                                                Inappropriate content
                                            </p>
                                        </div>
                                        <span className="text-sm text-slate-400">
                                            3 hours ago
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
