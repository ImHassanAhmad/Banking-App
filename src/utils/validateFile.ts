import { checkFileSize } from './fileSize';

const supportedExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];

export const validateFile = async (
  value: File,
  fieldName: string,
  fileSize: number
): Promise<boolean> => {
  if (!value) return true;

  const fileName = value.name;
  const fileExtension = fileName.split('.').pop() ?? '';

  const isValidFileType = supportedExtensions.includes(fileExtension?.toLowerCase());

  const isValidFileSize = checkFileSize(value, fileSize);

  if (!isValidFileType) {
    return false;
  }

  if (!isValidFileSize) {
    return false;
  }

  return true;
};
