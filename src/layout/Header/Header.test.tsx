import { render, screen } from '@testing-library/react';
import Header from './Header';
import { BrowserRouter as Router } from 'react-router-dom';
import { en } from '@app/i18n/translations';
import transformation from '@app/utils/LanguageTransformation';
import { RouteNames } from '@app/constants/routes';
import { Provider } from 'react-redux';
import { store } from '@app/store';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.LOGIN);

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

test('ensure renders', () => {
  render(
    <Provider store={store}>
      <Router>
        <Header />
      </Router>
    </Provider>
  );
  const selectElement = screen.getByTestId('header-wrapper');
  expect(selectElement).toBeInTheDocument();
});
