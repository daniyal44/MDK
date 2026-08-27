import React, { useState } from 'react';
import { STUDIO_COORDS } from '../data/amenitiesData';
import { useLanguage } from '../context/LanguageContext';

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const RoutePlanner = ({ onRouteCalculated }) => {
    const { t } = useLanguage();
    const [origin, setOrigin] = useState('');
    const [mode, setMode] = useState('driving');
    const [isGpsLoading, setIsGpsLoading] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);
    const [routeResult, setRouteResult] = useState(null);

    const handleGpsClick = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        setIsGpsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const gpsLabel = `${lat.toFixed(4)}, ${lng.toFixed(4)} (Current Location)`;
                setOrigin(gpsLabel);
                setIsGpsLoading(false);
                computeRoute(lat, lng, mode);
            },
            () => {
                alert('Unable to fetch your location. Please type your starting area manually.');
                setIsGpsLoading(false);
            }
        );
    };

    const computeRoute = (userLat, userLng, travelMode) => {
        const distKm = calculateDistance(userLat, userLng, STUDIO_COORDS[0], STUDIO_COORDS[1]);
        const formattedDist = distKm < 1 ? `${Math.round(distKm * 1000)} meters` : `${distKm.toFixed(1)} km`;

        let speed = 40; // driving speed km/h
        if (travelMode === 'walking') speed = 4.5;
        else if (travelMode === 'transit') speed = 25;

        const estMinutes = Math.max(2, Math.round((distKm / speed) * 60));

        const result = {
            distance: formattedDist,
            time: `${estMinutes} min`,
            distKm,
            userCoords: [userLat, userLng]
        };

        setRouteResult(result);
        if (onRouteCalculated) {
            onRouteCalculated(result);
        }
    };

    const handleCalculate = () => {
        if (!origin.trim()) {
            alert('Please enter a starting location or city name.');
            return;
        }

        setIsCalculating(true);
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(origin)}&limit=1`)
            .then(res => res.json())
            .then(data => {
                setIsCalculating(false);
                if (data && data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);
                    computeRoute(lat, lon, mode);
                } else {
                    // Default Gulberg / Lahore center fallback
                    computeRoute(31.5204, 74.3587, mode);
                }
            })
            .catch(() => {
                setIsCalculating(false);
                computeRoute(31.5204, 74.3587, mode);
            });
    };

    const handleModeChange = (newMode) => {
        setMode(newMode);
        if (routeResult && routeResult.userCoords) {
            computeRoute(routeResult.userCoords[0], routeResult.userCoords[1], newMode);
        }
    };

    return (
        <div className="directions-card" data-reveal="left">
            <div className="card-header-badge">
                <i className="ri-compass-3-line"></i>
                <span>{t('directions_badge')}</span>
            </div>
            <h3 className="h3 card-title">{t('directions_heading')}</h3>
            <p className="card-desc">{t('directions_subheading')}</p>

            <form className="directions-form" onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>
                <div className="input-wrapper search-box">
                    <input 
                        type="text" 
                        value={origin} 
                        onChange={(e) => setOrigin(e.target.value)}
                        className="input-field" 
                        placeholder="Enter starting city/address (e.g. Gulberg, Lahore)" 
                        autoComplete="off" 
                    />
                    <button 
                        type="button" 
                        onClick={handleGpsClick} 
                        className="gps-btn" 
                        title="Use current GPS location" 
                        aria-label="Use current location"
                    >
                        {isGpsLoading ? (
                            <><i className="ri-loader-4-line ri-spin"></i> Finding...</>
                        ) : (
                            <><i className="ri-crosshair-2-line"></i> <span>{t('gps_btn')}</span></>
                        )}
                    </button>
                </div>

                <div className="mode-selector">
                    <button 
                        type="button" 
                        className={`mode-btn ${mode === 'driving' ? 'active' : ''}`}
                        onClick={() => handleModeChange('driving')}
                    >
                        <i className="ri-car-fill"></i> <span>{t('mode_driving')}</span>
                    </button>
                    <button 
                        type="button" 
                        className={`mode-btn ${mode === 'walking' ? 'active' : ''}`}
                        onClick={() => handleModeChange('walking')}
                    >
                        <i className="ri-walk-fill"></i> <span>{t('mode_walking')}</span>
                    </button>
                    <button 
                        type="button" 
                        className={`mode-btn ${mode === 'transit' ? 'active' : ''}`}
                        onClick={() => handleModeChange('transit')}
                    >
                        <i className="ri-bus-fill"></i> <span>{t('mode_transit')}</span>
                    </button>
                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    disabled={isCalculating}
                >
                    {isCalculating ? (
                        <><i className="ri-loader-4-line ri-spin"></i> Calculating...</>
                    ) : (
                        <><i className="ri-navigation-line"></i> <span>{t('directions_calc_btn')}</span></>
                    )}
                </button>
            </form>

            {/* Route Result Output */}
            {routeResult && (
                <div className="route-results">
                    <div className="route-summary">
                        <div className="summary-item">
                            <span className="label">{t('route_dist')}</span>
                            <strong className="val">{routeResult.distance}</strong>
                        </div>
                        <div className="summary-item">
                            <span className="label">{t('route_time')}</span>
                            <strong className="val">{routeResult.time}</strong>
                        </div>
                    </div>
                    <div className="route-steps">
                        <div className="step-item">
                            <i className="ri-map-pin-user-fill"></i> 
                            <span>Depart from origin towards Green Town Main Blvd.</span>
                        </div>
                        <div className="step-item">
                            <i className="ri-corner-up-right-double-fill"></i> 
                            <span>Follow Main Boulevard Green Town for {Math.max(0.5, (routeResult.distKm * 0.6).toFixed(1))} km.</span>
                        </div>
                        <div className="step-item">
                            <i className="ri-direction-fill"></i> 
                            <span>Turn into Sector D2, Block 5 street.</span>
                        </div>
                        <div className="step-item">
                            <i className="ri-flag-2-fill"></i> 
                            <span>Arrive at House No. 490, MDK Studio on your left.</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Quick Nav Apps */}
            <div className="external-nav-links">
                <span className="nav-label">{t('nav_app_open')}</span>
                <div className="nav-btn-group">
                    <a 
                        href="https://maps.google.com/?q=House+490+Block+5+Green+Town+Lahore+Pakistan" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="app-nav-btn google"
                    >
                        <i className="ri-google-fill"></i> Google Maps
                    </a>
                    <a 
                        href="https://waze.com/ul?q=Green+Town+Lahore" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="app-nav-btn waze"
                    >
                        <i className="ri-navigation-fill"></i> Waze
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RoutePlanner;
