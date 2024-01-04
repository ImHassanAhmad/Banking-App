import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import TokenBasicInformation from './TokenBasicInformation';
import { BrowserRouter as Router } from 'react-router-dom';
import transformation from '@app/utils/LanguageTransformation';
import { RouteNames } from '@app/constants/routes';
import { en } from '@app/i18n/translations';
import { Provider } from 'react-redux';
import { store } from '@app/store';

// Mock the useTranslation hook
const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.CREATE_ASSET_TOKEN);
const assetToken = mockLanguage['create-asset-token'];

const mockNextFunction = jest.fn(); // Mock the 'next' function prop

const renderComponent = (): void => {
  render(
    <Provider store={store}>
      <Router>
        <TokenBasicInformation next={mockNextFunction} /> {/* Pass next as a prop */}
      </Router>
    </Provider>
  );
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key] // Mock translation function to return the key itself for testing
  })
}));

describe('TokenBasicInformation component', () => {
  it('renders without crashing', () => {
    renderComponent();
    expect(screen.getByLabelText(assetToken.token_name)).toBeInTheDocument();
    expect(screen.getByLabelText(assetToken.token_symbol)).toBeInTheDocument();
    expect(screen.getByLabelText(assetToken.total_supply)).toBeInTheDocument();
    expect(screen.getByLabelText(assetToken.decimal_number)).toBeInTheDocument();
  });

  it('handles file change correctly', () => {
    renderComponent();

    const file = new File(['file content'], 'file.png', {
      type: 'image/png'
    });
    const fileInput = screen.getByLabelText(assetToken.upload_logo);
    // Simulate file change event
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect((fileInput as HTMLInputElement).files?.[0]).toEqual(file);
  });

  it('text fields are initially empty', () => {
    renderComponent();

    expect(screen.getByLabelText(assetToken.token_name)).toHaveValue('');
    expect(screen.getByLabelText(assetToken.token_symbol)).toHaveValue('');
    expect(screen.getByLabelText(assetToken.total_supply)).toHaveValue(0);
    expect(screen.getByLabelText(assetToken.decimal_number)).toHaveValue(0);
  });

  it('updates text fields correctly when input changes', () => {
    renderComponent();

    // Update text fields with mock values
    const mockValues = {
      token_name: 'TestTokenName',
      token_symbol: 'TST',
      total_supply: 100000,
      decimal_number: 18
    };

    fireEvent.change(screen.getByLabelText(assetToken.token_name), {
      target: { value: mockValues.token_name }
    });
    fireEvent.change(screen.getByLabelText(assetToken.token_symbol), {
      target: { value: mockValues.token_symbol }
    });
    fireEvent.change(screen.getByLabelText(assetToken.total_supply), {
      target: { value: mockValues.total_supply }
    });
    fireEvent.change(screen.getByLabelText(assetToken.decimal_number), {
      target: { value: mockValues.decimal_number }
    });

    // Verify that the text fields have been updated correctly
    expect(screen.getByLabelText(assetToken.token_name)).toHaveValue(mockValues.token_name);
    expect(screen.getByLabelText(assetToken.token_symbol)).toHaveValue(mockValues.token_symbol);
    expect(screen.getByLabelText(assetToken.total_supply)).toHaveValue(mockValues.total_supply);
    expect(screen.getByLabelText(assetToken.decimal_number)).toHaveValue(mockValues.decimal_number);
  });
});

describe('TokenBasicInformation component - Error Handling', () => {
  it('displays validation error messages for required fields', async () => {
    renderComponent();

    // Submit the form without filling any fields

    await act(() => fireEvent.submit(screen.getByText(assetToken.continue)));

    // Assert that the error messages are displayed for all required fields
    expect(screen.getByText(assetToken.required_name)).toBeInTheDocument();
    expect(screen.getByText(assetToken.required_symbol)).toBeInTheDocument();
    expect(screen.getByText(assetToken.not_zero_supply)).toBeInTheDocument();
    expect(screen.getByText(assetToken.not_zero_decimal)).toBeInTheDocument();
    expect(screen.getByText(assetToken.required_token_logo)).toBeInTheDocument();
  });

  it('displays validation error message for total supply and number of decimals when set to 0', async () => {
    renderComponent();

    // Update text fields with 0 values for total supply and number of decimals
    await act(() =>
      fireEvent.change(screen.getByLabelText(assetToken.total_supply), {
        target: { value: 0 }
      })
    );

    await act(() =>
      fireEvent.change(screen.getByLabelText(assetToken.decimal_number), {
        target: { value: 0 }
      })
    );

    // Submit the form
    await act(() => fireEvent.submit(screen.getByText(assetToken.continue)));

    // Assert that the error messages are displayed for total supply and number of decimals
    expect(screen.getByText(assetToken.not_zero_decimal)).toBeInTheDocument();
    expect(screen.getByText(assetToken.not_zero_decimal)).toBeInTheDocument();
  });

  it('displays validation error message when token logo is not provided', async () => {
    renderComponent();

    // Submit the form without selecting a file for the token logo
    await act(() => fireEvent.submit(screen.getByText(assetToken.continue)));

    // Assert that the error message is displayed for token logo
    expect(screen.getByText(assetToken.required_token_logo)).toBeInTheDocument();
  });

  it('does not call the next prop function if there are validation errors', async () => {
    renderComponent();

    // Submit the form without filling any fields
    await act(() => fireEvent.submit(screen.getByText(assetToken.continue)));

    // Assert that the next prop function was not called
    expect(mockNextFunction).not.toHaveBeenCalled();
  });
});
