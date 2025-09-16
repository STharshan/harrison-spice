import React, { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle menu function
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            {/* Header */}
            <header className="bg-[#f8f0dc] border-b border-gray-300 shadow-sm fixed top-0 left-0 w-full z-50">
                <div className="px-4 py-4 flex items-center justify-between max-w-7xl mx-auto">
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                        <img
                            src="logo.png"
                            alt="Harrison's Spice Logo"
                            width={200}
                            height={60}
                            className="h-12 w-auto"
                        />
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden flex-grow md:flex justify-center space-x-6 font-semibold">
                        <a href="#home" className="text-foreground hover:text-emerald-700 transition-colors">
                            Home
                        </a>
                        <a href="#about" className="text-foreground hover:text-emerald-700 transition-colors">
                            About
                        </a>
                        <a href="#menu" className="text-foreground hover:text-emerald-700 transition-colors">
                            Menu
                        </a>
                        <a href="#contact" className="text-foreground hover:text-emerald-700 transition-colors">
                            Contact
                        </a>
                    </nav>
                    {/* Button on the right */}
                    <button className="hidden md:flex bg-emerald-700 py-2 px-3 rounded-lg font-semibold hover:bg-emerald-800 text-white ml-6">
                        Make Reservation
                    </button>

                    {/* Hamburger Icon for Mobile */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden flex items-center justify-center p-2 rounded-md focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6 text-foreground"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            <div
                className={`${isMenuOpen ? 'block' : 'hidden'
                    } md:hidden top-20 fixed left-0 w-full bg-[#f8f0dc] py-4 z-40`}
            >
                <div className="flex flex-col items-center space-y-4">
                    <a href="#home" className="text-foreground hover:text-emerald-700 transition-colors">
                        Home
                    </a>
                    <a href="#menu" className="text-foreground hover:text-emerald-700 transition-colors">
                        Menu
                    </a>
                    <a href="#about" className="text-foreground hover:text-emerald-700 transition-colors">
                        About
                    </a>
                    <a href="#contact" className="text-foreground hover:text-emerald-700 transition-colors">
                        Contact
                    </a>
                    <button className="bg-emerald-700 py-2 px-3 rounded-lg font-semibold hover:bg-emerald-800 text-white">
                        Make Reservation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
