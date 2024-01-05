import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import AssetDocuments from './AssetDocuments';
import { Documents } from '../../types';

const translation = en[RouteNames.CREATE_NEW_ASSET];
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

// Mock the useUploadAssetLegalDocumentsMutation hook
jest.mock('@app/store/api/asset', () => ({
  useUploadAssetLegalDocumentsMutation: () => [
    jest.fn().mockResolvedValue({ assetId: '123' }),
    { isLoading: false }
  ]
}));

describe('AssetDocuments', () => {
  test('renders correctly', () => {
    render(<AssetDocuments />);

    // Add assertions to check if the component renders correctly
    Object.values(Documents).forEach((doc) => {
      expect(screen.getByText(translation[`${doc}`])).toBeInTheDocument();
    });
  });

  test('submits the form with valid data', async () => {
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    render(<AssetDocuments />);

    // Simulate form field inputs and form submission
    Object.values(Documents).forEach((doc) => {
      const input = screen.getByTestId(doc);
      fireEvent.change(input, {
        target: { files: [file] }
      });
    });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      // Add assertions to check if form submission is handled correctly
      Object.values(Documents).forEach((doc) => {
        const input = screen.getByTestId(doc);
        // @ts-expect-errorts-ignore
        expect(input.files[0].name).toBe(file.name);
      });
      expect(screen.getByRole('button', { name: /continue/i })).toBeEnabled();
    });
  });
});
