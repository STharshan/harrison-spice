"use client";
import { Star } from "lucide-react";
import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Live validation function for each field
  const validateField = (name, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{7,15}$/;
    let error = "";

    if (name === "name" && value.trim().length < 2) {
      error = "Please enter a valid name";
    }
    if (name === "email" && !emailRegex.test(value)) {
      error = "Please enter a valid email";
    }
    if (name === "phone" && !phoneRegex.test(value.replace(/\s/g, ""))) {
      error = "Please enter a valid phone number";
    }
    if (name === "message" && value.trim().length < 10) {
      error = "Message must be at least 10 characters";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before sending
    const isValid = Object.keys(form).every((key) => validateField(key, form[key]));
    if (!isValid) return;

    const whatsappNumber = "447368384136"; // full number, no spaces, country code included
    const whatsappMessage = `
Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Message: ${form.message}
    `.trim();
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  const inputClass =
    "w-full px-4 py-3 bg-transparent border rounded-md outline-none transition-colors duration-300";

  // Handler for input change with live validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value); // validate as user types
  };

  return (
    <section
      className="bg-white dark:bg-black text-black dark:text-gray-200 py-20 px-6 lg:px-20 scroll-m-15"
      id="contact"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 relative">

        {/* LEFT SIDE */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="relative w-80 h-96 overflow-hidden rounded-t-full border border-black p-1">
            <img
              src="/c1.png"
              alt="Restaurant Interior"
              className="w-full h-full object-cover rounded-t-full"
            />
          </div>

          <div className="mt-8 space-y-2">
            <h3 className="flex items-center gap-2 text-black font-medium tracking-wide">
              <Star className="w-5 h-5 text-[#C5A265]" />
              VISIT US
              <Star className="w-5 h-5 text-[#C5A265]" />
            </h3>
            <p className="text-black dark:text-gray-400">
              <a
                href="https://maps.app.goo.gl/er1GfnFtH3k9oxV79"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                23-27 Station Street, Ratby, Leicestershire, LE6 0JQ
              </a>
            </p>

            <p className="text-black dark:text-gray-400 mt-3">
              Monday - Thursday — 5.00 pm – 10.30 pm
            </p>
            <p className="text-black dark:text-gray-400">
              Friday - Saturday — 5.00 pm – 11.00 pm
            </p>
            <p className="text-black dark:text-gray-400">
              Sunday — 5.00 pm – 9.30 pm
            </p>

            <p className="text-black dark:text-gray-400 mt-4">
              Booking:{" "}
              <a href="tel:+441162395644" className="hover:underline">
                0116 2395 644
              </a>
            </p>
            <p className="text-black dark:text-gray-400">
              Email:{" "}
              <a
                href="mailto:reservations@harrisonsspice.co.uk"
                target="_blank"
                className="hover:underline"
              >
                reservations@harrisonsspice.co.uk
              </a>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="md:pl-12">
          <h3 className="flex items-center gap-2 text-black text-sm tracking-wider mb-3">
            <Star className="w-4 h-4 text-[#C5A265]" />
            WRITE TO US
            <Star className="w-4 h-4 text-[#C5A265]" />
          </h3>
          <h2 className="text-4xl font-serif mb-3">Message us</h2>
          <p className="text-black dark:text-gray-400 mb-8">
            Contact us — we aim to reply within 24 hours and are happy to help!
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className={`${inputClass} border-black dark:border-gray-600 placeholder-black dark:placeholder-gray-500`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className={`${inputClass} border-black dark:border-gray-600 placeholder-black dark:placeholder-gray-500`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className={`${inputClass} border-black dark:border-gray-600 placeholder-black dark:placeholder-gray-500`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <textarea
                name="message"
                rows="4"
                placeholder="Special Request"
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} border-black dark:border-gray-600 placeholder-black dark:placeholder-gray-500`}
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="bg-black text-white px-8 py-3 font-semibold tracking-wide cursor-pointer dark:bg-[#C5A265] rounded-lg hover:bg-[#c28927] transition"
            >
              SEND YOUR MESSAGE
            </button>

            <p className="text-xs text-center dark:text-gray-300 mt-3">
              By submitting this form, you agree to us processing your details
              to respond to your enquiry. Your information is handled securely
              and in line with our Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
