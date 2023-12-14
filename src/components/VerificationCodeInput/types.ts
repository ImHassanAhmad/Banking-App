export interface VerificationCodeInputProps {
  codeCharacterCount?: number;
  onCodeComplete: (code: string) => undefined;
  disabled?: boolean;
  isError?: boolean;
  onInputChange: () => undefined;
}
