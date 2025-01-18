import React from "react";

const TVDisplay = () => {
    return (
        <div className="flex-1 max-w-2xl relative">
            <div className="relative w-full aspect-video bg-slate-800 rounded-lg shadow-2xl overflow-hidden">
                {/* TV Content/Preview */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-500/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-white/30 rounded-full animate-pulse" />
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-500/20 rounded-full blur-xl" />
        </div>
    );
};

export default TVDisplay;
