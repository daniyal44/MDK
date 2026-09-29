import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectCategories, projectsList } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

const PortfolioPage = () => {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState('all');
    useScrollReveal();

    const filteredProjects = activeCategory === 'all'
        ? projectsList
        : projectsList.filter(item => item.category === activeCategory);

    return (
        <article className="container">
            {/* Projects/Works Section */}
            <section className="project" id="portfolio" style={{ paddingTop: '140px' }}>
                <div className="project-content section-content" data-reveal="bottom" style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <p className="section-subtitle">{t('works_subtitle')}</p>
                    <h1 className="h2 section-title">{t('works_title')}</h1>
                    <p className="section-text" style={{ maxWidth: '650px', marginInline: 'auto' }}>
                        {t('works_text')}
                    </p>
                </div>

                {/* Filter Category Pills */}
                <div className="portfolio-filter-bar" data-reveal="bottom">
                    {projectCategories.map(cat => (
                        <button
                            key={cat.id}
                            type="button"
                            className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            <span>{cat.label}</span>
                            <span className="filter-count">
                                {cat.id === 'all' 
                                    ? projectsList.length 
                                    : projectsList.filter(p => p.category === cat.id).length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <ul className="project-list modern-grid">
                    {filteredProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </ul>

                {/* External GitHub / More Showcase Link */}
                <div className="load-more-li" data-reveal="bottom" style={{ marginTop: '50px' }}>
                    <a 
                        href="https://github.com/daniyal44" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="load-more-btn"
                        title="Explore all open source repositories and platforms on GitHub"
                    >
                        <span>{t('works_load_more')}</span>
                        <i className="ri-github-fill" style={{ fontSize: '1.2rem' }}></i>
                    </a>
                </div>
            </section>
        </article>
    );
};

export default PortfolioPage;
