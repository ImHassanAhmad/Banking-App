import { getCountryFlag } from '@app/assets/flags';
import { type CountrySelectOption } from '@app/types/types';
import { countries, getCountryData, type TCountryCode } from 'countries-list';

const countryCodes = Object.keys(countries) as TCountryCode[];

export const ALL_COUNTRIES: CountrySelectOption[] = countryCodes.map((code) => {
  const { name, iso2 } = getCountryData(code);
  return {
    name,
    iso2,
    icon: getCountryFlag(code)
  };
});
