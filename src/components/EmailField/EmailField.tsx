import { type FC } from 'react';
import TextField from '@app/components/Textfield';
import { type TextFieldProps } from '@mui/material/TextField';
import { type ITextFieldProps } from '@app/types/types';

const EmailField: FC<ITextFieldProps & TextFieldProps> = ({
  register,
  label,
  name,
  error,
  ...rest
}) => {
  return (
    <TextField
      type="email"
      data-testid="email-input"
      label={label}
      name={name}
      register={register}
      {...rest}
    />
  );
};

export default EmailField;
