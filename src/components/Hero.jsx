import React from 'react';
import { FaUtensils } from 'react-icons/fa'; // Import icons
import { FiPhone } from 'react-icons/fi';

const Hero = () => {
    return (
        <section className="relative bg-gradient-to-r from-emerald-50 to-red-50 py-20" id='home'>
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-4xl mx-auto mt-15">
                    <h1 className="text-4xl md:text-6xl font-bold text-emerald-800 mb-6 text-balance">
                        Welcome to Harrison's Spice
                    </h1>
                    <p className="text-xl md:text-2xl text-emerald-700 mb-8 text-pretty">
                        Refined Indian cuisine with a modern twist in the heart of Ratby
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#menu">
                            <button className="bg-emerald-700 hover:bg-emerald-800 flex text-white py-2 px-6 rounded-lg font-semibold">
                                <FaUtensils className="mr-2 h-5 w-5" />
                                View Menu
                            </button>
                        </a>
                        <a href="tel:01162395644">
                            <button
                                className="border-red-600 border text-red-600 hover:bg-red-600 flex hover:text-white py-2 px-6 rounded-lg font-semibold bg-transparent"
                            >
                                <FiPhone className="mr-2 h-5 w-5" />
                                Make Reservation
                            </button>
                        </a>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
