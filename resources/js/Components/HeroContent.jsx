import React from "react";
import { Link } from "@inertiajs/react";

const HeroContent = () => {
    return (
        <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Unlimited movies, TV shows, and more
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8">
                Watch anywhere. Cancel anytime.
            </p>
            <div className="flex flex-wrap gap-4">
                <Link
                    href="/register"
                    className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 text-lg font-semibold"
                >
                    Start Watching
                </Link>
                <Link
                    href="/about"
                    className="px-8 py-3 bg-slate-800/80 text-white rounded-md hover:bg-slate-700/80 transition-all duration-200 text-lg font-semibold"
                >
                    Learn More
                </Link>
            </div>
        </div>
    );
};

export default HeroContent;
