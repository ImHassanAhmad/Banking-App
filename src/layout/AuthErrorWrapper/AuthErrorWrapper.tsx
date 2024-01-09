import React from 'react';
import ErrorOrWarningModal from '@app/components/Modals/ErrorOrWarningModal';
import { type FC, type PropsWithChildren } from 'react';
import { AuthErrorLevel } from '@app/types/types';
import { useAuthError } from '@app/context/AuthErrorContext';
import { type AuthErrorWrapperProps } from './types';

const AuthErrorWrapper: FC<PropsWithChildren<AuthErrorWrapperProps>> = ({
  children,
  activeStep,
  error
}) => {
  const { updateError } = useAuthError();

  return (
    <>
      {children}
      <ErrorOrWarningModal
        open={Boolean(error?.message && error?.errorLevel === AuthErrorLevel.System)}
        title={error?.title}
        message={error?.message}
        handleClose={() => {
          updateError(activeStep, undefined);
        }}
      />
    </>
  );
};

export default AuthErrorWrapper;
