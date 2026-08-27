import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
    const { isDark, toggleTheme } = useTheme();
    const { lang, setLang, t } = useLanguage();
    const [isSticky, setIsSticky] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 20) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
        document.body.classList.remove('active');
    }, [location.pathname]);

    const toggleMenu = () => {
        const nextState = !isMenuOpen;
        setIsMenuOpen(nextState);
        if (nextState) {
            document.body.classList.add('active');
        } else {
            document.body.classList.remove('active');
        }
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
        document.body.classList.remove('active');
    };

    return (
        <header className={`header ${isSticky ? 'active' : ''}`} data-header>
            <div className="container">
                <div className="logo">
                    <Link to="/" onClick={handleLinkClick}>Muhammad <span>Daniyal</span></Link>
                </div>

                <div className="navbar-actions">
                    <select 
                        name="language" 
                        id="lang" 
                        value={lang} 
                        onChange={(e) => setLang(e.target.value)} 
                        aria-label="Select Language"
                    >
                        <option value="en">EN</option>
                        <option value="es">ES</option>
                        <option value="ur">UR</option>
                    </select>

                    <button 
                        className={`theme-btn ${!isDark ? 'active' : ''}`} 
                        onClick={toggleTheme} 
                        aria-label="Change Theme" 
                        title="Change Theme" 
                        data-theme-btn
                    >
                        <span className="icon"></span>
                    </button>
                </div>

                <button 
                    className={`nav-toggle-btn ${isMenuOpen ? 'active' : ''}`} 
                    onClick={toggleMenu} 
                    aria-label="Toggle Menu" 
                    title="Toggle Menu" 
                    data-nav-toggle-btn
                >
                    <span className="one"></span>
                    <span className="two"></span>
                    <span className="three"></span>
                </button>

                <nav className={`navbar ${isMenuOpen ? 'active' : ''}`} data-navbar>
                    <ul className="navbar-list">
                        <li>
                            <NavLink 
                                to="/" 
                                end
                                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                                onClick={handleLinkClick}
                            >
                                {t('nav_home')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/about" 
                                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                                onClick={handleLinkClick}
                            >
                                {t('nav_about')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/skills" 
                                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                                onClick={handleLinkClick}
                            >
                                {t('nav_skills')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/portfolio" 
                                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                                onClick={handleLinkClick}
                            >
                                {t('nav_portfolio')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/location" 
                                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                                onClick={handleLinkClick}
                            >
                                {t('nav_location')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/contact" 
                                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                                onClick={handleLinkClick}
                            >
                                {t('nav_contact')}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
