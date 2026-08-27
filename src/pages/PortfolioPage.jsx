import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectsList } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

const PortfolioPage = () => {
    const { t } = useLanguage();
    useScrollReveal();

    return (
        <article className="container">
            {/* Projects/Works Section */}
            <section className="project" id="portfolio" style={{ paddingTop: '140px' }}>
                <div className="project-content section-content" data-reveal="bottom" style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <p className="section-subtitle">{t('works_subtitle')}</p>
                    <h1 className="h2 section-title">{t('works_title')}</h1>
                    <p className="section-text">{t('works_text')}</p>
                </div>

                <ul className="project-list">
                    {projectsList.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </ul>

                <div className="load-more-li" data-reveal="bottom" style={{ marginTop: '40px' }}>
                    <a 
                        href="https://workmdk.netlify.app/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="load-more-btn"
                    >
                        {t('works_load_more')} <i className="ri-arrow-right-line"></i>
                    </a>
                </div>
            </section>
        </article>
    );
};

export default PortfolioPage;
