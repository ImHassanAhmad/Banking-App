import { type RenderResult, render, fireEvent } from '@testing-library/react';
import PhoneNumberField from './PhoneNumberField';
import { store } from '@app/store';
import { Provider } from 'react-redux';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import { useInvestorSignUpStepper } from '@app/context/InvestorSignUpStepperContext';

jest.mock('react-router', () => ({
  useNavigate: () => jest.fn()
}));

jest.mock('@app/constants/countries', () => ({
  ALL_COUNTRIES: [{ name: 'Austria', iso2: 'AT', icon: 'path/to/icon' }]
}));

type SetupResult = RenderResult & {
  phoneInput: HTMLInputElement;
  countrySelector: HTMLSelectElement;
};

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.MOBILE);

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));

jest.mock(
  '@app/context/InvestorSignUpStepperContext.tsx',
  () =>
    ({
      useInvestorSignUpStepper: () => ({ userPayload: {} }) as any
    }) as any
);

const setup = (): SetupResult => {
  const props = useInvestorSignUpStepper();

  const result = render(
    <Provider store={store}>
      <PhoneNumberField {...props} />
    </Provider>
  );
  const phoneInput = result.getByTestId('phone-input').querySelector('input') as HTMLInputElement;
  const countrySelector = result.getByTestId('phone-country-selector') as HTMLSelectElement;
  return { ...result, phoneInput, countrySelector };
};

describe('PhoneNumberField', () => {
  test('Renders correctly', () => {
    const { phoneInput, countrySelector } = setup();
    expect(phoneInput).toBeInTheDocument();
    expect(countrySelector).toBeInTheDocument();
  });
  test('Updates selected country code when phone number changes', () => {
    const { phoneInput } = setup();

    fireEvent.change(phoneInput, { target: { value: '+123' } });
    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput).toHaveValue('+123');

    fireEvent.change(phoneInput, { target: { value: '+456' } });
    expect(phoneInput).toHaveValue('+456');
  });

  test('check heading title and subtitle', () => {
    const { getByText } = setup();
    expect(getByText(en[RouteNames.MOBILE].title)).toBeInTheDocument();
    expect(getByText(en[RouteNames.MOBILE].subtitle)).toBeInTheDocument();
  });
});
