import React from "react";
import { Link } from "@inertiajs/react";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        layanan: [
            { name: "Film Terbaru", href: "/" },
            { name: "Film Populer", href: "/" },
            { name: "Genre", href: "/genres" },
            { name: "Watchlist", href: "/watchlist" },
        ],
        perusahaan: [
            { name: "Tentang Kami", href: "/about" },
            { name: "Karir", href: "/careers" },
            { name: "Hubungi Kami", href: "/contact" },
            { name: "Blog", href: "/blog" },
        ],
        bantuan: [
            { name: "FAQ", href: "/faq" },
            { name: "Syarat & Ketentuan", href: "/terms" },
            { name: "Kebijakan Privasi", href: "/privacy" },
            { name: "Cara Berlangganan", href: "/subscribe" },
        ],
    };

    const socialLinks = [
        {
            name: "Facebook",
            icon: <FaFacebookF />,
            url: "https://facebook.com/allyoucanwatch",
        },
        {
            name: "Twitter",
            icon: <FaTwitter />,
            url: "https://twitter.com/allyoucanwatch",
        },
        {
            name: "Instagram",
            icon: <FaInstagram />,
            url: "https://instagram.com/allyoucanwatch",
        },
        {
            name: "YouTube",
            icon: <FaYoutube />,
            url: "https://youtube.com/allyoucanwatch",
        },
    ];

    return (
        <footer className="border-t border-slate-800 bg-slate-900 pb-8 pt-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <div>
                        <Link
                            href="/"
                            className="text-2xl font-caesar tracking-wide text-slate-200 transition-colors duration-200 hover:text-blue-400"
                        >
                            <div className="flex flex-col text-2lg tracking-tighter">
                                <span className="mb-0 block h-5 p-0">A Y</span>
                                <span className="mt-0 block h-fit p-0">
                                    C W
                                </span>
                            </div>
                        </Link>
                        <p className="mb-6 mt-4 text-slate-400">
                            Platform streaming film terbaik dengan koleksi
                            terlengkap dan pengalaman menonton yang tak
                            terlupakan.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 transition-colors hover:text-blue-400"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div>
                        <h3 className="mb-4 font-semibold text-white">
                            Layanan
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.layanan.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 transition-colors hover:text-blue-400"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-white">
                            Perusahaan
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.perusahaan.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 transition-colors hover:text-blue-400"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="mb-4 font-semibold text-white">
                            Hubungi Kami
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <FaMapMarkerAlt className="mt-1 text-blue-400" />
                                <span className="text-slate-400">
                                    Jl. Raya Baleendah No. 88, Bandung
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FaPhone className="text-blue-400" />
                                <span className="text-slate-400">
                                    +62 21 1234 5678
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FaEnvelope className="text-blue-400" />
                                <span className="text-slate-400">
                                    support@allyoucanwatch.com
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <p className="mb-4 text-sm text-slate-400 md:mb-0">
                            © {currentYear} AllYouCanWatch. All rights reserved.
                        </p>
                        <ul className="flex flex-wrap justify-center space-x-6">
                            {footerLinks.bantuan.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 transition-colors hover:text-blue-400"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
