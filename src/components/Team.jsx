"use client";
import React from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const topTeam = [
  {
    name: " Kolilur ",
    role: "Head Chef",
    image: "/p1.jpg",
    socials: {
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Kabir ",
    role: "Front Of House",
    image: "/p7.jpg",
    socials: {
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
];

const teamMembers = [
  {
    name: "Abhijit ",
    role: "Waiter",
    image: "/p6.jpg",
    socials: {
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: " Katie ",
    role: "Waiter",
    image: "/p2.jpg",
    socials: {
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: " Kasrul",
    role: "Second Chef",
    image: "/p3.jpg",
    socials: {
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Mahibub",
    role: "Kitchen assistant",
    image: "/p9.jpg",
    socials: {
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Jamil ",
    role: "Waiter",
    image: "/p8.jpg",
    socials: {
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
];

export default function TeamSection() {
  return (
    <section className="bg-white dark:bg-black text-black dark:text-white py-20 px-6 md:px-12 lg:px-20 font-sans transition-colors duration-500">
      {/* === Section Heading === */}
      <div className="text-center mb-14">
        <p className="text-black uppercase tracking-widest mb-3 text-sm">
          Our Professionals
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold">Meet the Team</h2>
        <p className="text-black dark:text-gray-400 mt-3 max-w-2xl mx-auto text-base">
          Creative minds behind our success — passionate experts building the
          future together.
        </p>
      </div>

      {/* === Top Two linear Cards === */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {topTeam.map((member, idx) => (
          <div
            key={idx}
            className="relative flex items-center justify-between bg-[#C5A265] p-8 rounded-xl border border-gray-300 dark:border-gray-800 overflow-hidden transition-all duration-500"
          >
            {/* Social Icons - Vertical Left */}
            {/* <div className="flex flex-col gap-4">
              <a
                href={member.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-400 dark:border-gray-600 p-2 rounded hover:border-[#C5A265] transition"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href={member.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-400 dark:border-gray-600 p-2 rounded hover:border-[#C5A265] transition"
              >
                <FaXTwitter className="text-xl" />
              </a>
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-400 dark:border-gray-600 p-2 rounded hover:border-[#C5A265] transition"
              >
                <FaLinkedinIn className="text-xl" />
              </a>
            </div> */}

            {/* Profile Info & Image */}
            <div className="flex flex-col items-center mx-auto w-full">
              <div className="w-full text-left mb-6">
                <h3 className="text-2xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-200 text-sm">
                  {member.role}
                </p>
              </div>
              <img
                src={member.image}
                alt={member.name}
                className="w-90 h-105 object-cover rounded-md"
              />
            </div>
          </div>
        ))}
      </div>

      {/* === Lower Team Grid === */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="relative group border border-gray-300 dark:border-[#2B2B2B] rounded-lg overflow-hidden p-6 text-center bg-black dark:bg-[#0B0B0D] hover:border-[#C5A265] transition duration-300"
          >
            {/* Corner Lines */}
            <span className="absolute top-0 left-0 w-6 h-[1px] bg-white"></span>
            <span className="absolute top-0 left-0 h-6 w-[1px] bg-white"></span>
            <span className="absolute bottom-0 right-0 w-6 h-[1px] bg-white"></span>
            <span className="absolute bottom-0 right-0 h-6 w-[1px] bg-white"></span>

            {/* Profile Image */}
            <div className="w-full flex justify-center mb-6">
              <img
                src={member.image}
                alt={member.name}
                className="w-50 h-60 object-cover rounded-full"
              />
            </div>

            {/* Name & Role */}
            <h3 className="text-lg text-gray-300 font-semibold mb-1">{member.name}</h3>
            <p className="text-gray-300 dark:text-gray-400 text-sm mb-6">
              {member.role}
            </p>

            {/* Social Icons */}
            {/* <div className="flex justify-center gap-3 text-white">
              <a
                href={member.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 dark:border-[#2B2B2B] w-9 h-9 flex items-center justify-center hover:border-[#C5A265] transition"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href={member.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 dark:border-[#2B2B2B] w-9 h-9 flex items-center justify-center hover:border-[#C5A265] transition"
              >
                <FaXTwitter className="text-lg" />
              </a>
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 dark:border-[#2B2B2B] w-9 h-9 flex items-center justify-center hover:border-[#C5A265] transition"
              >
                <FaLinkedinIn className="text-lg" />
              </a>
            </div> */}
          </div>
        ))}
      </div>
    </section>
  );
}
