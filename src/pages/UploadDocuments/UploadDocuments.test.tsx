import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UploadDocuments from './UploadDocuments';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.UPLOAD_DOCUMENTS);

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));

describe('UploadDocument Component', () => {
  const mockProps = {
    updateActiveStep: jest.fn(),
    registerUser: jest.fn(),
    isLoading: false,
    userPayload: {}
  };

  test('renders UploadDocument component with form fields', () => {
    render(<UploadDocuments {...mockProps} />);
    expect(screen.getByText(/upload documents/i)).toBeInTheDocument();
    expect(screen.getByText(/select your document type ?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /choose file/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  test('uploads a file and continues', async () => {
    render(<UploadDocuments {...mockProps} />);

    // Select a file
    const fileInput = screen.getByTestId('selector-content-input');
    fireEvent.change(fileInput, { target: { files: [new File(['file content'], 'example.txt')] } });

    // Click the continue button
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(mockProps.updateActiveStep).toHaveBeenCalled();
    });
  });

  test('handles form submission when isLoading is true', () => {
    const isLoadingProps = { ...mockProps, isLoading: true };
    render(<UploadDocuments {...isLoadingProps} />);

    // Click the continue button
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Since isLoading is true, the button should be disabled, and the form submission should not occur

    expect(mockProps.updateActiveStep).not.toHaveBeenCalled();
  });
});
