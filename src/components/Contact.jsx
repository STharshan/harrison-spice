import React, { useEffect } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaRegClock } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            offset: 100,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    return (
        <section id="contact" className="py-16 bg-[#981921] scroll-m-10">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12" data-aos="fade-down">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#00684A] mb-4">Contact Us</h2>
                        <p className="text-lg text-muted-foreground">Get in touch for reservations and inquiries</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Visit Us Card */}
                        <div className="bg-white border-gray-300 p-6 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="100">
                            <div className="text-[#00684A] text-xl font-semibold mb-4">Visit Us</div>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <FaMapMarkerAlt className="h-5 w-5 text-[#00684A] mt-1" />
                                    <div>
                                        <p className="font-medium text-foreground">Address</p>
                                        <p className="text-muted-foreground">
                                            <a
                                                href="https://www.google.com/maps?q=23-27+Station+Street,+Ratby,+Leicestershire,+LE6+0JQ"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:underline"
                                            >
                                                23-27 Station Street, Ratby
                                                <br />
                                                Leicestershire, LE6 0JQ
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <hr className="text-gray-300 mt-5" />
                                <div className="flex items-center space-x-3">
                                    <FaPhoneAlt className="h-5 w-5 text-[#00684A]" />
                                    <div>
                                        <p className="font-medium text-foreground">Phone</p>
                                        <p className="text-muted-foreground">
                                            <a href="tel:01162395644" className="hover:underline">
                                                0116 2395 644
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <hr className="text-gray-300 mt-5" />
                                <div className="flex items-center space-x-3">
                                    <FaEnvelope className="h-5 w-5 text-[#00684A]" />
                                    <div>
                                        <p className="font-medium text-foreground">Email</p>
                                        <p className="text-muted-foreground">
                                            <a href="mailto:reservations@harrisonsspice.co.uk" className="hover:underline">
                                                reservations@harrisonsspice.co.uk
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Opening Hours Card */}
                        <div className="bg-white border-gray-300 p-6 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="200">
                            <div className="text-[#00684A] text-xl font-semibold mb-4">Opening Hours</div>
                            <div>
                                <div className="flex items-start space-x-3">
                                    <FaRegClock className="h-5 w-5 text-[#00684A] mt-1" />
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2.5">
                                            <span className="text-foreground">Monday - Thursday</span>
                                            <span className="text-muted-foreground">5:00 PM - 11:00 PM</span>
                                        </div>
                                        <div className="flex items-center gap-7">
                                            <span className="text-foreground">Friday - Saturday</span>
                                            <span className="text-muted-foreground">5:00 PM - 11:30 PM</span>
                                        </div>
                                        <div className="flex items-center gap-24">
                                            <span className="text-foreground">Sunday</span>
                                            <span className="text-muted-foreground">5:00 PM - 10:30 PM</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <hr className="text-gray-300 mt-5" />
                            <div className="text-center mt-10">
                                <a href="tel:01162395644">
                                    <button className="group w-full flex items-center justify-center bg-[#981921] hover:bg-red-700 text-white py-2 rounded-lg transition-all duration-300">
                                        <FaPhoneAlt className="mr-2 h-4 w-4 transform transition-all duration-300 group-hover:-translate-x-2" />
                                        <span className="transform transition-all duration-300 group-hover:translate-x-2">
                                            Call for Reservation
                                        </span>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
