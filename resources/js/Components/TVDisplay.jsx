import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";

const TVDisplay = ({ videoUrl = "/videos/trailer.mp4" }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulasi loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handlePlayClick = () => {
        setIsPlaying(true);
    };

    const handleVideoError = (e) => {
        console.error("Video error:", e);
        setError("Maaf, video tidak dapat diputar saat ini");
        setIsPlaying(false);
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-4">
            <div className="relative aspect-video bg-slate-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] transition-all duration-500">
                {/* Video Container */}
                <div className="absolute inset-0">
                    {isPlaying ? (
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            controls
                            src={videoUrl}
                            onError={handleVideoError}
                            loop
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                            {error ? (
                                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                                    <p className="text-red-400 text-lg">
                                        {error}
                                    </p>
                                </div>
                            ) : isLoading ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                                </div>
                            ) : (
                                <button
                                    onClick={handlePlayClick}
                                    className="absolute inset-0 flex items-center justify-center group"
                                >
                                    <div className="w-24 h-24 bg-blue-600/90 backdrop-blur-sm rounded-2xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-500 group-hover:rounded-full group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                                        <FaPlay className="w-10 h-10 text-white ml-2" />
                                    </div>
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Enhanced Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />

                {/* Ambient Light Effect */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500/20 via-transparent to-purple-500/20 blur-2xl opacity-50 pointer-events-none" />
            </div>
        </div>
    );
};

export default TVDisplay;
