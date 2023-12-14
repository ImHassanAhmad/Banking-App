/* eslint-disable no-var */
import { type RenderResult, render } from '@testing-library/react';
import CountrySelector from './CountrySelector';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import { en } from '@app/i18n/translations';
import { ALL_COUNTRIES } from '@app/constants/countries';
import { type ICountrySelectorProps } from './types';

var mockAllCountres = ALL_COUNTRIES;
const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.COUNTRY);

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));

jest.mock('@app/constants/countries', () => ({
  ALL_COUNTRIES: mockAllCountres
}));

const defaultProps: ICountrySelectorProps = {
  placeholder: en[RouteNames.COUNTRY].placeholder,
  onChange: jest.fn()
};

const setup = (
  props?: Partial<ICountrySelectorProps>
): RenderResult & {
  selectWrapper: HTMLDivElement;
  input: HTMLInputElement;
} => {
  const result = render(<CountrySelector {...{ ...defaultProps, ...props }} />);
  const selectWrapper = result.getByTestId('cnt-selector') as HTMLDivElement;
  const input = selectWrapper.querySelector('input') as HTMLInputElement;
  return { ...result, selectWrapper, input };
};

describe('CountrySelector', () => {
  it('renders the Select component', () => {
    const { getByRole } = setup();

    const selectElement = getByRole('button');
    expect(selectElement).toBeInTheDocument();
  });

  // it('should select the option', async () => {
  //   const { selectWrapper, input, getByText } = setup();

  //   fireEvent.click(input);

  //   await waitFor(() => {
  //     console.log(screen);
  //   });

  //   const option = getByText('Austria');
  //   fireEvent.click(option);

  //   const inputElement = selectWrapper?.querySelector('input');
  //   const selectedValue = inputElement?.value;

  //   expect(selectedValue).toBe('Austria');
  // });

  // it('should filter options when searching "Austria"', async () => {
  //   const { getByTestId, getAllByRole, getByText } = render(CountrySelectComponent);

  //   const selectWrapper = getByTestId('cnt-selector');
  //   const input = selectWrapper.querySelector('input');
  //   if (input) {
  //     fireEvent.focus(input);
  //     fireEvent.change(input, { target: { value: 'Austria' } });
  //   }

  //   await waitFor(() => getByText('Austria'));

  //   const austriaOption = getByText('Austria');
  //   expect(austriaOption).toBeInTheDocument();

  //   const dropdownItems = getAllByRole('option');
  //   expect(dropdownItems.length).toBe(1);
  // });
});
