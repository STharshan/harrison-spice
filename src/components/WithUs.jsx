import React from "react";

const WhyDineWithUs = () => {


  const stats = [
    {
      image: "/logo1.png",
      title: "Ratby Town Cricket Club",
      number: "60+",
      label: "MONTHLY VISITORS",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry has been.",
    },
    {
      image: "/logo2.png",
      title: "Kirby Muxloe Football Club",
      number: "22+",
      label: "POSITIVE REVIEWS",
      text: "Simply dummy text of the printing and typesetting industry lorem Ipsum has been.",
    },
  ];

  return (
    <section className="bg-[#C5A265] dark:bg-black text-black dark:text-gray-200 py-16 px-6 lg:px-20 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-12" data-aos="fade-down">
          <h2 className="text-3xl md:text-4xl font-semibold text-white dark:text-[#C5A265]">
            Proud Sponsors Of
          </h2>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-8 rounded-xl shadow-lg dark:shadow-gray-600 bg-black dark:bg-[#C5A265] hover:scale-[1.04] active:scale-[1.02] transition-all duration-300 flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay={i * 200 + 300}
            >
              {/* Image wrapper */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden flex justify-center items-center bg-white">
                <img
                  src={stat.image}
                  alt={stat.title}
                  className="w-full h-full object-contain p-2"
                />
              </div>

              {/* Title */}
              <h3 className="mt-5 text-lg md:text-xl font-semibold text-gray-200 dark:text-black text-center">
                {stat.title}
              </h3>

              {/* (Optional stats – uncomment if needed) */}
              {/* <h3 className="text-4xl md:text-5xl font-bold mt-3 text-[#C5A265] dark:text-black">
                {stat.number}
              </h3>
              <p className="mt-1 uppercase text-sm tracking-wide text-[#e9a736] dark:text-black">
                {stat.label}
              </p>
              <p className="mt-3 text-gray-300 dark:text-black text-sm text-center leading-relaxed">
                {stat.text}
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDineWithUs;
