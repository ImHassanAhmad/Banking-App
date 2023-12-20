import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './pages/ErrorFallback/ErrorFallback';
import { BrowserRouter } from 'react-router-dom';
import { getTheme } from './theme/mui';
import './App.scss';
// Need this here so it can be bundled
import './i18n';
import AppRoutes from './routes/AppRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { LoginStepperProvider } from './context/LoginStepperContext';
import { AuthErrorProvider } from './context/AuthErrorContext';
import { useAppSelector } from './store/hooks';
import { Provider } from 'react-redux';
import { store } from './store';
import { IssuerSignUpStepperProvider } from './context/IssuerSignUpStepperContext';
import { InvestorSignUpStepperProvider } from './context/InvestorSignUpStepperContext';
const App: React.FC = () => {
  const { themeMode } = useAppSelector((state) => state.userData);
  const theme = React.useMemo(() => getTheme(themeMode), [themeMode]);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <ToastContainer autoClose={3000} className="custom-toast" />
          <ThemeProvider theme={theme}>
            <AuthErrorProvider>
              <IssuerSignUpStepperProvider>
                <InvestorSignUpStepperProvider>
                  <LoginStepperProvider>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                      <AppRoutes />
                    </ErrorBoundary>
                  </LoginStepperProvider>
                </InvestorSignUpStepperProvider>
              </IssuerSignUpStepperProvider>
            </AuthErrorProvider>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
