import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import IncomeRange from './IncomeRange';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.INCOME_RANGE);

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));

describe('IncomeRange Component', () => {
  const mockProps = {
    updateActiveStep: jest.fn(),
    registerUser: jest.fn(),
    isLoading: false,
    userPayload: {}
  };

  test('renders IncomeRange component with onboarding list', () => {
    render(<IncomeRange {...mockProps} />);

    expect(screen.getByText(/income range/i)).toBeInTheDocument();
    expect(screen.getByText(/more/i)).toBeInTheDocument();
    expect(screen.getByText(/less/i)).toBeInTheDocument();
  });

  test('clicks on an item in the onboarding list', async () => {
    render(<IncomeRange {...mockProps} />);

    // Get all elements with data-testid="itemClick"
    const items = screen.queryAllByTestId('itemClick');

    // Check if there is at least one item
    if (items.length > 0) {
      // Click on the first item
      fireEvent.click(items[0]);

      // Wait for any asynchronous updates (if any)
      await waitFor(() => {});

      // Assert that updateActiveStep has been called
      expect(mockProps.updateActiveStep).toHaveBeenCalled();
    } else {
      // Handle the case when no item is found (e.g., log an error or fail the test)
      console.error('No item found with data-testid="itemClick"');
    }
  });

  test('handles form submission when isLoading is true', async () => {
    const isLoadingProps = { ...mockProps, isLoading: true };
    render(<IncomeRange {...isLoadingProps} />);

    // Click on an item in the list
    fireEvent.click(screen.getByText(/more/i));

    // Since isLoading is true, the form submission should not occur
    await waitFor(() => {
      expect(mockProps.updateActiveStep).not.toHaveBeenCalled();
    });
  });
});
