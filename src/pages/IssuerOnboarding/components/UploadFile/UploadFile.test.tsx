import { fireEvent, render, screen } from '@testing-library/react';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import UploadFile from './UploadFile';
import { Provider } from 'react-redux';
import { store } from '@app/store';
import { MemoryRouter as Router } from 'react-router-dom'; // Use MemoryRouter or BrowserRouter based on your needs
import type { PropsWithChildren, ReactNode } from 'react';
import { act } from 'react-dom/test-utils';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.ISSUER_ONBOARDING);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));

const mockNavigate = jest.fn(); // Mock the navigate function

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const wrapper = ({ children }: PropsWithChildren): ReactNode => (
  <Provider store={store}>
    <Router initialEntries={['/issuer-onboarding']} initialIndex={0}>
      {children}
    </Router>
  </Provider>
);

describe('UploadFile Component', () => {
  const mockProps = {
    name: 'passport',
    setter: jest.fn(),
    error: false
  };

  const errorMockProps = {
    name: 'passport',
    setter: jest.fn(),
    error: true
  };

  it('renders UploadFile component without crashing', () => {
    render(<UploadFile {...mockProps} />, { wrapper });
    expect(screen.getByTestId('upload-file')).toBeInTheDocument();
  });

  it('render field', () => {
    render(<UploadFile {...mockProps} />, { wrapper });
    expect(screen.getByTestId('upload-file-button')).toBeInTheDocument();
    expect(screen.getByText('Select File')).toBeInTheDocument();
  });

  it('select file', async () => {
    render(<UploadFile {...mockProps} />, { wrapper });
    const passportfield: HTMLInputElement = screen.getByTestId('upload-file-button');

    act(() => {
      const passportfile = new File(['dummy content'], 'passport.png', { type: 'image/png' });
      Object.defineProperty(passportfield, 'files', {
        value: [passportfile]
      });
      fireEvent.change(passportfield);
    });

    // Check if the input value has been updated
    expect(passportfield.value).not.toBeNull();
  });

  it('empty file', async () => {
    render(<UploadFile {...errorMockProps} />, { wrapper });

    expect(screen.getByText('Required File')).toBeInTheDocument();
  });
});
