import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Hero from "@/Components/Hero";
import MovieGrid from "@/Components/MovieGrid";
import TVDisplay from "@/Components/TVDisplay";

export default function Home({ auth, movies, activeGenre }) {
    return (
        <MainLayout user={auth?.user}>
            <Head title="Home" />

            <Hero activeGenre={activeGenre} />

            {/* Trailer Section */}
            <div className="py-20 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Film Terbaru
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Tonton trailer eksklusif dari film-film terbaru dan
                            terpopuler minggu ini
                        </p>
                    </div>
                    <TVDisplay />
                </div>
            </div>

            {/* Movies Grid Section */}
            <div className="py-12 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-semibold text-slate-200 mb-8">
                        Film Terpopuler
                    </h2>
                    <MovieGrid movies={movies} />
                </div>
            </div>
        </MainLayout>
    );
}
