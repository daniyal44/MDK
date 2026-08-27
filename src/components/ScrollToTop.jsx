import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY >= 20) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <a 
            href="#top" 
            onClick={scrollToTop} 
            className={`go-top ${isVisible ? 'active' : ''}`} 
            title="Go to Top" 
            aria-label="Scroll back to top"
        >
            <i className="ri-arrow-up-line"></i>
        </a>
    );
};

export default ScrollToTop;
