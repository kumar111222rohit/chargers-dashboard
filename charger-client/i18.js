import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './public/locales/en/common.json';
import translationES from './public/locales/en/common.json';
import translationDE from './public/locales/en/common.json';
import translationNL from './public/locales/en/common.json';
import translationFR from './public/locales/en/common.json';

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
  fr: {
    translation: translationFR,
  },
  nl: {
    translation: translationNL,
  },
  de: {
    translation: translationDE,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
