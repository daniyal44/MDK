import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollReveal = () => {
    const location = useLocation();

    useEffect(() => {
        const isSearchBot = /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i.test(navigator.userAgent);
        const revealElements = document.querySelectorAll('[data-reveal]');

        if (isSearchBot) {
            revealElements.forEach(elem => elem.classList.add('revealed'));
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(elem => {
            // Check if already in viewport
            const rect = elem.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                elem.classList.add('revealed');
            } else {
                observer.observe(elem);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, [location.pathname]);
};
