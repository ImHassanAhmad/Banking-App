import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CountryTaxes from './CountryTaxes'; // Make sure the path is correct according to your project structure
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import { en } from '@app/i18n/translations';

// Mocking the necessary functions and modules
const mockRoutes = RouteNames;
const mockLanguage = en;
const mockTransformation = transformation(mockLanguage, mockRoutes.PAY_COUNTRY_TAXES);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));

const mockGoBack = jest.fn();
const mockUpdateActiveStep = jest.fn();
const mockUpdateUserPayload = jest.fn();

describe('<CountryTaxes />', () => {
  const userPayloadMock = {
    socialSecurityNumber: [
      {
        iso: 'US',
        country: 'United States',
        taxNumber: '12345'
      }
    ]
  };

  it('renders without crashing', () => {
    render(
      <CountryTaxes
        updateActiveStep={mockUpdateActiveStep}
        goBack={mockGoBack}
        activeStepIndex={1}
        userPayload={userPayloadMock}
        updateUserPayload={mockUpdateUserPayload}
      />
    );
    expect(screen.getByText(en[RouteNames.PAY_COUNTRY_TAXES].title)).toBeInTheDocument();
    expect(screen.getByText(en[RouteNames.PAY_COUNTRY_TAXES].countrydetail)).toBeInTheDocument();
    expect(screen.getByText(en[RouteNames.PAY_COUNTRY_TAXES].addcountry)).toBeInTheDocument();
    expect(screen.getByText(en[RouteNames.PAY_COUNTRY_TAXES].continue)).toBeInTheDocument();
  });

  it('calls "updateActiveStep" when continue button is clicked', () => {
    render(
      <CountryTaxes
        updateActiveStep={mockUpdateActiveStep}
        goBack={mockGoBack}
        activeStepIndex={1}
        userPayload={userPayloadMock}
        updateUserPayload={mockUpdateUserPayload}
      />
    );
    const continueButton = screen.getByText(en[RouteNames.PAY_COUNTRY_TAXES].continue);
    fireEvent.click(continueButton);

    expect(mockUpdateActiveStep).toHaveBeenCalled();
  });
});
