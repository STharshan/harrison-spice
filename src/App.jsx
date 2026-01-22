import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TermsConditions from "./components/Term";
import Home from "./pages/Home";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop";
import GDPRConsent from "./components/GDPRBanner";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS globally

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // default animation duration
      once: true,     // animation occurs only once
      mirror: false,  // whether elements animate out while scrolling past
    });

    // Optional: refresh AOS after each page load
    const handleLoad = () => AOS.refresh();
    window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms&condition" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
      <GDPRConsent />
    </Router>
  );
}

export default App;
