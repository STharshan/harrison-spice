import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import MenuFlipbook from '../components/Menu/MenuSection'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <MenuFlipbook />
      <Contact />
    </div>
  )
}

export default Home
