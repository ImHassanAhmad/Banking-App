export interface VerificationCharacterInputProps {
  digit: string;
  isActive: boolean;
  onChange: (value: string) => void;
  readonly?: boolean;
  onBackSpace: () => void;
  isError?: boolean;
  index: number;
}
