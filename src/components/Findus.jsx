import React from "react";

const FindUs = () => {
  return (
    <section className="py-10 px-4 bg-background">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-emerald-800">Find Us</h2>

        <div className="rounded-lg overflow-hidden shadow-lg w-full h-[400px]">
          <iframe
            title="Google Map - Unit 7, Elliot Business Park, Chambers Ln, Sheffield S4 8DA, United Kingdom"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2420.740365125066!2d-1.2465065241078574!3d52.64660362684948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48775efbc36c8d07%3A0xe0828581570217f0!2s23-27%20Station%20Rd%2C%20Ratby%2C%20Leicester%20LE6%200JQ%2C%20UK!5e0!3m2!1sen!2slk!4v1758021041283!5m2!1sen!2slk"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0 w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default FindUs;
