import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, type RenderResult, screen } from '@testing-library/react';
import { RouteNames } from '@app/constants/routes';
import { en } from '@app/i18n/translations';
import transformation from '@app/utils/LanguageTransformation';
import MobileCodeVerification from './MobileCodeVerification';
import { Provider } from 'react-redux';
import { store } from '@app/store';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.VERIFY_MOBILE);

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key],
    i18n: {
      language: 'en',
      changeLanguage: jest.fn()
    }
  })
}));

const rendersComponent = (): RenderResult =>
  render(
    <Provider store={store}>
      <Router>
        <MobileCodeVerification />
      </Router>
    </Provider>
  );

describe('MobileCodeVerification page', () => {
  it('matches snapshot', () => {
    const { asFragment } = rendersComponent();
    expect(asFragment()).toMatchSnapshot();
  });
  it('contains the verification input box', () => {
    rendersComponent();
    expect(screen.getByTestId('verification-character-0')).toBeInTheDocument();
    expect(screen.getByTestId('verification-character-1')).toBeInTheDocument();
    expect(screen.getByTestId('verification-character-2')).toBeInTheDocument();
    expect(screen.getByTestId('verification-character-3')).toBeInTheDocument();
    expect(screen.getByTestId('verification-character-4')).toBeInTheDocument();
    expect(screen.getByTestId('verification-character-5')).toBeInTheDocument();
  });
});
