import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { FaUpload, FaLink, FaArrowLeft } from "react-icons/fa";

export default function Create() {
    const [sourceType, setSourceType] = useState("local");
    const [posterPreview, setPosterPreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        year: new Date().getFullYear(),
        duration: "",
        rating: "",
        genres: [],
        cast: [],
        director: "",
        writer: "",
        source_type: "local",
        poster: null,
        video: null,
        poster_url: "",
        video_url: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", data);

        const formData = new FormData();

        // Append all form fields
        Object.keys(data).forEach((key) => {
            if (key === "genres" || key === "cast") {
                formData.append(key, JSON.stringify(data[key]));
            } else if (key === "poster" || key === "video") {
                if (data[key] instanceof File) {
                    formData.append(key, data[key]);
                }
            } else {
                formData.append(key, data[key]);
            }
        });

        post("/admin/movies", formData, {
            forceFormData: true,
            preserveScroll: true,
            headers: {
                Accept: "application/json",
            },
            onError: (errors) => {
                console.error("Error:", errors);
                Object.keys(errors).forEach((key) => {
                    alert(`Error: ${key} - ${errors[key]}`);
                });
            },
            onSuccess: () => {
                alert("Film berhasil ditambahkan!");
                reset();
                setPosterPreview(null);
                setVideoPreview(null);
                window.location.href = "/admin/movies";
            },
        });
    };

    const handlePosterChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                alert("Ukuran poster tidak boleh lebih dari 10MB");
                e.target.value = "";
                return;
            }
            setData("poster", file);
            const reader = new FileReader();
            reader.onloadend = () => setPosterPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (2GB limit)
            if (file.size > 2 * 1024 * 1024 * 1024) {
                alert("Ukuran video tidak boleh lebih dari 2GB");
                e.target.value = "";
                return;
            }
            setData("video", file);
            setVideoPreview(URL.createObjectURL(file));
        }
    };

    const handleSourceTypeChange = (type) => {
        setSourceType(type);
        setData("source_type", type);
        setData({
            ...data,
            source_type: type,
            poster: null,
            video: null,
            poster_url: "",
            video_url: "",
        });
        setPosterPreview(null);
        setVideoPreview(null);
    };

    const handleGenreChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setData("genres", [...data.genres, value]);
        } else {
            setData(
                "genres",
                data.genres.filter((genre) => genre !== value)
            );
        }
    };

    const handleCastChange = (value) => {
        const castList = value.split(",").map((item) => item.trim());
        setData("cast", castList);
    };

    return (
        <AdminLayout>
            <Head title="Tambah Film Baru" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mb-6 flex justify-between items-center">
                        <div className="flex items-center">
                            <button
                                onClick={() => window.history.back()}
                                className="mr-4 text-slate-400 hover:text-white transition-colors"
                            >
                                <FaArrowLeft className="w-5 h-5" />
                            </button>
                            <h2 className="text-2xl font-bold text-white">
                                Tambah Film Baru
                            </h2>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-slate-800 shadow-xl rounded-lg overflow-hidden">
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <div className="p-6 space-y-6">
                                {/* Source Type Selection */}
                                <div className="border-b border-slate-700 pb-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">
                                        Sumber Film
                                    </h3>
                                    <div className="flex space-x-4">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleSourceTypeChange("local")
                                            }
                                            className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-all ${
                                                sourceType === "local"
                                                    ? "border-blue-500 bg-blue-500/10 text-white"
                                                    : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                                            }`}
                                        >
                                            <FaUpload className="w-5 h-5 mr-2" />
                                            File Lokal
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleSourceTypeChange("url")
                                            }
                                            className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-all ${
                                                sourceType === "url"
                                                    ? "border-blue-500 bg-blue-500/10 text-white"
                                                    : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                                            }`}
                                        >
                                            <FaLink className="w-5 h-5 mr-2" />
                                            URL
                                        </button>
                                    </div>
                                </div>

                                {/* Basic Information */}
                                <div className="border-b border-slate-700 pb-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">
                                        Informasi Dasar
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel
                                                htmlFor="title"
                                                value="Judul Film"
                                            />
                                            <TextInput
                                                id="title"
                                                type="text"
                                                value={data.title}
                                                onChange={(e) =>
                                                    setData(
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 block w-full"
                                                required
                                            />
                                            <InputError
                                                message={errors.title}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="year"
                                                value="Tahun Rilis"
                                            />
                                            <TextInput
                                                id="year"
                                                type="number"
                                                value={data.year}
                                                onChange={(e) =>
                                                    setData(
                                                        "year",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 block w-full"
                                                required
                                            />
                                            <InputError
                                                message={errors.year}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="description"
                                            value="Deskripsi"
                                        />
                                        <textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full rounded-lg bg-slate-700 text-slate-200 border-slate-600 focus:border-blue-500 focus:ring-blue-500"
                                            rows="4"
                                            required
                                        />
                                        <InputError
                                            message={errors.description}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                        <div>
                                            <InputLabel
                                                htmlFor="duration"
                                                value="Durasi (menit)"
                                            />
                                            <TextInput
                                                id="duration"
                                                type="number"
                                                value={data.duration}
                                                onChange={(e) =>
                                                    setData(
                                                        "duration",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 block w-full"
                                                required
                                            />
                                            <InputError
                                                message={errors.duration}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="rating"
                                                value="Rating (0-10)"
                                            />
                                            <TextInput
                                                id="rating"
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="10"
                                                value={data.rating}
                                                onChange={(e) =>
                                                    setData(
                                                        "rating",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 block w-full"
                                                required
                                            />
                                            <InputError
                                                message={errors.rating}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Genre Selection */}
                                <div className="border-b border-slate-700 pb-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">
                                        Genre
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {[
                                            "Action",
                                            "Adventure",
                                            "Comedy",
                                            "Drama",
                                            "Fantasy",
                                            "Horror",
                                            "Mystery",
                                            "Romance",
                                            "Sci-Fi",
                                            "Thriller",
                                            "Western",
                                            "Animation",
                                        ].map((genre) => (
                                            <label
                                                key={genre}
                                                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                                    data.genres.includes(genre)
                                                        ? "border-blue-500 bg-blue-500/10 text-white"
                                                        : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={genre}
                                                    checked={data.genres.includes(
                                                        genre
                                                    )}
                                                    onChange={handleGenreChange}
                                                    className="hidden"
                                                />
                                                <span>{genre}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <InputError
                                        message={errors.genres}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Cast & Crew */}
                                <div className="border-b border-slate-700 pb-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">
                                        Pemeran & Kru
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel
                                                htmlFor="director"
                                                value="Sutradara"
                                            />
                                            <TextInput
                                                id="director"
                                                type="text"
                                                value={data.director}
                                                onChange={(e) =>
                                                    setData(
                                                        "director",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 block w-full"
                                                required
                                            />
                                            <InputError
                                                message={errors.director}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="writer"
                                                value="Penulis"
                                            />
                                            <TextInput
                                                id="writer"
                                                type="text"
                                                value={data.writer}
                                                onChange={(e) =>
                                                    setData(
                                                        "writer",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 block w-full"
                                                required
                                            />
                                            <InputError
                                                message={errors.writer}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="cast"
                                            value="Pemeran (pisahkan dengan koma)"
                                        />
                                        <TextInput
                                            id="cast"
                                            type="text"
                                            value={data.cast.join(", ")}
                                            onChange={(e) =>
                                                handleCastChange(e.target.value)
                                            }
                                            className="mt-1 block w-full"
                                            placeholder="Nama Aktor 1, Nama Aktor 2, ..."
                                            required
                                        />
                                        <InputError
                                            message={errors.cast}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                {/* Media Upload/URL Section */}
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">
                                        Media
                                    </h3>
                                    {sourceType === "local" ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Poster Upload */}
                                            <div>
                                                <InputLabel
                                                    htmlFor="poster"
                                                    value="Poster Film"
                                                />
                                                <div className="mt-2">
                                                    <input
                                                        type="file"
                                                        id="poster"
                                                        onChange={
                                                            handlePosterChange
                                                        }
                                                        accept="image/*"
                                                        className="hidden"
                                                    />
                                                    <label
                                                        htmlFor="poster"
                                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-700/50 hover:bg-slate-700 transition-colors"
                                                    >
                                                        {posterPreview ? (
                                                            <img
                                                                src={
                                                                    posterPreview
                                                                }
                                                                alt="Preview"
                                                                className="w-full h-full object-contain rounded-lg"
                                                            />
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                <FaUpload className="w-8 h-8 mb-4 text-slate-400" />
                                                                <p className="mb-2 text-sm text-slate-400">
                                                                    <span className="font-semibold">
                                                                        Klik
                                                                        untuk
                                                                        upload
                                                                    </span>{" "}
                                                                    atau drag
                                                                    and drop
                                                                </p>
                                                                <p className="text-xs text-slate-400">
                                                                    JPG, PNG
                                                                    (MAX. 2MB)
                                                                </p>
                                                            </div>
                                                        )}
                                                    </label>
                                                </div>
                                                <InputError
                                                    message={errors.poster}
                                                    className="mt-2"
                                                />
                                            </div>

                                            {/* Video Upload */}
                                            <div>
                                                <InputLabel
                                                    htmlFor="video"
                                                    value="File Video"
                                                />
                                                <div className="mt-2">
                                                    <input
                                                        type="file"
                                                        id="video"
                                                        onChange={
                                                            handleVideoChange
                                                        }
                                                        accept="video/*"
                                                        className="hidden"
                                                    />
                                                    <label
                                                        htmlFor="video"
                                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-700/50 hover:bg-slate-700 transition-colors"
                                                    >
                                                        {videoPreview ? (
                                                            <video
                                                                src={
                                                                    videoPreview
                                                                }
                                                                controls
                                                                className="w-full h-full object-contain rounded-lg"
                                                            />
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                <FaUpload className="w-8 h-8 mb-4 text-slate-400" />
                                                                <p className="mb-2 text-sm text-slate-400">
                                                                    <span className="font-semibold">
                                                                        Klik
                                                                        untuk
                                                                        upload
                                                                    </span>{" "}
                                                                    atau drag
                                                                    and drop
                                                                </p>
                                                                <p className="text-xs text-slate-400">
                                                                    MP4, MOV,
                                                                    AVI (MAX.
                                                                    2GB)
                                                                </p>
                                                            </div>
                                                        )}
                                                    </label>
                                                </div>
                                                <InputError
                                                    message={errors.video}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Poster URL */}
                                            <div>
                                                <InputLabel
                                                    htmlFor="poster_url"
                                                    value="URL Poster"
                                                />
                                                <TextInput
                                                    id="poster_url"
                                                    type="url"
                                                    value={data.poster_url}
                                                    onChange={(e) =>
                                                        setData(
                                                            "poster_url",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="mt-1 block w-full"
                                                    placeholder="https://example.com/poster.jpg"
                                                    required
                                                />
                                                <InputError
                                                    message={errors.poster_url}
                                                    className="mt-2"
                                                />
                                            </div>

                                            {/* Video URL */}
                                            <div>
                                                <InputLabel
                                                    htmlFor="video_url"
                                                    value="URL Video"
                                                />
                                                <TextInput
                                                    id="video_url"
                                                    type="url"
                                                    value={data.video_url}
                                                    onChange={(e) =>
                                                        setData(
                                                            "video_url",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="mt-1 block w-full"
                                                    placeholder="https://example.com/video.mp4"
                                                    required
                                                />
                                                <InputError
                                                    message={errors.video_url}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="px-6 py-4 bg-slate-900/50 flex items-center justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 flex items-center"
                                >
                                    {processing ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        "Simpan Film"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
