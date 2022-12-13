import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationAR from '../locales/ar/translationAR.json';
import translationEN from '../locales/en/translationEN';

const resources = {
    en: {
        translation: translationEN,
        //translation: countryEN,
        //translation: listsEN,
    },
    ar: {
        translation: translationAR,
    },
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: localStorage.getItem('current_language') || 'en',
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
