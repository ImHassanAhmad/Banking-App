/* eslint-disable no-var */
import { render, screen } from '@testing-library/react';
import CountrySelect from './CountrySelect';
import { en } from '@app/i18n/translations';
import { Provider } from 'react-redux';
import { store } from '@app/store';
import { ALL_COUNTRIES } from '@app/constants/countries';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import { useInvestorSignUpStepper } from '@app/context/InvestorSignUpStepperContext';

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

jest.mock('react-router', () => ({
  useNavigate: () => jest.fn()
}));

jest.mock('@app/constants/countries', () => ({
  ALL_COUNTRIES: mockAllCountres
}));

jest.mock(
  '@app/context/InvestorSignUpStepperContext.tsx',
  () =>
    ({
      useInvestorSignUpStepper: () => ({}) as any
    }) as any
);

const renderCountrySelect = (): void => {
  const props = useInvestorSignUpStepper();
  render(
    <Provider store={store}>
      <CountrySelect {...props} />
    </Provider>
  );
};

describe('CountrySelect', () => {
  it('renders the country select form', () => {
    renderCountrySelect();

    expect(screen.getByText(en[RouteNames.COUNTRY].title)).toBeInTheDocument();
    expect(screen.getByText(en[RouteNames.COUNTRY].subtitle)).toBeInTheDocument();
    expect(screen.getByText(en[RouteNames.COUNTRY].continue)).toBeInTheDocument();
  });
  it('change country select option', () => {
    renderCountrySelect();

    const selectorInput: HTMLElement = screen.getByTestId('cnt-selector');
    expect(selectorInput).toBeInTheDocument();
  });
});
