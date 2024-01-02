import { type ChangeEvent } from 'react';

export interface FileInputProps {
  selectedFile: File | null | undefined;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  label?: string;
  required?: boolean;
  error?: string;
  ref?: any;
}

export interface FileDisplayProps {
  selectedFile: File | null | undefined;
}
