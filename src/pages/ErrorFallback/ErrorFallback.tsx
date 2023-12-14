import React from 'react';
import type { FallbackProps } from 'react-error-boundary';
import type { FCC } from '@app/types/fc';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ERROR_IMAGE } from '@app/assets/images';
import './ErrorFallback.scss';

const ErrorFallback: FCC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();

  const refresh = (): void => {
    resetErrorBoundary();
    navigate('/');
  };

  return (
    <div className="Error-layout">
      <section>
        <div>
          <Typography variant="h1" sx={{ mb: 2 }}>
            Oops...
          </Typography>
          <Typography variant="h4" sx={{ mb: 2 }}>
            An unexpected error occured.
          </Typography>
          <Typography variant="body1" sx={{ mb: 7 }}>
            We’re sorry for any inconveinience caused. If you keep experiencing this issue then
            please let us know.
          </Typography>
          <Button variant="contained" onClick={refresh}>
            Return to the homepage
          </Button>
        </div>
        <img src={ERROR_IMAGE} alt="Unknown error occured" />
      </section>
      <footer>
        <Typography variant="subtitle2">Error message</Typography>
        <pre>
          <code>
            {error.name}: {error.message}
          </code>
        </pre>
        {error.stack && (
          <>
            <Typography variant="subtitle2">Stack trace</Typography>
            <pre>
              <code>{JSON.stringify(error.stack)}</code>
            </pre>
          </>
        )}
      </footer>
    </div>
  );
};

export default ErrorFallback;
