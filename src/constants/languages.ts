import { ENG_LANG, LITH_LANG, POL_LANG, SPAIN_LANG } from '@app/assets/images';
import { type Language } from '@app/i18n/types';

export const APP_LANGUAGES: Language[] = [
  {
    displayName: 'English',
    key: 'en',
    icon: ENG_LANG,
    countryCode: 44
  },
  {
    displayName: 'Lithuanian',
    key: 'lt',
    icon: LITH_LANG,
    countryCode: 370
  },
  {
    displayName: 'Polish',
    key: 'pl',
    icon: POL_LANG,
    countryCode: 48
  },
  {
    displayName: 'Spanish',
    key: 'es',
    icon: SPAIN_LANG,
    countryCode: 34
  }
];
