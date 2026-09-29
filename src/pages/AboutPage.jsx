import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import StatsCard from '../components/StatsCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

const AboutPage = () => {
    const { t } = useLanguage();
    useScrollReveal();

    return (
        <article className="container">
            {/* About Section */}
            <section className="about" id="about" style={{ paddingTop: '140px' }}>
                <figure className="about-banner" data-reveal="left">
                    <div className="about-image-wrapper">
                        <img 
                            src="images/daniyal.jpeg"
                            alt="Muhammad Daniyal - Senior Software Engineer" 
                            className="w-100" 
                            width="600" 
                            height="600" 
                            fetchPriority="high" 
                            loading="eager" 
                            decoding="async" 
                        />
                    </div>
                </figure>

                <div className="about-content section-content" data-reveal="right">
                    <p className="section-subtitle">{t('about_subtitle')}</p>
                    <h1 className="h2 section-title">{t('about_title')}</h1>
                    <p className="section-text">{t('about_text')}</p>

                    <div className="about-btn-group">
                        <div className="btn-group-row">
                            <Link to="/portfolio" className="btn btn-secondary">{t('about_btn_work')}</Link>
                            <a 
                                href="/MDK.pdf" 
                                download="Muhammad_Daniyal_CV.pdf" 
                                className="btn btn-primary"
                            >
                                <i className="ri-file-download-line" style={{ marginRight: '6px' }}></i>
                                {t('about_btn_cv')}
                            </a>
                        </div>
                        <div className="btn-group-row">
                            <a 
                                href="/Zyphuel.apk" 
                                download="Zyphuel.apk" 
                                className="btn btn-outline"
                            >
                                <i className="ri-android-line" style={{ marginRight: '6px' }}></i>
                                {t('about_btn_app')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Highlight Section */}
            <section className="stats" id="stats" data-reveal="bottom" style={{ marginTop: '50px' }}>
                <ul className="stats-list">
                    <li>
                        <StatsCard 
                            icon="https://i.postimg.cc/x1TWtf69/stats-card-icon-1.png"
                            value="5+"
                            labelKey="stats_exp"
                        />
                    </li>

                    <li>
                        <StatsCard 
                            icon="https://i.postimg.cc/q7ByNYBb/stats-card-icon-2.png"
                            value="130+"
                            labelKey="stats_projects"
                            link="https://workmdk.netlify.app/"
                            arrow={true}
                        />
                    </li>

                    <li>
                        <StatsCard 
                            icon="https://i.postimg.cc/hj6d3tL6/stats-card-icon-3.png"
                            value="20+"
                            labelKey="stats_clients"
                        />
                    </li>
                </ul>
            </section>
        </article>
    );
};

export default AboutPage;
