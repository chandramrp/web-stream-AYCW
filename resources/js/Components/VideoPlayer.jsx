import React, { useState, useRef, useEffect } from "react";
import {
    FaPlay,
    FaPause,
    FaExpand,
    FaCompress,
    FaVolumeUp,
    FaVolumeMute,
    FaForward,
    FaBackward,
    FaCog,
    FaClosedCaptioning,
    FaSpinner,
} from "react-icons/fa";

export default function VideoPlayer({ videoUrl, poster }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [showSpeedControls, setShowSpeedControls] = useState(false);
    const [bufferingProgress, setBufferingProgress] = useState(0);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);

    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const controlsTimeout = useRef(null);
    const progressBarRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
            setIsLoading(false);
        };

        const handleWaiting = () => setIsLoading(true);
        const handlePlaying = () => setIsLoading(false);
        const handleProgress = () => {
            if (video.buffered.length > 0) {
                const bufferedEnd = video.buffered.end(
                    video.buffered.length - 1
                );
                setBufferingProgress((bufferedEnd / video.duration) * 100);
            }
        };

        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        video.addEventListener("waiting", handleWaiting);
        video.addEventListener("playing", handlePlaying);
        video.addEventListener("progress", handleProgress);

        return () => {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
            video.removeEventListener("waiting", handleWaiting);
            video.removeEventListener("playing", handlePlaying);
            video.removeEventListener("progress", handleProgress);
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
        };

        video.addEventListener("timeupdate", handleTimeUpdate);
        return () => video.removeEventListener("timeupdate", handleTimeUpdate);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.playbackRate = playbackSpeed;
    }, [playbackSpeed]);

    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleSeek = (e) => {
        const rect = progressBarRef.current.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const time = pos * duration;
        videoRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const handleVolumeChange = (e) => {
        const value = e.target.value / 100;
        videoRef.current.volume = value;
        setVolume(value);
        setIsMuted(value === 0);
    };

    const toggleMute = () => {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
        if (isMuted) {
            videoRef.current.volume = volume;
        } else {
            videoRef.current.volume = 0;
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
        if (hours > 0) {
            return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
                seconds < 10 ? "0" : ""
            }${seconds}`;
        }
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const skipForward = () => {
        videoRef.current.currentTime += 10;
    };

    const skipBackward = () => {
        videoRef.current.currentTime -= 10;
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeout.current) {
            clearTimeout(controlsTimeout.current);
        }
        if (isPlaying) {
            controlsTimeout.current = setTimeout(() => {
                setShowControls(false);
            }, 3000);
        }
    };

    const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

    const handleKeyPress = (e) => {
        switch (e.key.toLowerCase()) {
            case " ":
            case "k":
                e.preventDefault();
                togglePlay();
                break;
            case "f":
                e.preventDefault();
                toggleFullscreen();
                break;
            case "m":
                e.preventDefault();
                toggleMute();
                break;
            case "arrowleft":
                e.preventDefault();
                skipBackward();
                break;
            case "arrowright":
                e.preventDefault();
                skipForward();
                break;
            case "arrowup":
                e.preventDefault();
                setVolume(Math.min(1, volume + 0.1));
                videoRef.current.volume = Math.min(1, volume + 0.1);
                break;
            case "arrowdown":
                e.preventDefault();
                setVolume(Math.max(0, volume - 0.1));
                videoRef.current.volume = Math.max(0, volume - 0.1);
                break;
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-video bg-black group"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
            onKeyDown={handleKeyPress}
            tabIndex="0"
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                className="w-full h-full cursor-pointer"
                src={videoUrl}
                poster={poster}
                onClick={togglePlay}
                onDoubleClick={toggleFullscreen}
            />

            {/* Loading Spinner */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <FaSpinner className="w-12 h-12 text-blue-500 animate-spin" />
                </div>
            )}

            {/* Video Controls */}
            <div
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-4 py-3 transition-opacity duration-300 ${
                    showControls ? "opacity-100" : "opacity-0"
                }`}
            >
                {/* Progress Bar */}
                <div
                    ref={progressBarRef}
                    className="relative w-full h-1 mb-2 cursor-pointer group"
                    onClick={handleSeek}
                >
                    {/* Buffer Progress */}
                    <div
                        className="absolute h-full bg-white/30 rounded-full"
                        style={{ width: `${bufferingProgress}%` }}
                    />
                    {/* Playback Progress */}
                    <div
                        className="absolute h-full bg-blue-500 rounded-full group-hover:bg-blue-400"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100" />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    {/* Left Controls */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={togglePlay}
                            className="text-white hover:text-blue-400 transition-colors"
                            title={isPlaying ? "Pause (k)" : "Play (k)"}
                        >
                            {isPlaying ? (
                                <FaPause className="w-5 h-5" />
                            ) : (
                                <FaPlay className="w-5 h-5" />
                            )}
                        </button>

                        <button
                            onClick={skipBackward}
                            className="text-white hover:text-blue-400 transition-colors"
                            title="Rewind 10s (←)"
                        >
                            <FaBackward className="w-4 h-4" />
                        </button>

                        <button
                            onClick={skipForward}
                            className="text-white hover:text-blue-400 transition-colors"
                            title="Forward 10s (→)"
                        >
                            <FaForward className="w-4 h-4" />
                        </button>

                        <div
                            className="relative"
                            onMouseEnter={() => setShowVolumeSlider(true)}
                            onMouseLeave={() => setShowVolumeSlider(false)}
                        >
                            <button
                                onClick={toggleMute}
                                className="text-white hover:text-blue-400 transition-colors"
                                title="Mute (m)"
                            >
                                {isMuted ? (
                                    <FaVolumeMute className="w-5 h-5" />
                                ) : (
                                    <FaVolumeUp className="w-5 h-5" />
                                )}
                            </button>
                            <div
                                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-black/90 rounded-lg transition-opacity duration-200 ${
                                    showVolumeSlider
                                        ? "opacity-100"
                                        : "opacity-0 pointer-events-none"
                                }`}
                            >
                                <input
                                    type="range"
                                    className="w-24 h-1 bg-slate-600 rounded-full appearance-none cursor-pointer rotate-270"
                                    value={isMuted ? 0 : volume * 100}
                                    onChange={handleVolumeChange}
                                    title="Volume"
                                />
                            </div>
                        </div>

                        <span className="text-white text-sm">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setIsSettingsOpen(!isSettingsOpen)
                                }
                                className="text-white hover:text-blue-400 transition-colors"
                                title="Settings"
                            >
                                <FaCog
                                    className={`w-5 h-5 ${
                                        isSettingsOpen ? "animate-spin" : ""
                                    }`}
                                />
                            </button>
                            {isSettingsOpen && (
                                <div className="absolute bottom-full right-0 mb-2 p-2 bg-black/90 rounded-lg">
                                    <div className="text-white text-sm">
                                        <button
                                            onClick={() =>
                                                setShowSpeedControls(
                                                    !showSpeedControls
                                                )
                                            }
                                            className="w-full px-4 py-2 text-left hover:bg-white/10 rounded"
                                        >
                                            Playback Speed: {playbackSpeed}x
                                        </button>
                                        {showSpeedControls && (
                                            <div className="mt-1">
                                                {speedOptions.map((speed) => (
                                                    <button
                                                        key={speed}
                                                        onClick={() => {
                                                            setPlaybackSpeed(
                                                                speed
                                                            );
                                                            setShowSpeedControls(
                                                                false
                                                            );
                                                            setIsSettingsOpen(
                                                                false
                                                            );
                                                        }}
                                                        className={`w-full px-4 py-1 text-left hover:bg-white/10 rounded ${
                                                            playbackSpeed ===
                                                            speed
                                                                ? "text-blue-400"
                                                                : ""
                                                        }`}
                                                    >
                                                        {speed}x
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={toggleFullscreen}
                            className="text-white hover:text-blue-400 transition-colors"
                            title="Fullscreen (f)"
                        >
                            {isFullscreen ? (
                                <FaCompress className="w-4 h-4" />
                            ) : (
                                <FaExpand className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
