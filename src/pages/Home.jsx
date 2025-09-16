import React from 'react'
import About from "../components/About"
import Contact from "../components/Contact"
import Hero from "../components/Hero"
import MenuFlipbook from "../components/Menu/MenuSection"

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
