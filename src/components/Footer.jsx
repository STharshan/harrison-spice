import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#981921] text-white px-6 py-5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-left mt-5">
                {/* Column 1 */}
                <div>
                    <img
                        className="h-15 w-60 mb-10 font-serif tracking-widest ml-8 sm:ml-5"
                        src="/logo.png"
                        alt="logo"
                    />
                    {/* <p className="text-md font-semibold text-gray-400 mb-4">
                        Where comfort meets crave-worthy. Bite into our signature burgers, golden fries, and urban-inspired eats in the heart of the city.
                    </p> */}
                    <div className="flex space-x-4 text-black ml-20">
                        <a target="_blank" href="https://web.facebook.com/" className="text-2xl hover:text-blue-700 bg-[#00684A] rounded-full p-2"><FaFacebookF /></a>
                        <a target="_blank" href="https://www.instagram.com/" className="hover:text-pink-500 text-2xl bg-[#00684A] rounded-full p-2"><FaInstagram /></a>
                    </div>
                </div>

                {/* Column 2 */}
                <div>
                    <h3 className="text-xl font-bold mb-5 text-black">Quick Links</h3>
                    <ul className="space-y-2 text-md text-black font-semibold">
                        <li><a href="#home" className="hover:text-gray-300">Home</a></li>
                        <li><a href="#menu" className="hover:text-gray-300">Menu</a></li>
                        <li><a href="#about" className="hover:text-gray-300">About</a></li>
                        <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
                        <li>
                            <Link
                                to="/terms&condition" // Redirects to the Terms & Conditions page
                                className="hover:text-gray-300 transition"
                            >
                                Term & Conditions
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/privacy-policy" // Assuming you have a privacy policy page as well
                                className="hover:text-gray-300 transition"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Column 3 */}
                <div>
                    <h3 className="text-xl font-bold mb-5 text-black">Our Menu</h3>
                    <ul className="space-y-2 text-md text-black font-semibold">
                        <li><a href="#menu" className="hover:text-gray-300">Vegetarian Appestisers</a></li>
                        <li><a href="#menu" className="hover:text-gray-300">Fish Appetisers</a></li>
                        <li><a href="#menu" className="hover:text-gray-300">Meat & Poultry Appetisers</a></li>
                        <li><a href="#menu" className="hover:text-gray-300">Tandoori Specialities</a></li>
                        <li><a href="#menu" className="hover:text-gray-300">Balti Special Dishes</a></li>
                    </ul>
                </div>

                {/* Column 4 */}
                <div>
                    <h3 className="text-xl font-bold mb-5 text-black">Contact Info</h3>
                    <ul className="space-y-2 text-md text-gray-400 font-semibold">
                        <li className="flex items-start gap-2">
                            <FiMapPin className="mt-1 text-[#00684A]" />
                            <a
                                href="https://www.google.com/maps?q=23-27+Station+Street,+Ratby,+Leicestershire,+LE6+0JQ"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline text-black"
                            >
                                23-27 Station Street, Ratby, Leicestershire, LE6 0JQ
                            </a>
                        </li>
                        <li className="flex items-center gap-2">
                            <FiPhone className="text-[#00684A]" />
                            <a
                                href="tel: 0116 2395 644"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline text-black"
                            >
                                0116 2395 644
                            </a>
                        </li>
                        <li className="flex items-center gap-2">
                            <FiMail className="text-[#00684A]" />
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=reservations@harrisonsspice.co.uk.com&su=Inquiry%20of%20Website"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline text-black"
                            >
                                reservations@harrisonsspice.co.uk
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <hr className="my-8 border-gray-600" />
            <div className="text-center text-md text-black font-semibold">
                © 2025 Harrison's Spice. All rights reserved.
            </div>
            {/* Bottom Bar */}
            <div className="mt-2 text-center font-semibold text-black">
                <p>
                    Powered by{" "}
                    <a
                        href="https://www.ansely.co.uk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#00684A] hover:underline"
                    >
                        Ansely
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
