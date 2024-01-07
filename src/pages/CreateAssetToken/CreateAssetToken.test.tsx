import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CreateAssetToken from './CreateAssetToken';
import { BrowserRouter as Router } from 'react-router-dom';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import { CreateAssetTokenFlowSteps } from './types';
import { Provider } from 'react-redux';
import { store } from '@app/store';
const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.CREATE_ASSET_TOKEN);
const assetToken = mockLanguage['create-asset-token'];

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));

const renderComponent = (): void => {
  render(
    <Provider store={store}>
      <Router>
        <CreateAssetToken />
      </Router>
    </Provider>
  );
};

const steps = Object.values(CreateAssetTokenFlowSteps);
describe('CreateAssetToken component', () => {
  it('renders without crashing', () => {
    renderComponent();
    expect(screen.getByText(assetToken.create_new_asset)).toBeInTheDocument();
  });
  it('displays correct heading', () => {
    renderComponent();
    expect(screen.getByText(assetToken.token_basic_info)).toBeInTheDocument();
  });
  it('updates the step when continue button is clicked', async () => {
    renderComponent();
    expect(screen.getByText(assetToken.token_basic_info)).toBeInTheDocument();
    await act(() => fireEvent.click(screen.getByText(assetToken.continue)));
    expect(screen.getByText(assetToken.token_config));
  });
  it('renders correct number of steps in the stepper', () => {
    renderComponent();
    const stepper = screen.getByTestId('asset-token-stepper'); // You might need to add a testID to the Stepper component for this test
    expect(stepper.children.length).toBe(steps.length * 2 - 1);
  });
  it('displays correct step content based on activeStepIndex', async () => {
    renderComponent();
    expect(screen.getByText(assetToken.token_basic_info)).toBeInTheDocument();
    await act(() => fireEvent.click(screen.getByText(assetToken.continue)));
    expect(screen.getByText(assetToken.token_config)).toBeInTheDocument();
  });
});
