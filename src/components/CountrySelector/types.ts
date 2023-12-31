import { type CountrySelectOption } from '@app/common/types';

export interface ICountrySelectorProps {
  placeholder: string;
  selectedCountry?: CountrySelectOption;
  onChange: (v: CountrySelectOption) => void;
  isDisabled?: boolean;
  searchIcon?: string; // Optional property
  arrowIcon?: string;
  readOnly?: boolean;
}
