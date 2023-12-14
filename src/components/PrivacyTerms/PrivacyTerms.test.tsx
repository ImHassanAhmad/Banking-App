import React from 'react';
import { type RenderResult, fireEvent, render, waitFor } from '@testing-library/react';
import PrivacyTerms from './PrivacyTerms'; // Replace with your component import
import { en } from '@app/i18n/translations';
import transformation from '@app/utils/LanguageTransformation';
import { ModalNames } from '@app/constants/modals';

const mockLanguage = en;
const mockModalNames = ModalNames;
const mockTransformation = transformation(mockLanguage, mockModalNames.PRIVACY_POLICY);

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

describe('PrivacyTerms', () => {
  const initialRender = (): RenderResult => render(<PrivacyTerms />);
  it('renders the privacyterms component', () => {
    const { getByTestId } = initialRender();

    // Use screen to query for elements by text, label, or role.
    const compWrapper = getByTestId('privacy-terms');
    expect(compWrapper).toBeInTheDocument();
  });

  test('component that opens modal', async () => {
    const { getByTestId, queryByTestId } = initialRender();
    const privateLinkText = getByTestId('privacy-terms');
    const modal = queryByTestId('modal');
    expect(modal).not.toBeInTheDocument();
    fireEvent.click(privateLinkText);
    await waitFor(() => {
      expect(modal);
    });
  });
});
