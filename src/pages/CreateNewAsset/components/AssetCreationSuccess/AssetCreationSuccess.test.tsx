import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import AssetCreationSuccess from './AssetCreationSuccess';
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

describe('AssetCreationSuccess', () => {
  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <AssetCreationSuccess />
      </MemoryRouter>
    );

    // Add assertions to check if the component renders correctly
    expect(screen.getByText(translation.asset_creation_success)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back to home/i })).toBeInTheDocument();
  });

  test('navigates back to home page when back to home button is clicked', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/asset-creation-success']}>
        <AssetCreationSuccess />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Back to home/i }));

    // Add assertion to check if the user is navigated back to home page
    expect(container.innerHTML).toContain('/');
  });
});
