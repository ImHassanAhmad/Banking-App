import TextField, { type TextFieldProps } from '@mui/material/TextField';
import React from 'react';
import { type ITextFieldProps } from '@app/types/types';

const TextFieldComp: React.FC<ITextFieldProps & TextFieldProps> = ({
  register,
  name,
  errorValue,
  ...rest
}) => {
  const registerProps = register && name ? { ...register(name) } : {};
  return (
    <TextField
      error={Boolean(errorValue)}
      id={name}
      name={name}
      helperText={String(errorValue?.message ?? '')}
      {...registerProps}
      {...rest}
    />
  );
};

export default TextFieldComp;

/*
=============USAGE EXAMPLE=============
import Textfield from '@app/components/Textfield';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@mui/base';

interface IForm {
  username: string;
}

const schema = yup
  .object()
  .shape({
    username: yup.string().min(10).required()
  })
  .required();

const {
  register,
  handleSubmit,
  formState: { errors }
} = useForm<IForm>({
  defaultValues: {
    username: ''
  },
  mode: 'onBlur',
  resolver: yupResolver(schema)
});

const onSubmit: SubmitHandler<IForm> = (data) => {};

retrun(
  <form
    onSubmit={(event) => {
      void handleSubmit(onSubmit)(event);
    }}>
    <Textfield register={register} name={'username'} errorValue={errors?.username} />
    <Button type="submit">Submit</Button>
  </form>
);
======================================
*/
