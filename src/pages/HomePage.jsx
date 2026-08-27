import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import StatsCard from '../components/StatsCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

const HomePage = () => {
    const { t } = useLanguage();
    useScrollReveal();

    return (
        <article className="container">
            {/* Hero Section */}
            <section className="hero" id="home">
                <div className="hero-glow-effect"></div>
                <figure className="hero-banner" data-reveal="right">
                    <picture>
                        <source srcSet="https://i.postimg.cc/5yBQ2pZR/MDK.png" media="(min-width: 768px)" />
                        <source srcSet="https://i.postimg.cc/5yBQ2pZR/MDK.png" media="(min-width: 500px)" />
                        <img 
                            src="https://i.postimg.cc/5yBQ2pZR/MDK.png"
                            alt="Muhammad Daniyal - Lead Senior Web Developer and UI UX Designer" 
                            className="w-100" 
                            width="600" 
                            height="600" 
                            fetchPriority="high" 
                            loading="eager" 
                            decoding="async" 
                        />
                    </picture>
                </figure>

                <div className="hero-content" data-reveal="left">
                    <p className="hero-subtitle-tag">{t('hero_subtitle')}</p>
                    <h1 className="h1 hero-title">{t('hero_title')}</h1>
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '20px' }}>
                        <Link to="/contact" className="btn btn-primary">{t('hero_btn')}</Link>
                        <Link to="/portfolio" className="btn btn-outline">{t('about_btn_work')}</Link>
                    </div>
                </div>

                <ul className="hero-social-list" data-reveal="bottom">
                    <li>
                        <a 
                            href="https://www.facebook.com/muhammad.daniyal.522942" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hero-social-link" 
                            aria-label="Connect with Muhammad Daniyal on Facebook"
                        >
                            <i className="ri-facebook-fill"></i>
                            <div className="tooltip">Facebook</div>
                        </a>
                    </li>

                    <li>
                        <a 
                            href="https://www.google.com/search?q=Muhammad+Daniyal"
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hero-social-link"
                            aria-label="Search Muhammad Daniyal on Google"
                        >
                            <i className="ri-google-fill"></i>
                            <div className="tooltip">Google</div>
                        </a>
                    </li>

                    <li>
                        <a 
                            href="https://wa.me/923230112464" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hero-social-link"
                            aria-label="Message Muhammad Daniyal on WhatsApp"
                        >
                            <i className="ri-whatsapp-fill"></i>
                            <div className="tooltip">WhatsApp</div>
                        </a>
                    </li>
                    <li>
                        <a 
                            href="https://www.linkedin.com/in/muhammad-daniyal490" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hero-social-link"
                            aria-label="Connect with Muhammad Daniyal on LinkedIn"
                        >
                            <i className="ri-linkedin-fill"></i>
                            <div className="tooltip">LinkedIn</div>
                        </a>
                    </li>
                    <li>
                        <a 
                            href="https://www.linkedin.com/company/zyphuel/?viewAsMember=true" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hero-social-link"
                            aria-label="Zyphuel Company Page on LinkedIn"
                        >
                            <i className="ri-linkedin-fill"></i>
                            <div className="tooltip">Zyphuel LinkedIn</div>
                        </a>
                    </li>
                </ul>
            </section>

            {/* Stats Section */}
            <section className="stats" id="stats" data-reveal="bottom">
                <ul className="stats-list">
                    <li>
                        <StatsCard 
                            icon="https://i.postimg.cc/x1TWtf69/stats-card-icon-1.png"
                            value="12+"
                            labelKey="stats_exp"
                        />
                    </li>

                    <li>
                        <StatsCard 
                            icon="https://i.postimg.cc/q7ByNYBb/stats-card-icon-2.png"
                            value="230+"
                            labelKey="stats_projects"
                            link="/portfolio"
                            arrow={true}
                        />
                    </li>

                    <li>
                        <StatsCard 
                            icon="https://i.postimg.cc/hj6d3tL6/stats-card-icon-3.png"
                            value="95+"
                            labelKey="stats_clients"
                        />
                    </li>
                </ul>
            </section>

            {/* Explore Studio Showcase Cards Section */}
            <section className="quick-nav-hub" data-reveal="bottom" style={{ paddingBlock: '40px' }}>
                <div style={{ textAlign: 'center', maxWidth: '700px', marginInline: 'auto', marginBottom: '20px' }}>
                    <p className="section-subtitle">{t('explore_subtitle')}</p>
                    <h2 className="h2 section-title">{t('explore_title')}</h2>
                </div>

                <div className="explore-card-grid">
                    {/* Card 1: About Me */}
                    <div className="explore-card">
                        <div className="explore-card-body">
                            <div className="explore-card-header">
                                <div className="explore-card-icon"><i className="ri-user-star-fill"></i></div>
                                <div className="explore-card-title-box">
                                    <span className="card-tag">Profile & Bio</span>
                                    <h3 className="card-title">About Me</h3>
                                </div>
                            </div>
                            <p className="explore-card-desc">Senior Full Stack Developer & UI/UX Product Designer creating scalable web applications and intuitive interfaces.</p>
                            <div className="explore-card-list">
                                <div className="explore-card-list-item"><i className="ri-checkbox-circle-fill"></i> 12+ Years Industry Experience</div>
                                <div className="explore-card-list-item"><i className="ri-checkbox-circle-fill"></i> 230+ Delivered Web Projects</div>
                                <div className="explore-card-list-item"><i className="ri-checkbox-circle-fill"></i> Custom Web App & SaaS Specialist</div>
                            </div>
                        </div>
                        <Link to="/about" className="explore-card-action">
                            <span>Explore Bio & Experience</span>
                            <i className="ri-arrow-right-line"></i>
                        </Link>
                    </div>

                    {/* Card 2: Programming Skills */}
                    <div className="explore-card">
                        <div className="explore-card-body">
                            <div className="explore-card-header">
                                <div className="explore-card-icon"><i className="ri-code-s-slash-line"></i></div>
                                <div className="explore-card-title-box">
                                    <span className="card-tag">Tech Stack</span>
                                    <h3 className="card-title">Programming Skills</h3>
                                </div>
                            </div>
                            <p className="explore-card-desc">Mastery across cutting-edge frontend frameworks, backend platforms, build automation, and design tools.</p>
                            <div className="explore-card-list">
                                <div className="explore-card-list-item"><i className="ri-checkbox-circle-fill"></i> React, Angular, Vue & TypeScript</div>
                                <div className="explore-card-list-item"><i className="ri-checkbox-circle-fill"></i> HTML5, CSS3, SASS & Responsive UI</div>
                                <div className="explore-card-list-item"><i className="ri-checkbox-circle-fill"></i> Firebase, REST APIs, Git & Webpack</div>
                            </div>
                        </div>
                        <Link to="/skills" className="explore-card-action">
                            <span>View Complete Tech Stack</span>
                            <i className="ri-arrow-right-line"></i>
                        </Link>
                    </div>

                    {/* Card 3: Selected Portfolio */}
                    <div className="explore-card">
                        <div className="explore-card-body">
                            <div className="explore-card-header">
                                <div className="explore-card-icon"><i className="ri-layout-4-fill"></i></div>
                                <div className="explore-card-title-box">
                                    <span className="card-tag">Work Gallery</span>
                                    <h3 className="card-title">Selected Portfolio</h3>
                                </div>
                            </div>
                            <p className="explore-card-desc">Browse real-world commercial applications, SaaS products, brand shop interfaces, and mobile applications.</p>
                            <div className="explore-card-list">
                                <div className="explore-card-list-item"><i className="ri-checkbox-circle-fill"></i> Zyphuel On-Demand Fuel Platform</div>
                                <div className="explore-card-list-item"><i className="ri-checkbox-circle-fill"></i> Resume Builder SaaS Platform</div>
                                <div className="explore-card-list-item"><i className="ri-checkbox-circle-fill"></i> MDK Brew House & Design Systems</div>
                            </div>
                        </div>
                        <Link to="/portfolio" className="explore-card-action">
                            <span>Browse Project Showcase</span>
                            <i className="ri-arrow-right-line"></i>
                        </Link>
                    </div>

                    {/* Card 4: Studio Location */}
                    <div className="explore-card">
                        <div className="explore-card-body">
                            <div className="explore-card-header">
                                <div className="explore-card-icon"><i className="ri-map-pin-2-fill"></i></div>
                                <div className="explore-card-title-box">
                                    <span className="card-tag">Visit & Navigation</span>
                                    <h3 className="card-title">Studio Location</h3>
                                </div>
                            </div>
                            <p className="explore-card-desc">Interactive Leaflet map, turn-by-turn route planner (GPS, Drive, Walk), and nearby area amenities guide.</p>
                            <div className="explore-card-list">
                                <div className="explore-card-list-item"><i className="ri-checkbox-circle-fill"></i> Interactive OpenStreetMap Canvas</div>
                                <div className="explore-card-list-item"><i className="ri-checkbox-circle-fill"></i> 1-Click GPS Route & Time Estimator</div>
                                <div className="explore-card-list-item"><i className="ri-checkbox-circle-fill"></i> Dining, Metro Transit & ATM Spotter</div>
                            </div>
                        </div>
                        <Link to="/location" className="explore-card-action">
                            <span>Open Map & Directions</span>
                            <i className="ri-arrow-right-line"></i>
                        </Link>
                    </div>

                    {/* Card 5: Contact & Inquiry */}
                    <div className="explore-card">
                        <div className="explore-card-body">
                            <div className="explore-card-header">
                                <div className="explore-card-icon"><i className="ri-send-plane-fill"></i></div>
                                <div className="explore-card-title-box">
                                    <span className="card-tag">Get In Touch</span>
                                    <h3 className="card-title">Contact & Inquiry</h3>
                                </div>
                            </div>
                            <p className="explore-card-desc">Have a new project or custom web requirement? Drop a message for instant consultation & project estimation.</p>
                            <div className="explore-card-list">
                                <div className="explore-card-list-item"><i className="ri-checkbox-circle-fill"></i> Real-Time Address Autocomplete</div>
                                <div className="explore-card-list-item"><i className="ri-checkbox-circle-fill"></i> WhatsApp & Email Support</div>
                                <div className="explore-card-list-item"><i className="ri-checkbox-circle-fill"></i> Direct Project Consultation</div>
                            </div>
                        </div>
                        <Link to="/contact" className="explore-card-action">
                            <span>Start Project Inquiry</span>
                            <i className="ri-arrow-right-line"></i>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Frequently Asked Questions (GEO / AEO Section) */}
            <section className="faq-section" id="faq" data-reveal="bottom">
                <div style={{ textAlign: 'center', maxWidth: '700px', marginInline: 'auto' }}>
                    <p className="section-subtitle">{t('faq_subtitle')}</p>
                    <h2 className="h2 section-title">{t('faq_title')}</h2>
                </div>

                <div className="faq-list">
                    <div className="faq-item">
                        <h3 className="faq-question"><i className="ri-question-fill"></i> Who is Muhammad Daniyal (ItxMDK / Zyphuel / zphuel / itxmtk)?</h3>
                        <p className="faq-answer">Muhammad Daniyal (also known online as Zyphuel, zphuel, ItxMDK, itxmtk, MuhammadDaniel, itsmdk, itx dk, itxM, itcM) is a Senior Full Stack Web Developer & UI/UX Product Designer with 12+ years experience. He is the founder of Scale verse and creator of high-scale commercial platforms including Poke nexus, Dashacart, Hittop, and Ladoni.</p>
                    </div>

                    <div className="faq-item">
                        <h3 className="faq-question"><i className="ri-question-fill"></i> What platforms were created by Zyphuel & ItxMDK (Muhammad Daniyal)?</h3>
                        <p className="faq-answer">Zyphuel & ItxMDK (Muhammad Daniyal) engineered notable web platforms including <strong>Zyphuel</strong> (on-demand fuel app), <strong>Poke nexus</strong> (interactive gaming web app), <strong>Dashacart</strong> (SaaS e-commerce platform), <strong>Hittop</strong> (digital service portal), <strong>Scale verse</strong> (agency & cloud solutions), and <strong>Ladoni</strong> (custom web platform).</p>
                    </div>

                    <div className="faq-item">
                        <h3 className="faq-question"><i className="ri-question-fill"></i> How can I hire Muhammad Daniyal (ItxMDK) for web development or UI/UX?</h3>
                        <p className="faq-answer">You can contact Muhammad Daniyal (ItxMDK / Zyphuel) directly via WhatsApp at +923230112464, email at m.daniyalkhan490@gmail.com, or through the contact form at <Link to="/contact" title="Contact Muhammad Daniyal (ItxMDK / Zyphuel)">Contact Page</Link>. Studio Location: Green Town, Lahore, Pakistan.</p>
                    </div>
                </div>
            </section>
        </article>
    );
};

export default HomePage;
