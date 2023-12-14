export interface EmailCodeVerificationProps {
  email: string;
  isInvalid: boolean;
  codeSent: boolean;
  onCodeComplete: (code: string) => undefined;
  onResendVerification: () => undefined;
  onCountDownComplete?: () => undefined;
  onBackButtonClick?: () => void;
}
