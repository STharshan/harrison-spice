import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import MenuFlipbook from '../components/Menu/MenuSection'
import Contact from '../components/Contact'
import FindUs from '../components/Findus'
import FeaturedMenus from '../components/FeaturedMenus'
import WhyDineWithUs from '../components/WithUs'
import EventBooking from '../components/Time'
import TeamSection from '../components/Team'
import WhatWeOffer from '../components/UnderAbout'
import Review from '../components/Review'
import Timeline from '../components/Timeline'

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <WhatWeOffer />
      <Timeline />
      <WhyDineWithUs />
      <FeaturedMenus />
      <MenuFlipbook />
      <TeamSection />
      <EventBooking />
      <Review />
      <Contact />
      <FindUs />
    </div>
  )
}

export default Home
