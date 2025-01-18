import React from "react";
import HeroContent from "./HeroContent";
import TVDisplay from "./TVDisplay";
import GenreTags from "./GenreTags";

const Hero = () => {
    return (
        <div className="relative min-h-screen">
            {/* Background Image dengan Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/hero-bg.png"
                    alt="background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/95 to-slate-900/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <HeroContent />
                    <TVDisplay />
                </div>
                <GenreTags />
            </div>
        </div>
    );
};

export default Hero;
