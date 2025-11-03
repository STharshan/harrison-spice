"use client";
import React from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const teamMembers = [
  {
    name: "William Joseph",
    role: "Product Designer",
    image: "/team1.png",
    socials: {
      instagram: "https://instagram.com/williamj",
      twitter: "https://twitter.com/williamj",
      linkedin: "https://linkedin.com/in/williamj",
    },
  },
  {
    name: "Charlotte Rose",
    role: "Product Designer",
    image: "/team2.png",
    socials: {
      instagram: "https://instagram.com/charlotterose",
      twitter: "https://twitter.com/charlotterose",
      linkedin: "https://linkedin.com/in/charlotterose",
    },
  },
  {
    name: "Michael James",
    role: "Marketing Leader",
    image: "/team3.png",
    socials: {
      instagram: "https://instagram.com/michaeljames",
      twitter: "https://twitter.com/michaeljames",
      linkedin: "https://linkedin.com/in/michaeljames",
    },
  },
  {
    name: "Jennifer Ann",
    role: "Project Manager",
    image: "/team4.png",
    socials: {
      instagram: "https://instagram.com/jenniferann",
      twitter: "https://twitter.com/jenniferann",
      linkedin: "https://linkedin.com/in/jenniferann",
    },
  },
];

export default function TeamSection() {
  return (
    <section className="bg-[#981921] dark:bg-black text-white transition-colors duration-500 py-20 px-6 md:px-12 lg:px-20 font-sans">
      {/* === Section Heading === */}
      <div className="text-center mb-14">
        <p className="text-[#C5A265] uppercase tracking-widest mb-3 text-sm">
          Our Professionals
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold">Meet the Team</h2>
        <p className="text-gray-300 mt-3 max-w-2xl mx-auto text-base">
          Creative minds behind our success — passionate experts building the
          future together.
        </p>
      </div>

      {/* === Team Cards === */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="relative group border border-[#2B2B2B] rounded-sm overflow-hidden p-6 text-center 
            bg-[#0B0B0D] dark:bg-[#121212] hover:border-[#C5A265] transition duration-300"
          >
            {/* Corner lines */}
            <span className="absolute top-0 left-0 w-6 h-[1px] bg-white"></span>
            <span className="absolute top-0 left-0 h-6 w-[1px] bg-white"></span>
            <span className="absolute bottom-0 right-0 w-6 h-[1px] bg-white"></span>
            <span className="absolute bottom-0 right-0 h-6 w-[1px] bg-white"></span>

            {/* Profile Image */}
            <div className="w-full flex justify-center mb-6">
              <img
                src="logo.png"
                alt={member.name}
                className="w-55 h-35 object-cover rounded-none"
              />
            </div>

            {/* Name & Role */}
            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
            <p className="text-gray-400 text-base mb-6">{member.role}</p>

            {/* Social Icons */}
            <div className="flex justify-center gap-4">
              <a
                href={member.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#2B2B2B] w-10 h-10 flex items-center justify-center hover:border-[#C5A265] transition"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href={member.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#2B2B2B] w-10 h-10 flex items-center justify-center hover:border-[#C5A265] transition"
              >
                <FaXTwitter className="text-xl" />
              </a>
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#2B2B2B] w-10 h-10 flex items-center justify-center hover:border-[#C5A265] transition"
              >
                <FaLinkedinIn className="text-xl" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
