import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-900">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
