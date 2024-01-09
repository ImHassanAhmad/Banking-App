import { type CountrySelectOption } from '@app/types/types';

export interface ICountrySelectorProps {
  placeholder: string;
  selectedCountry?: CountrySelectOption;
  onChange: (v: CountrySelectOption) => void;
  isDisabled?: boolean;
  error?: string;
}
