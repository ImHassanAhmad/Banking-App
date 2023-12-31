import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, type RenderResult } from '@testing-library/react';
import { RouteNames } from '@app/constants/routes';
import { en } from '@app/i18n/translations';
import transformation from '@app/utils/LanguageTransformation';
import { Provider } from 'react-redux';
import { store } from '@app/store';
import BusinessDescription from './BusinessDescription';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.VERIFY_EMAIL);

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
        <BusinessDescription />
      </Router>
    </Provider>
  );

describe('EmailCodeVerification page', () => {
  it('matches snapshot', () => {
    const { asFragment } = rendersComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
