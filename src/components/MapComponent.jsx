import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { STUDIO_COORDS, nearbyAmenities } from '../data/amenitiesData';
import { useLanguage } from '../context/LanguageContext';

const MapComponent = ({ activeCategory, setActiveCategory, onMapReady, routeData }) => {
    const { t } = useLanguage();
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markersGroup = useRef(null);
    const routeLayer = useRef(null);
    const userMarkerLayer = useRef(null);

    // Initialize Map
    useEffect(() => {
        if (!mapRef.current || mapInstance.current) return;

        const map = L.map(mapRef.current, {
            center: STUDIO_COORDS,
            zoom: 15,
            zoomControl: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        // Custom Studio Marker
        const studioIcon = L.divIcon({
            className: 'custom-studio-marker',
            html: '<div style="background:#06b6d4; color:#fff; padding:6px 12px; border-radius:20px; font-weight:bold; font-size:12px; box-shadow:0 0 15px rgba(6,182,212,0.6); display:flex; align-items:center; gap:4px;"><i class="ri-briefcase-4-fill"></i> MDK Studio</div>',
            iconSize: [110, 30],
            iconAnchor: [55, 15]
        });

        L.marker(STUDIO_COORDS, { icon: studioIcon })
            .addTo(map)
            .bindPopup('<strong>Muhammad Daniyal Studio</strong><br>House No. 490, Block 5, Green Town, Lahore')
            .openPopup();

        markersGroup.current = L.layerGroup().addTo(map);
        mapInstance.current = map;

        if (onMapReady) {
            onMapReady(map);
        }

        return () => {
            map.remove();
            mapInstance.current = null;
        };
    }, []);

    // Update Amenity Markers on Category Change
    useEffect(() => {
        if (!markersGroup.current || !mapInstance.current) return;
        markersGroup.current.clearLayers();

        const filtered = activeCategory === 'all'
            ? nearbyAmenities
            : nearbyAmenities.filter(a => a.category === activeCategory);

        filtered.forEach(item => {
            let iconHtml = '<i class="ri-map-pin-line"></i>';
            if (item.category === 'food') iconHtml = '<i class="ri-restaurant-line"></i>';
            else if (item.category === 'transit') iconHtml = '<i class="ri-bus-line"></i>';
            else if (item.category === 'bank') iconHtml = '<i class="ri-bank-line"></i>';
            else if (item.category === 'service') iconHtml = '<i class="ri-parking-line"></i>';

            const markerIcon = L.divIcon({
                className: 'custom-amenity-marker',
                html: `<div style="background:#1b1e2b; color:#06b6d4; border:2px solid #06b6d4; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,0.5);">${iconHtml}</div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            });

            const marker = L.marker([item.lat, item.lng], { icon: markerIcon })
                .bindPopup(`<strong>${item.name}</strong><br>${item.desc}<br><small style="color:#06b6d4;">${item.dist} from studio</small>`);

            markersGroup.current.addLayer(marker);
        });
    }, [activeCategory]);

    // Update Route on Map
    useEffect(() => {
        if (!mapInstance.current) return;
        const map = mapInstance.current;

        if (routeLayer.current) {
            map.removeLayer(routeLayer.current);
            routeLayer.current = null;
        }
        if (userMarkerLayer.current) {
            map.removeLayer(userMarkerLayer.current);
            userMarkerLayer.current = null;
        }

        if (routeData && routeData.userCoords) {
            const [userLat, userLng] = routeData.userCoords;

            const userIcon = L.divIcon({
                className: 'custom-user-marker',
                html: '<div style="background:#ef4444; color:#fff; padding:4px 8px; border-radius:12px; font-weight:bold; font-size:11px;">Start</div>',
                iconSize: [40, 20]
            });

            userMarkerLayer.current = L.marker([userLat, userLng], { icon: userIcon }).addTo(map);

            routeLayer.current = L.polyline([[userLat, userLng], STUDIO_COORDS], {
                color: '#06b6d4',
                weight: 5,
                opacity: 0.8,
                dashArray: '8, 8'
            }).addTo(map);

            map.fitBounds(routeLayer.current.getBounds(), { padding: [40, 40] });
        }
    }, [routeData]);

    const highlightAmenity = (item) => {
        if (!mapInstance.current || !markersGroup.current) return;
        mapInstance.current.flyTo([item.lat, item.lng], 17, { duration: 1.2 });

        markersGroup.current.eachLayer(marker => {
            const pos = marker.getLatLng();
            if (pos.lat === item.lat && pos.lng === item.lng) {
                marker.openPopup();
            }
        });
    };

    const filteredAmenities = activeCategory === 'all'
        ? nearbyAmenities
        : nearbyAmenities.filter(a => a.category === activeCategory);

    return (
        <div className="map-container-wrapper" data-reveal="right">
            {/* Category Filter Tabs */}
            <div className="amenity-tabs" id="amenityTabs">
                <button 
                    className={`amenity-tab ${activeCategory === 'all' ? 'active' : ''}`} 
                    onClick={() => setActiveCategory('all')}
                >
                    <i className="ri-apps-2-line"></i> <span>{t('cat_all')}</span>
                </button>
                <button 
                    className={`amenity-tab ${activeCategory === 'food' ? 'active' : ''}`} 
                    onClick={() => setActiveCategory('food')}
                >
                    <i className="ri-restaurant-2-line"></i> <span>{t('cat_food')}</span>
                </button>
                <button 
                    className={`amenity-tab ${activeCategory === 'transit' ? 'active' : ''}`} 
                    onClick={() => setActiveCategory('transit')}
                >
                    <i className="ri-bus-2-line"></i> <span>{t('cat_transit')}</span>
                </button>
                <button 
                    className={`amenity-tab ${activeCategory === 'bank' ? 'active' : ''}`} 
                    onClick={() => setActiveCategory('bank')}
                >
                    <i className="ri-bank-card-line"></i> <span>{t('cat_bank')}</span>
                </button>
                <button 
                    className={`amenity-tab ${activeCategory === 'service' ? 'active' : ''}`} 
                    onClick={() => setActiveCategory('service')}
                >
                    <i className="ri-parking-box-line"></i> <span>{t('cat_parking')}</span>
                </button>
            </div>

            {/* Map Canvas */}
            <div ref={mapRef} id="interactiveMap" className="interactive-map" style={{ height: '420px', width: '100%', borderRadius: '12px' }}></div>

            {/* Amenity Cards List */}
            <div className="amenity-cards-scroller" id="amenityCardsList">
                {filteredAmenities.map(item => (
                    <div 
                        key={item.id} 
                        className="amenity-card-item" 
                        onClick={() => highlightAmenity(item)}
                    >
                        <div className="amenity-card-header">
                            <span className="amenity-card-title">{item.name}</span>
                            <span className="amenity-badge">{item.category.toUpperCase()}</span>
                        </div>
                        <p className="amenity-card-desc">{item.desc}</p>
                        <div className="amenity-card-dist">
                            <i className="ri-footprint-line"></i> {item.dist} away
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MapComponent;
