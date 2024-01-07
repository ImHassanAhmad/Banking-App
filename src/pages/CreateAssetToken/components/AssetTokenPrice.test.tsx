import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AssetTokenPrice } from './AssetTokenPrice';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import { currencies } from '../types';
import { Provider } from 'react-redux';
import { store } from '@app/store';
import { BrowserRouter as Router } from 'react-router-dom';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.CREATE_ASSET_TOKEN);
const assetToken = mockLanguage['create-asset-token'];

const mockSubmit = jest.fn();
const mockBack = jest.fn(); // Mock the 'next' function prop

const renderComponent = (): void => {
  render(
    <Provider store={store}>
      <Router>
        <AssetTokenPrice submit={mockSubmit} back={mockBack} />
      </Router>
    </Provider>
  );
};
// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key] // Return the key itself for testing purposes
  })
}));

describe('AssetTokenPrice Component', () => {
  it('renders currency autocomplete and buy token text field', () => {
    renderComponent();
    const currencyAutocomplete = screen.getByLabelText(assetToken.currency); // Adjust the label or identifier based on your actual text or label
    expect(currencyAutocomplete).toBeInTheDocument();

    // Check if the buy token text field is rendered
    const buyTokenTextField = screen.getByLabelText(assetToken.buy_token); // Adjust the label or identifier based on your actual text or label
    expect(buyTokenTextField).toBeInTheDocument();
    expect(buyTokenTextField).toHaveAttribute('type', 'number'); // Check if it's a number type input
  });

  it('displays correct currency options in Autocomplete when opened', async () => {
    renderComponent();

    // Find the Autocomplete input
    const autocompleteInput = screen.getByLabelText(assetToken.currency);

    // Click to focus and open the Autocomplete dropdown
    fireEvent.focus(autocompleteInput);
    fireEvent.keyDown(autocompleteInput, { key: 'ArrowDown' }); // Simulate arrow down to open options

    // Wait for options to appear (assuming they might be fetched asynchronously)
    await waitFor(() => {
      currencies.forEach((currency: any) => {
        expect(screen.getByText(currency.label)).toBeInTheDocument();
      });
    });
  });

  it('accepts only numeric values in the buy token input field', () => {
    renderComponent();

    const buyTokenTextField = screen.getByLabelText(assetToken.buy_token);

    // Simulate typing a non-numeric value
    fireEvent.change(buyTokenTextField, { target: { value: 'abc' } });
    expect(buyTokenTextField).toHaveValue(null);

    // Simulate typing a numeric value
    fireEvent.change(buyTokenTextField, { target: { value: '123' } });
    expect(buyTokenTextField).toHaveValue(123);
  });
});

describe('AssetTokenPrice Component - Error Handling', () => {
  it('displays validation error messages for required fields', async () => {
    renderComponent();
    await act(() => fireEvent.submit(screen.getByText(assetToken.continue)));
    expect(screen.getByText(assetToken.required_currency)).toBeInTheDocument();
    expect(screen.getByText(assetToken.not_zero_price)).toBeInTheDocument();
  });

  it('displays validation error message for currency when not selected', async () => {
    renderComponent();
    fireEvent.submit(screen.getByText(assetToken.continue));
    expect(await screen.findByText(assetToken.required_currency)).toBeInTheDocument();
  });
  it('displays validation error message for buy price when not provided', async () => {
    renderComponent();
    const autocompleteInput = screen.getByLabelText(assetToken.currency);
    fireEvent.focus(autocompleteInput);
    fireEvent.keyDown(autocompleteInput, { key: 'ArrowDown' });
    fireEvent.click(screen.getByText(currencies[0].label)); // Select the first currency option
    fireEvent.submit(screen.getByText(assetToken.continue));
    expect(await screen.findByText(assetToken.not_zero_price)).toBeInTheDocument();
  });

  it('does not call the submit prop function if there are validation errors', () => {
    renderComponent();
    fireEvent.submit(screen.getByText(assetToken.continue));
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
