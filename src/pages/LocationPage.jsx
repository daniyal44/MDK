import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import RoutePlanner from '../components/RoutePlanner';
import MapComponent from '../components/MapComponent';
import { useScrollReveal } from '../hooks/useScrollReveal';

const LocationPage = () => {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState('all');
    const [routeData, setRouteData] = useState(null);
    useScrollReveal();

    return (
        <article className="container">
            {/* Location, Directions & Nearby Amenities Section */}
            <section className="location-section" id="location" style={{ paddingTop: '140px' }}>
                <div className="location-header section-content" data-reveal="bottom">
                    <p className="section-subtitle">{t('location_subtitle')}</p>
                    <h1 className="h2 section-title">{t('location_title')}</h1>
                    <p className="section-text">{t('location_text')}</p>
                </div>

                <div className="location-grid">
                    {/* Directions & Route Planner Box */}
                    <RoutePlanner onRouteCalculated={(data) => setRouteData(data)} />

                    {/* Interactive Map & Amenities Box */}
                    <MapComponent 
                        activeCategory={activeCategory} 
                        setActiveCategory={setActiveCategory} 
                        routeData={routeData}
                    />
                </div>
            </section>
        </article>
    );
};

export default LocationPage;
