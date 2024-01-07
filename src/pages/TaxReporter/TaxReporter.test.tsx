import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TaxReporter from './TaxReporter';
import { RouteNames } from '@app/constants/routes';
import { en } from '@app/i18n/translations';
import transformation from '@app/utils/LanguageTransformation';
const mockRoutes = RouteNames;
const mockLanguage = en;
const mockTransformation = transformation(mockLanguage, mockRoutes.TAX_REPORTER);
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));
describe('TaxReporter Component', () => {
  it('calls the handleSave function when the continue button is clicked', () => {
    const mockUpdateActiveStep = jest.fn();
    const { getByText } = render(<TaxReporter updateActiveStep={mockUpdateActiveStep} />);
    const continueButton = getByText(en[RouteNames.TAX_REPORTER].continue);
    fireEvent.click(continueButton);
    expect(mockUpdateActiveStep).toHaveBeenCalledTimes(1);
  });
});
