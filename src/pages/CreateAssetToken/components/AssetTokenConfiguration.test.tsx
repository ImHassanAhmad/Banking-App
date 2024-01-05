import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import AssetTokenConfigurations from './AssetTokenConfiguration'; // Update the path if necessary
import { Provider } from 'react-redux';
import { store } from '@app/store';
import { type ITokenConfigurationForm } from '../types';
import { useAppSelector } from '@app/store/hooks';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.CREATE_ASSET_TOKEN);
const assetToken = mockLanguage['create-asset-token'];

// Mock the useDispatch and useSelector hooks
jest.mock('@app/store/hooks', () => ({
  useAppSelector: jest.fn()
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key] // Mock translation function to return the key itself for testing
  })
}));
describe('AssetTokenConfigurations Component', () => {
  const mockNextFunction = jest.fn();
  const mockBackFunction = jest.fn();
  const expectedFormData: ITokenConfigurationForm = {
    pausable: true,
    mintable: true,
    burnable: false,
    capped: false
  };
  beforeEach(() => {
    // Mock the Redux state
    (useAppSelector as jest.Mock).mockReturnValue({
      createAssetToken: {
        tokenConfig: expectedFormData
      }
    });
  });

  const renderComponent = (): void => {
    render(
      <Provider store={store}>
        <AssetTokenConfigurations next={mockNextFunction} back={mockBackFunction} />
      </Provider>
    );
  };
  it('should render all four configuration options', () => {
    renderComponent();

    expect(screen.getByText(`Ability to ${assetToken.token_config_pausable}`)).toBeInTheDocument();
    expect(screen.getByText(`Ability to ${assetToken.token_config_mint}`)).toBeInTheDocument();
    expect(screen.getByText(`Ability to ${assetToken.token_config_burn}`)).toBeInTheDocument();
    expect(screen.getByText(`Ability to ${assetToken.token_config_capped}`)).toBeInTheDocument();
  });

  it('should have the first two options (pausable and mintable) as true by default', () => {
    renderComponent();

    const pausableCheckbox: any = screen.getByTestId(
      `Ability to ${assetToken.token_config_pausable}`
    );
    const mintableCheckbox: any = screen.getByTestId(`Ability to ${assetToken.token_config_mint}`);

    expect(pausableCheckbox.querySelector('input').checked).toBeTruthy();
    expect(mintableCheckbox.querySelector('input').checked).toBeTruthy();
  });
  it('should toggle checkbox when clicked', async () => {
    renderComponent();
    const burnableCheckbox = screen.getByText(`Ability to ${assetToken.token_config_burn}`);
    await act(() => fireEvent.click(burnableCheckbox));

    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);

    expect(mockNextFunction).toHaveBeenCalledWith({ ...expectedFormData, burnable: true });
  });
});
