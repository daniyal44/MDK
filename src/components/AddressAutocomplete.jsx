import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const AddressAutocomplete = ({ value, onChange, onSelect }) => {
    const { t } = useLanguage();
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef(null);
    const debounceTimer = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, []);

    const handleInputChange = (e) => {
        const val = e.target.value;
        onChange(val);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        if (val.trim().length < 3) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        setIsLoading(true);
        debounceTimer.current = setTimeout(() => {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val)}&addressdetails=1&limit=5`)
                .then(res => res.json())
                .then(items => {
                    setIsLoading(false);
                    if (items && items.length > 0) {
                        setSuggestions(items);
                        setIsOpen(true);
                    } else {
                        setSuggestions([]);
                        setIsOpen(false);
                    }
                })
                .catch(() => {
                    setIsLoading(false);
                    setSuggestions([]);
                    setIsOpen(false);
                });
        }, 300);
    };

    const handleSelectSuggestion = (displayName) => {
        onChange(displayName);
        if (onSelect) onSelect(displayName);
        setIsOpen(false);
    };

    return (
        <div className="form-wrapper address-autocomplete-container" ref={containerRef}>
            <label htmlFor="addressInput" className="form-label">
                {t('contact_lbl_address')}
            </label>

            <div className="input-wrapper">
                <input 
                    type="text" 
                    name="address" 
                    id="addressInput" 
                    value={value}
                    onChange={handleInputChange}
                    placeholder="Start typing address (e.g. Gulberg III, Lahore...)" 
                    className="input-field" 
                    autoComplete="off" 
                />
                <i className={`input-icon ${isLoading ? 'ri-loader-4-line ri-spin' : 'ri-map-pin-user-line'}`}></i>
                
                {isOpen && suggestions.length > 0 && (
                    <div className="autocomplete-dropdown">
                        {suggestions.map((item, idx) => (
                            <div 
                                key={idx} 
                                className="autocomplete-item" 
                                onClick={() => handleSelectSuggestion(item.display_name)}
                            >
                                <i className="ri-map-pin-line"></i>
                                <span>{item.display_name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddressAutocomplete;
