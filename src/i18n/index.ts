import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en, es, lt, pl } from '@app/i18n/translations';

const namespace = 'translation';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    resources: {
      en: { [namespace]: en },
      es: { [namespace]: es },
      lt: { [namespace]: lt },
      pl: { [namespace]: pl }
    }
  })
  .catch((error) => {
    console.log(error);
  });

export default i18n;
