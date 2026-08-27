import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLangState] = useState(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const queryLang = urlParams.get('lang');
        const storedLang = localStorage.getItem('lang');

        if (queryLang && translations[queryLang]) {
            return queryLang;
        }
        if (storedLang && translations[storedLang]) {
            return storedLang;
        }
        return 'en';
    });

    const setLang = (newLang) => {
        if (translations[newLang]) {
            setLangState(newLang);
            localStorage.setItem('lang', newLang);
        }
    };

    const t = (key) => {
        if (translations[lang] && translations[lang][key] !== undefined) {
            return translations[lang][key];
        }
        if (translations['en'] && translations['en'][key] !== undefined) {
            return translations['en'][key];
        }
        return key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, translations: translations[lang] || translations.en }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
