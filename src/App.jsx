import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import PortfolioPage from './pages/PortfolioPage';
import LocationPage from './pages/LocationPage';
import ContactPage from './pages/ContactPage';

function ScrollToTopOnRouteChange() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    return (
        <>
            <ScrollToTopOnRouteChange />
            <ScrollProgress />
            <Header />
            
            <main id="top">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/index.html" element={<HomePage />} />
                    
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/about.html" element={<AboutPage />} />
                    
                    <Route path="/skills" element={<SkillsPage />} />
                    <Route path="/skills.html" element={<SkillsPage />} />
                    
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/portfolio.html" element={<PortfolioPage />} />
                    
                    <Route path="/location" element={<LocationPage />} />
                    <Route path="/location.html" element={<LocationPage />} />
                    
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/contact.html" element={<ContactPage />} />

                    {/* Fallback to Home */}
                    <Route path="*" element={<HomePage />} />
                </Routes>
            </main>

            <Footer />
            <ScrollToTop />
        </>
    );
}

export default App;
