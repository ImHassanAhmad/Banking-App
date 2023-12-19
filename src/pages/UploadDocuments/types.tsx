import { type ChangeEvent } from 'react';

export interface DocumentType {
  id: string;
  displayName: string;
  icon: string;
}

export interface FileInputProps {
  selectedFile: File | null;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
}

export interface FileDisplayProps {
  selectedFile: File | null;
}
