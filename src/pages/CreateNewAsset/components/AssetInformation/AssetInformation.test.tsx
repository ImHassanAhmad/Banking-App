import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import AssetInformation from './AssetInformation';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.CREATE_NEW_ASSET);

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));

// Mock the useCreateNewAssetStepper hook
jest.mock('@app/context/CreateNewAssetStepperContext', () => ({
  useCreateNewAssetStepper: () => ({
    assetPayload: {},
    updateAssetPayload: jest.fn(),
    updateActiveStep: jest.fn()
  })
}));

// Mock the useCreateAssetMutation hook
jest.mock('@app/store/api/asset', () => ({
  useCreateAssetMutation: () => [
    jest.fn().mockResolvedValue({ assetId: '123' }),
    { isLoading: false }
  ]
}));

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn();

describe('AssetInformation Component', () => {
  test('renders AssetInformation component with form fields', () => {
    render(<AssetInformation />);

    // Add assertions to check if form fields are present
    expect(screen.getByLabelText(/asset short name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/asset description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/asset website \(optional\)/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled();
  });

  test('submits the form with valid data', async () => {
    render(<AssetInformation />);

    // Simulate form field inputs and form submission
    fireEvent.input(screen.getByLabelText(/asset short name/i), {
      target: { value: 'Test Asset' }
    });
    fireEvent.input(screen.getByLabelText(/asset description/i), {
      target: { value: 'Test Description' }
    });
    fireEvent.input(screen.getByLabelText(/asset website \(optional\)/i), {
      target: { value: 'https://test.com' }
    });

    // Simulate file upload
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('asset logo'); // replace with the correct label text
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    const mockCreateObjectURL = jest.spyOn(URL, 'createObjectURL');
    mockCreateObjectURL.mockImplementation(() => 'mock object url');

    await waitFor(() => {
      // Add assertions to check if form submission is handled correctly
      expect(screen.getByLabelText(/asset short name/i)).toHaveValue('Test Asset');
      expect(screen.getByLabelText(/asset description/i)).toHaveValue('Test Description');
      expect(screen.getByLabelText(/asset website \(optional\)/i)).toHaveValue('https://test.com');
      // @ts-expect-error ts-ignore
      expect(fileInput.files[0]).toBe(file);
      expect(mockCreateObjectURL).toHaveBeenCalledWith(file);
    });

    // Restore the original implementation of URL.createObjectURL
    mockCreateObjectURL.mockRestore();
  });

  test('submits the form with invalid data', async () => {
    render(<AssetInformation />);

    // Simulate form field inputs and form submission
    fireEvent.input(screen.getByLabelText(/asset short name/i), {
      target: { value: '' }
    });
    fireEvent.input(screen.getByLabelText(/asset description/i), {
      target: { value: 'Test Description' }
    });
    fireEvent.input(screen.getByLabelText(/asset website \(optional\)/i), {
      target: { value: '' }
    });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      // Add assertions to check if form validation errors are displayed
      expect(screen.getByLabelText(/asset short name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/asset description/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/asset website \(optional\)/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled();
    });
  });

  test('displays validation errors when form fields are blurred', async () => {
    render(<AssetInformation />);

    // Simulate blur event on the form fields
    fireEvent.blur(screen.getByLabelText(/asset short name/i));
    fireEvent.blur(screen.getByLabelText(/asset description/i));
    fireEvent.blur(screen.getByLabelText(/asset website \(optional\)/i));

    await waitFor(() => {
      // Add assertions to check if validation error messages are displayed
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Description is required')).toBeInTheDocument();
      // expect(screen.getByText('Website is required')).toBeInTheDocument();
    });
  });

  test('handles form submission when isLoading is true', async () => {
    jest.mock('@app/store/api/asset', () => ({
      useCreateAssetMutation: () => [jest.fn(), { isLoading: true }]
    }));

    render(<AssetInformation />);

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Since isLoading is true, the button should be disabled, and the form submission should not occur
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled();
    });
  });
});
