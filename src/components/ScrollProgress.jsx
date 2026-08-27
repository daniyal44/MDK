import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
    const [scrollWidth, setScrollWidth] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const windowScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (windowScroll / height) * 100 : 0;
            setScrollWidth(scrolled);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div 
            className="scroll-progress-bar" 
            id="progressBar" 
            style={{ width: `${scrollWidth}%` }}
        />
    );
};

export default ScrollProgress;
