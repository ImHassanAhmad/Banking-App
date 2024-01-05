import { render, screen } from '@testing-library/react';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import CreateNewAsset from './CreateNewAsset';
import { stepsExcludingSuccess } from './types';

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
const mockGoBack = jest.fn();
jest.mock('@app/context/CreateNewAssetStepperContext', () => {
  return {
    useCreateNewAssetStepper: () => ({
      goBack: mockGoBack
    })
  };
});

// Mock the useNavigate hook from 'react-router-dom'
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('CreateNewAsset', () => {
  beforeEach(() => {
    render(<CreateNewAsset />);
  });

  test('renders correctly', () => {
    expect(screen.getByText(translation.create_new_asset)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();
    Object.values(stepsExcludingSuccess).forEach((step) => {
      expect(screen.getByText(translation[`${step}`])).toBeInTheDocument();
    });
  });
});
