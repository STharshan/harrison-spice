import React from 'react';
import { Plane, Sparkles, ChefHat, TrendingUp, Award, Building } from 'lucide-react';

const TimelineEvent = ({ year, title, description, icon: Icon, isLeft }) => {
    return (
        <div className={`flex items-center w-full mb-8 md:mb-16 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
            {/* Card */}
            <div className={`w-full md:w-5/12 ${isLeft ? 'md:text-right md:pr-8' : 'md:pl-8'}`}>
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 transition-all hover:shadow-xl">
                    <div className={`text-gray-500 text-sm md:text-base text-right font-medium mb-2 ${isLeft ? 'md:text-left' : ''}`}>
                        {year}
                    </div>
                    <h3 className={`text-xl md:text-2xl font-bold text-gray-900 text-right mb-3 ${isLeft ? 'md:text-left' : ''}`}>
                        {title}
                    </h3>
                    <p className={`text-gray-600 text-sm md:text-base text-right leading-relaxed ${isLeft ? 'md:text-left' : ''}`}>
                        {description}
                    </p>
                </div>
            </div>

            {/* Icon in center */}
            <div className="hidden md:flex w-2/12 justify-center">
                <div className="relative z-10 flex items-center justify-center w-14 h-14 bg-[#C5A265] rounded-full shadow-lg">
                    <Icon className="w-7 h-7 text-white" />
                </div>
            </div>

            {/* Empty space for alternating layout */}
            <div className="hidden md:block w-5/12"></div>
        </div>
    );
};

const MobileTimelineEvent = ({ year, title, description, icon: Icon }) => {
    return (
        <div className="flex mb-8 md:hidden">
            {/* Timeline line and icon */}
            <div className="flex flex-col items-center mr-4">
                <div className="flex items-center justify-center w-12 h-12 bg-[#C5A265] rounded-full shadow-lg flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
                <div className="bg-white rounded-2xl shadow-lg p-5 transition-all hover:shadow-xl">
                    <div className="text-gray-500 text-sm font-medium mb-2">{year}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default function JourneyTimeline() {
    const [showTimeline, setShowTimeline] = React.useState(false);

    const toggleTimeline = () => {
        if (!showTimeline) {
            setShowTimeline(true);
            setTimeout(() => {
                document.getElementById('timeline-section')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }, 50);
        } else {
            setShowTimeline(false);
        }
    };

    const events = [
        {
            year: '1990',
            title: 'A New Beginning',
            description: 'Arrived in the UK with dreams and determination',
            icon: Plane,
            isLeft: false
        },
        {
            year: '1992',
            title: 'Starting from the Ground Up',
            description: 'Kitchen cleaner - learning the restaurant business from every angle',
            icon: Sparkles,
            isLeft: true
        },
        {
            year: '1994',
            title: 'Moving Up',
            description: 'Promoted to second chef - mastering culinary skills',
            icon: ChefHat,
            isLeft: false
        },
        {
            year: '1998',
            title: 'Leading the Kitchen',
            description: 'Became main chef - creating signature dishes and leading teams',
            icon: TrendingUp,
            isLeft: true
        },
        {
            year: '2002',
            title: 'Dream Realised',
            description: 'Opened first restaurant - form employee to entrepreneur',
            icon: Award,
            isLeft: false
        },
        {
            year: '2010',
            title: 'Growing Success',
            description: 'Second restaurant opened - expanding the vision',
            icon: Building,
            isLeft: true
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-8 md:py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 md:mb-20">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6">
                        My Journey
                    </h1>
                    <p className="text-base md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                        From humble beginnings to restaurant owner – 20 years of passion, hard work, and culinary excellence
                    </p>

                    {/* Down/Up Arrow Button */}
                    <button
                        onClick={toggleTimeline}
                        className={`mt-8 md:mt-12 inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#C5A265] hover:bg-[#B8942E] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${!showTimeline ? 'animate-bounce' : ''}`}
                        aria-label={showTimeline ? "Hide timeline" : "View timeline"}
                    >
                        <svg
                            className="w-6 h-6 md:w-8 md:h-8 text-white transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            style={{ transform: showTimeline ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                </div>

                {/* Timeline */}
                <div
                    id="timeline-section"
                    className={`relative transition-all scroll-m-20 duration-700 ease-in-out ${showTimeline
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 -translate-y-10 pointer-events-none overflow-hidden'
                        }`}
                    style={{ maxHeight: showTimeline ? '10000px' : '0' }}
                >
                    {/* Vertical line for desktop */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200"></div>

                    {/* Desktop Timeline */}
                    <div className="hidden md:block">
                        {events.map((event, index) => (
                            <TimelineEvent
                                key={index}
                                year={event.year}
                                title={event.title}
                                description={event.description}
                                icon={event.icon}
                                isLeft={event.isLeft}
                            />
                        ))}
                    </div>

                    {/* Mobile Timeline */}
                    <div className="md:hidden">
                        {events.map((event, index) => (
                            <MobileTimelineEvent
                                key={index}
                                year={event.year}
                                title={event.title}
                                description={event.description}
                                icon={event.icon}
                            />
                        ))}
                    </div>
                </div>

                {/* Closing Message */}
                {showTimeline && (
                    <div className="mt-16 transition-all duration-700 ease-in-out">
                        <div className="bg-[#C5A265] rounded-2xl shadow-2xl p-6 md:p-8 text-center">
                            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-relaxed">
                                From dreams to reality – every step was worth it! ✨
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}