import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { skillsList, toolsList } from '../data/skillsData';
import SkillCard from '../components/SkillCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

const SkillsPage = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('skills'); // 'skills' | 'tools'
    useScrollReveal();

    return (
        <article className="container">
            {/* Skills Section */}
            <section className="skills" id="skills" style={{ paddingTop: '140px' }}>
                <div className="skills-content section-content" data-reveal="left">
                    <p className="section-subtitle">{t('skills_subtitle')}</p>
                    <h1 className="h2 section-title">{t('skills_title')}</h1>
                    <p className="section-text">{t('skills_text')}</p>

                    <div className="skills-toggle" data-toggle-box>
                        <button 
                            className={`toggle-btn ${activeTab === 'skills' ? 'active' : ''}`}
                            onClick={() => setActiveTab('skills')}
                        >
                            {t('skills_tab')}
                        </button>
                        <button 
                            className={`toggle-btn ${activeTab === 'tools' ? 'active' : ''}`}
                            onClick={() => setActiveTab('tools')}
                        >
                            {t('tools_tab')}
                        </button>
                    </div>
                </div>

                <div className={`skills-box ${activeTab === 'tools' ? 'active' : ''}`} data-skills-box data-reveal="right">
                    <ul className="skills-list">
                        {skillsList.map(skill => (
                            <SkillCard key={skill.id} item={skill} />
                        ))}
                    </ul>

                    <ul className="tools-list">
                        {toolsList.map(tool => (
                            <SkillCard key={tool.id} item={tool} />
                        ))}
                    </ul>
                </div>
            </section>
        </article>
    );
};

export default SkillsPage;
