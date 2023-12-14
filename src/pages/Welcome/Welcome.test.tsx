import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import Welcome from './Welcome';
import { RouteNames } from '@app/constants/routes';
import { en } from '@app/i18n/translations';
import transformation from '@app/utils/LanguageTransformation';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.WELCOME);

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
    <Router>
      <Welcome />
    </Router>
  );
  const selectElement = screen.getByTestId('welcome-screen-wrapper');
  expect(selectElement).toBeInTheDocument();
});
