import React, { useEffect } from 'react';
import { FaAward, FaRegHeart, FaStar, FaUsers } from 'react-icons/fa';
import { LuChefHat } from 'react-icons/lu';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // animations run once
  }, []);

  const cards = [
    {
      id: 1,
      icon: <FaAward className="h-10 w-10 text-[#00684A]" />,
      title: 'Premium Quality',
      description:
        'Fresh ingredients and authentic spices sourced directly from the Indian sub-continent',
    },
    {
      id: 2,
      icon: <FaUsers className="h-10 w-10 text-[#00684A]" />,
      title: 'Expert Chefs',
      description:
        'Our experienced chefs blend traditional techniques with modern culinary innovation',
    },
    {
      id: 3,
      icon: <FaRegHeart className="h-10 w-10 text-[#00684A]" />,
      title: 'Warm Hospitality',
      description:
        'Friendly service and welcoming atmosphere that makes every visit memorable',
    },
  ];

  return (
    <section id="about" className="py-16 bg-[#981921] scroll-m-10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12" data-aos="fade-up">
            <div className="flex justify-center mb-6">
              <LuChefHat className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              About Us
            </h2>
          </div>

          {/* Text + Image */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Text */}
            <div className="space-y-6" data-aos="fade-right">
              <div className="text-lg text-muted-foreground space-y-6 text-pretty">
                <p>
                  We provide an emphasis on refined yet creative cuisine from
                  the Indian sub-continent. Our menu incorporates both
                  traditional classics and signature dishes that apply Eastern
                  flavours with a Western twist.
                </p>
                <p>
                  Yet we believe that providing a quality dining experience is
                  so much more than just inspired cuisine. Our courteous,
                  friendly and informed staff are trained to exceed expectations
                  and redefine the concept of impeccable service.
                </p>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="h-5 w-5 fill-[#00684A]" />
                ))}
                <span className="ml-2 text-muted-foreground">
                  Exceptional Service
                </span>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative" data-aos="fade-left">
              <img
                src="/side.png"
                alt="Restaurant Interior"
                width={600}
                height={400}
                className="rounded-lg shadow-lg h-110"
              />
            </div>
          </div>

          {/* Card Section */}
          <div className="grid md:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className="bg-white border-gray-300 text-center p-6 rounded-lg shadow-lg active:shadow-xl hover:shadow-xl transition-all
                            duration-300 hover:scale-105"
                data-aos="zoom-in"
                data-aos-delay={index * 200} // stagger effect
              >
                <div className="flex justify-center mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold text-[#00684A] mb-2">
                  {card.title}
                </h3>
                <p className="text-muted-foreground">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
