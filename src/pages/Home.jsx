import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import MenuFlipbook from '../components/Menu/MenuSection'
import Contact from '../components/Contact'
import FindUs from '../components/Findus'
import MyStorySection from '../components/Story'
import FeaturedMenus from '../components/FeaturedMenus'
import WhyDineWithUs from '../components/WithUs'
import EventBooking from '../components/Time'
import TeamSection from '../components/Team'

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <MyStorySection />
      <WhyDineWithUs />
      <FeaturedMenus />
      <MenuFlipbook />
      <TeamSection />
      <EventBooking />
      <Contact />
      <FindUs />
    </div>
  )
}

export default Home
