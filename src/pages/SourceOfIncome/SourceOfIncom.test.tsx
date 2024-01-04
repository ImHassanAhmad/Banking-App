import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SourceOfIncome from './SourceOfIncome';
import { IncomeSources } from '@app/common/types';
import { RouteNames } from '@app/constants/routes';
import { en } from '@app/i18n/translations';
import transformation from '@app/utils/LanguageTransformation';
const mockRoutes = RouteNames;
const mockLanguage = en;
const mockTransformation = transformation(mockLanguage, mockRoutes.SOURCE_OF_INCOME);
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));
const incomeSourcesArray: string[] = Object.values(IncomeSources);

describe('SourceOfIncome component', () => {
  const mockUpdateActiveStep = jest.fn();
  const mockUpdateUserPayload = jest.fn();

  const defaultProps = {
    updateActiveStep: mockUpdateActiveStep,
    userPayload: { sourceOfIncome: [] },
    updateUserPayload: mockUpdateUserPayload
  };

  test('renders component with checkboxes and button', () => {
    render(<SourceOfIncome {...defaultProps} />);
    expect(screen.getByText(en[RouteNames.SOURCE_OF_INCOME].title)).toBeInTheDocument();
    expect(screen.getByText(en[RouteNames.SOURCE_OF_INCOME].subtitle)).toBeInTheDocument();
    incomeSourcesArray.forEach((source) => {
      expect(screen.getByText(`Your ${source} translation key`)).toBeInTheDocument();
    });

    // Check if the "Continue" button is rendered
    expect(screen.getByText(en[RouteNames.SOURCE_OF_INCOME].continue)).toBeInTheDocument();
  });

  test('handles checkbox changes and save button click', () => {
    render(<SourceOfIncome {...defaultProps} />);

    // Simulate checkbox changes
    fireEvent.click(screen.getByText('Your firstIncomeSource translation key'));
    fireEvent.click(screen.getByText('Your secondIncomeSource translation key'));

    // Check if checkboxes are updated
    expect(screen.getByText('Your firstIncomeSource translation key')).toBeChecked();
    expect(screen.getByText('Your secondIncomeSource translation key')).toBeChecked();

    // Simulate button click
    fireEvent.click(screen.getByText(en[RouteNames.SOURCE_OF_INCOME].continue));

    // Check if updateUserPayload and updateActiveStep functions are called
    expect(mockUpdateUserPayload).toHaveBeenCalledWith({
      sourceOfIncome: ['firstIncomeSource', 'secondIncomeSource']
    });
    expect(mockUpdateActiveStep).toHaveBeenCalled();
  });

  test('disables "Continue" button if no checkbox is checked', () => {
    render(<SourceOfIncome {...defaultProps} />);

    // Check if "Continue" button is initially disabled
    expect(screen.getByText(en[RouteNames.SOURCE_OF_INCOME].continue)).toBeDisabled();

    // Simulate checkbox change
    fireEvent.click(screen.getByText('Your firstIncomeSource translation key'));

    // Check if "Continue" button is enabled after checkbox change
    expect(screen.getByText(en[RouteNames.SOURCE_OF_INCOME].continue)).toBeEnabled();
  });
});
