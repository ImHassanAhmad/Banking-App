export enum VerificationType {
  mobile,
  email
}

export interface CodeVerificationProps {
  title: string;
  subtitle: string;
  codeSent?: boolean;
  disabled?: boolean;
  isError?: boolean;
  onCodeComplete: (code: string) => undefined;
  onCountDownComplete?: () => undefined;
  onBackButtonClick?: () => void;
}

export interface CountDownTimeProps {
  seconds?: number;
  countDownComplete: () => undefined;
}
