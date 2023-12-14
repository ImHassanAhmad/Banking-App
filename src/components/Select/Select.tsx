import { FormControl, FormHelperText, Select } from '@mui/material';
import React, { type ReactNode } from 'react';
import type { FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';

interface ISelectProps {
  register: UseFormRegister<any>;
  name: string;
  children: ReactNode;
  fullWidth?: boolean;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const SelectComp: React.FC<ISelectProps> = ({
  register,
  name,
  children,
  fullWidth,
  error,
  ...rest
}) => {
  return (
    <FormControl fullWidth={fullWidth} error={Boolean(error)}>
      <Select {...register(name)} {...rest}>
        {children}
      </Select>
      <FormHelperText>{String(error?.message ?? '')}</FormHelperText>
    </FormControl>
  );
};

export default SelectComp;

/*
=============USAGE EXAMPLE=============
import Select from '@app/components/Select';
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
    country: yup.string().required()
  })
  .required();

const {
  register,
  handleSubmit,
  formState: { errors }
} = useForm<IForm>({
  defaultValues: {
    country: ''
  },
  resolver: yupResolver(schema)
});

const onSubmit: SubmitHandler<IForm> = (data) => {};

retrun(
  <form
    onSubmit={(event) => {
      event.preventDefault();
      void handleSubmit(onSubmit)(event);
    }}>
     <Select
       register={register}
       name="country"
       error={errors?.country}>
         <MenuItem key={key} value={key}>
           Item
         </MenuItem>
     </Select>
    <Button type="submit">Submit</Button>
  </form>
);
======================================
*/
