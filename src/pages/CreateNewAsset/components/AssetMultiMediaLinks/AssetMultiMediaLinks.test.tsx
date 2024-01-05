import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import AssetMultiMediaLinks from './AssetMultiMediaLinks';
import { SocialMediaLinks } from '../../types';

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

// Mock the useAddSocialMediaLinksMutation hook
jest.mock('@app/store/api/asset', () => ({
  useAddSocialMediaLinksMutation: () => [
    jest.fn().mockResolvedValue({ assetId: '123' }),
    { isLoading: false }
  ]
}));

describe('AssetMultiMediaLinks Component', () => {
  test('renders AssetMultiMediaLinks component with form fields', () => {
    render(<AssetMultiMediaLinks />);

    // Add assertions to check if form fields are present
    Object.values(SocialMediaLinks).forEach((link) => {
      expect(screen.getByLabelText(new RegExp(link, 'i'))).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    render(<AssetMultiMediaLinks />);

    // Simulate form field inputs and form submission
    Object.values(SocialMediaLinks).forEach((link) => {
      fireEvent.input(screen.getByLabelText(new RegExp(link, 'i')), {
        target: { value: `https://${link}.com` }
      });
    });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      // Add assertions to check if form submission is handled correctly
      Object.values(SocialMediaLinks).forEach((link) => {
        expect(screen.getByLabelText(new RegExp(link, 'i'))).toHaveValue(`https://${link}.com`);
      });
      expect(screen.getByRole('button', { name: /continue/i })).toBeEnabled();
    });
  });
  test('displays validation errors when form fields are blurred', async () => {
    render(<AssetMultiMediaLinks />);

    // Simulate blur event on the form fields
    Object.values(SocialMediaLinks).forEach((link) => {
      fireEvent.blur(screen.getByLabelText(new RegExp(link, 'i')));
    });

    await waitFor(() => {
      // Add assertions to check if validation error messages are displayed
      Object.values(SocialMediaLinks).forEach((link) => {
        expect(screen.getByText(`${link} is a required field`)).toBeInTheDocument();
      });
    });
  });

  test('disables the continue button when form fields are not valid', async () => {
    render(<AssetMultiMediaLinks />);

    // Simulate form field inputs with invalid data
    Object.values(SocialMediaLinks).forEach((link) => {
      fireEvent.input(screen.getByLabelText(new RegExp(link, 'i')), {
        target: { value: 'invalid url' }
      });
    });

    // The continue button should be disabled because the form fields are not valid
    expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled();
  });
});
