import { type CountrySelectOption } from '@app/common/types';

export interface ICountrySelectorProps {
  placeholder: string;
  selectedCountry?: CountrySelectOption;
  onChange: (v: CountrySelectOption) => void;
  isDisabled?: boolean;
}
