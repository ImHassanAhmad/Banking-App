import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import Address from './Address';
import userEvent from '@testing-library/user-event';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.ADDRESS);

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));

describe('Address Component', () => {
  const mockProps = {
    updateActiveStep: jest.fn(),
    registerUser: jest.fn(),
    isLoading: false,
    userPayload: {}
  };

  test('renders Address component with form fields', () => {
    render(<Address {...mockProps} />);

    expect(screen.getByLabelText(/postal code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByTestId(/address1/i)).toBeInTheDocument();
    expect(screen.getByTestId(/address2/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  // const getLocationAndSubmitForm = jest.fn();
  test('check the geo location api and submits the form with valid data', async () => {
    // Mock the position and error objects
    const mockPosition = {
      coords: {
        latitude: 37.7749,
        longitude: -122.4194
      }
    };

    // Set up the getCurrentPosition mock implementation
    (navigator.geolocation.getCurrentPosition as jest.Mock).mockImplementation(
      (successCallback) => {
        successCallback(mockPosition); // Simulate a successful geolocation request
      }
    );

    render(<Address {...mockProps} />);
    fireEvent.change(screen.getByLabelText(/postal code/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'Sample City' } });

    await userEvent.type(screen.getByTestId(/address1/i), '123456789');
    await userEvent.type(screen.getByTestId(/address2/i), '123456789');
    await userEvent.type(screen.getByTestId(/cnt-selector/i), 'AD');

    await act(async () => {
      await userEvent.click(screen.getByText(/continue/i));
    });
    // Wait for the asynchronous operation to complete
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('right-btn'));
    });

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      // Assert that getLocationAndSubmitForm has been called
      expect(global.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    });
  });
});
