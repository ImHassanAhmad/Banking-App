import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SocialSecurityTax from './SocialSecurityNumber';
import { RouteNames } from '@app/constants/routes';
import { en } from '@app/i18n/translations';
import transformation from '@app/utils/LanguageTransformation';
const mockRoutes = RouteNames;
const mockLanguage = en;
const mockTransformation = transformation(mockLanguage, mockRoutes.SECURITY_NUMBER);
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));
const mockUpdateActiveStep = jest.fn();
const mockUpdateUserPayload = jest.fn();

describe('SocialSecurityTax Component', () => {
  const userPayloadMock = {
    isUsResident: false,
    socialSecurityNumber: []
  };
  const renderComponent = (userPayload = userPayloadMock) =>
    render(
      <SocialSecurityTax
        updateActiveStep={mockUpdateActiveStep}
        updateUserPayload={mockUpdateUserPayload}
        userPayload={userPayload}
      />
    );
  it('renders without crashing', () => {
    renderComponent();
  });
  it('calls updateActiveStep when continue button is clicked', () => {
    renderComponent();
    const continueButton = screen.getByRole('button', {
      name: en[RouteNames.SECURITY_NUMBER].continue
    });
    fireEvent.click(continueButton);
  });
  it('calls updateUserPayload with correct data when a country is selected and input is filled', () => {
    renderComponent();
    const countrySelector = screen.getByPlaceholderText(/select country/i);
    fireEvent.change(countrySelector, { target: { value: 'US' } });
    const inputField = screen.getByRole('textbox');
    fireEvent.change(inputField, { target: { value: '123-45-6789' } });
    fireEvent.click(screen.getByRole('button', { name: en[RouteNames.SECURITY_NUMBER].continue }));
  });
  it('updates input state when text is entered in the input field', () => {
    renderComponent();
    const inputField = screen.getByRole('textbox');
    fireEvent.change(inputField, { target: { value: '123-45-6789' } });
    expect(inputField).toHaveValue('123-45-6789');
  });
});
