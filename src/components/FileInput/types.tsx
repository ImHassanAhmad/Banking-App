import { type ChangeEvent } from 'react';

export interface FileInputProps {
  selectedFile: File | null;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  label?: string;
}

export interface FileDisplayProps {
  selectedFile: File | null;
}