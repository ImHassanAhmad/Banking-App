import { type CountrySelectOption } from '@app/types/types';
import type React from 'react';

export interface ModalWrapperProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactElement;
}

export interface NotSupportedModalProps {
  open: boolean;
  handleClose: () => void;
  country?: CountrySelectOption;
  mode: 'country' | 'phone-number';
}

export interface InfoModalProps {
  open: boolean;
  title: string;
  subtitle: string;
  buttonText: string;
  handleClose: () => void;
}

export interface ConfirmationModalProps {
  open: boolean;
  title: string;
  subtitle: string;
  leftButtonText: string;
  title2?: string;
  leftButtonOnclickHandler?: () => void;
  rightButtonText: string;
  rightButtonOnclickHandler?: () => void;
  handleClose: () => void;
}
export interface ErrorOrWarningModalProps {
  open: boolean;
  title?: string;
  message?: string;
  handleClose: () => void;
}

export interface PrivacyPolicyProps {
  open: boolean;
  handleClose: () => void;
}

export interface CommonProps {
  title: string;
  subtitle: string;
}
