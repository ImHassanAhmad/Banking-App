import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EXPOSED_PERSON } from '@app/constants/investor-onboarding';
import PoliticalExposedPerson from './PoliticallyExposedPerson'; // Make sure to replace with actual path
import { RouteNames } from '@app/constants/routes';
import { en } from '@app/i18n/translations';
import transformation from '@app/utils/LanguageTransformation';
// eslint-disable-next-line no-undef
const mockRoutes = RouteNames;
const mockLanguage = en;
const mockTransformation = transformation(mockLanguage, mockRoutes.POLITICAL_EXPOSED_PERSON);
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));
describe('PoliticalExposedPerson Component', () => {
  const mockUpdateActiveStep = jest.fn();

  const setup = () =>
    render(<PoliticalExposedPerson updateActiveStep={mockUpdateActiveStep} userPayload={{}} />);
  it('renders heading and subtitle correctly', () => {
    setup();
    expect(screen.getByText(en[RouteNames.POLITICAL_EXPOSED_PERSON].title)).toBeInTheDocument();
    expect(screen.getByText(en[RouteNames.POLITICAL_EXPOSED_PERSON].subtitle)).toBeInTheDocument();
  });
  it('renders all radio options for political exposure', () => {
    setup();
    EXPOSED_PERSON.forEach((option) => {
      const radioButton = screen.getByLabelText(option.label);
      expect(radioButton).toBeInTheDocument();
      expect(radioButton).toHaveAttribute('value', option.value);
    });
  });
  it('calls updateActiveStep function when continue button is clicked', () => {
    setup();
    const continueButton = screen.getByText(en[RouteNames.POLITICAL_EXPOSED_PERSON].continue);
    fireEvent.click(continueButton);
    expect(mockUpdateActiveStep).toHaveBeenCalledTimes(1);
  });
  it('allows selection of an exposed person status', () => {
    setup();
    const optionToSelect = EXPOSED_PERSON[0];
    const radioButton = screen.getByLabelText(optionToSelect.label);
    fireEvent.click(radioButton);
    expect(radioButton).toBeChecked();
  });
});
