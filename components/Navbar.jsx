"use client";

import React, { useState } from "react";
import { Menu, X, Sparkles, Github, Twitter, Code, CodeXml } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#0f172a]/70 backdrop-blur-lg border-b border-white/10 supports-[backdrop-filter]:bg-[#0f172a]/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* 1. LEFT: Logo Section */}
                    <div className="flex items-center gap-2 cursor-pointer group shrink-0">
                        <div className="bg-gradient-to-tr from-purple-500 to-blue-500 p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                            Remover.AI
                        </span>
                    </div>


                    <div className="hidden md:flex items-center gap-4">

                        <a href="#" className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all">
                            <CodeXml className="w-5 h-5" />
                        </a>
                    </div>

                    {/* 4. RIGHT: Mobile Menu Button (Visible ONLY on Mobile) */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* 5. Mobile Dropdown Menu (Conditionally Rendered) */}
            {isOpen && (
                <div className="md:hidden bg-[#0f172a] border-b border-white/10 animate-in slide-in-from-top-5 duration-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

                        {/* Mobile Icons (Centered Row with Divider) */}
                        <div className="pt-4 pb-2 mt-2 border-t border-white/10 flex items-center justify-center gap-6">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                <Twitter className="w-5 h-5" /> <span className="text-sm">Twitter</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                <Github className="w-5 h-5" /> <span className="text-sm">Github</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

// --- Helper Components ---

function NavLink({ href, children }) {
    return (
        <Link
            href={href}
            className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
            {children}
        </Link>
    );
}

function MobileNavLink({ href, children }) {
    return (
        <Link
            href={href}
            className="block text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-base font-medium transition-colors"
        >
            {children}
        </Link>
    );
}