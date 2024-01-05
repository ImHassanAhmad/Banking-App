import * as yup from 'yup';

export const createFileSchema = (
  maxFileSize: number,
  allowedFormats: string[]
): yup.MixedSchema<unknown, yup.AnyObject, undefined, ''> => {
  return yup
    .mixed()
    .test('fileSize', 'The file is too large', (value) => {
      if (value instanceof File && value != null) {
        return value.size <= maxFileSize;
      }
      return true;
    })
    .test('fileType', 'Unsupported File Format', (value) => {
      if (value instanceof File) {
        return allowedFormats.some((format) => value.name.endsWith(format));
      }
      return true;
    })
    .test('file', 'File is required', (value) => value instanceof File && value != null)
    .required('File is required');
};
