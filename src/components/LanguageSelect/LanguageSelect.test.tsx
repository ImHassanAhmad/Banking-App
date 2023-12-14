import React from 'react';
import { render, screen } from '@testing-library/react';
import LanguageSelect from './LanguageSelect'; // Replace with your component import

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
      changeLanguage: jest.fn()
    }
  })
}));

describe('LanguageSelect', () => {
  it('renders the Select component', () => {
    render(<LanguageSelect />);

    // Use screen to query for elements by text, label, or role.
    const selectElement = screen.getByTestId('lng-selector');
    expect(selectElement).toBeInTheDocument();
  });

  // TODO need to write test cases in the next sprint
});
