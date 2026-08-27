import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="footer">
            <div className="container">
                <div className="logo">
                    <Link to="/">Muhammad <span>Daniyal</span></Link>
                </div>

                <p className="copyright">
                    &copy; 2026 <Link to="/">Muhammad Daniyal</Link>. <span>{t('footer_text')}</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
