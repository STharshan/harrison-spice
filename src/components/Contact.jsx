import { Star } from "lucide-react";
import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    guests: "1 Person",
    date: "",
    time: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    date: "",
    time: "",
    message: "",
  });

  const validateField = (name, value) => {
    let error = "";

    if (name === "date" && !value) error = "Please select a date";
    if (name === "time" && !value) error = "Please select a time";
    if (name === "message" && value.trim().length < 5)
      error = "Please enter a message";

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = ["date", "time", "message"].every((key) =>
      validateField(key, form[key])
    );
    if (!isValid) return;

    const whatsappNumber = "447368384136";

    const whatsappMessage = `
Guests: ${form.guests}
Date: ${form.date}
Time: ${form.time}
Special Request: ${form.message}
    `.trim();

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(url, "_blank");

    // ✅ Clear the form after submission
    setForm({
      guests: "1 Person",
      date: "",
      time: "",
      message: "",
    });

    // Clear errors too
    setErrors({
      date: "",
      time: "",
      message: "",
    });
  };

  const inputClass =
    "w-full px-4 py-3 rounded-md border outline-none transition-colors duration-300 " +
    "bg-white dark:bg-gray-900 text-black dark:text-gray-200 border-gray-300 dark:border-gray-600 " +
    "placeholder-gray-500 dark:placeholder-gray-400 focus:ring-1 focus:ring-[#C5A265]";

  const buttonClass =
    "w-full md:w-auto px-8 py-3 font-semibold rounded-lg transition " +
    "bg-black text-white dark:bg-[#C5A265] dark:text-black hover:bg-gray-800 dark:hover:bg-[#c28927]";

  return (
    <section
      className="bg-white dark:bg-black text-black dark:text-gray-200 py-20 px-6 lg:px-20 scroll-m-15"
      id="contact"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* LEFT SIDE */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="relative w-80 h-96 overflow-hidden rounded-t-full border border-gray-400 dark:border-gray-600 p-1">
            <img
              src="/c1.png"
              loading="lazy"
              alt="Restaurant Interior"
              className="w-full h-full object-cover rounded-t-full"
            />
          </div>

          <div className="mt-8 space-y-2">
            <h3 className="flex items-center gap-2 font-medium tracking-wide">
              <Star className="w-5 h-5 text-[#C5A265]" />
              VISIT US
              <Star className="w-5 h-5 text-[#C5A265]" />
            </h3>

            <p className="dark:text-gray-400">
              <a
                href="https://maps.app.goo.gl/er1GfnFtH3k9oxV79"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                23-27 Station Street, Ratby, Leicestershire, LE6 0JQ
              </a>
            </p>

            <p className="dark:text-gray-400 mt-3">
              Monday - Thursday — 5.00 pm – 10.30 pm
            </p>
            <p className="dark:text-gray-400">
              Friday - Saturday — 5.00 pm – 11.00 pm
            </p>
            <p className="dark:text-gray-400">
              Sunday — 5.00 pm – 9.00 pm
            </p>

            <p className="dark:text-gray-400 mt-4">
              Booking:{" "}
              <a href="tel:+441162395644" className="hover:underline">
                0116 2395 644
              </a>
            </p>

            <p className="dark:text-gray-400">
              Email:{" "}
              <a
                href="mailto:reservations@harrisonsspice.co.uk"
                className="hover:underline"
              >
                reservations@harrisonsspice.co.uk
              </a>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="md:pl-12">
          <h3 className="flex items-center gap-2 text-sm tracking-wider mb-3">
            <Star className="w-4 h-4 text-[#C5A265]" />
            WRITE TO US
            <Star className="w-4 h-4 text-[#C5A265]" />
          </h3>

          <h2 className="text-4xl font-serif mb-3">Message us</h2>

          <p className="dark:text-gray-400 mb-8">
            Contact us — we aim to reply within 24 hours and are happy to help!
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Guests */}
            <select
              name="guests"
              value={form.guests}
              onChange={handleChange}
              className={inputClass}
            >
              <option>Select Person</option>
              <option>1 People</option>
              <option>2 People</option>
              <option>3 People</option>
              <option>4 People</option>
              <option>5 People</option>
              <option>More</option>
            </select>

            {/* Date */}
            <div>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            {/* Time */}
            <div>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.time && (
                <p className="text-red-500 text-sm mt-1">{errors.time}</p>
              )}
            </div>

            {/* Special Request */}
            <div>
              <textarea
                name="message"
                rows="4"
                placeholder="Special Request"
                value={form.message}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <button type="submit" className={buttonClass}>
              SEND YOUR MESSAGE
            </button>

            <p className="text-xs text-center dark:text-gray-300 mt-3">
              By submitting this form, you agree to us processing your details to respond to your enquiry. Your information is handled securely and in line with our Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
