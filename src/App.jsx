import About from "./components/About"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import MenuFlipbook from "./components/Menu/MenuSection"
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
     <Navbar />
     <Hero />
     <About />
     <MenuFlipbook />
     <Contact />
     <Footer />
    </>
  )
}

export default App
