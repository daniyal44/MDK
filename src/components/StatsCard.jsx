import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const StatsCard = ({ icon, value, labelKey, link, arrow }) => {
    const { t } = useLanguage();

    const content = (
        <>
            <div className="card-icon">
                <img src={icon} alt={`${value} ${t(labelKey)} badge icon`} width="60" height="60" loading="lazy" decoding="async" />
            </div>
            <h2 className="h2 card-title">
                {value}
                <strong>{t(labelKey)}</strong>
            </h2>
            {arrow && (
                <span className="arrow-badge">
                    <i className="ri-arrow-right-up-line"></i>
                </span>
            )}
        </>
    );

    if (link) {
        return (
            <Link to={link} className="stats-card">
                {content}
            </Link>
        );
    }

    return (
        <div className="stats-card">
            {content}
        </div>
    );
};

export default StatsCard;
