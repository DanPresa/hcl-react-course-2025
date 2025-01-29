import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';

type CustomTextFieldProps = {
  name: string;
} & TextFieldProps;

const CustomTextField: React.FC<CustomTextFieldProps> = (props) => {
  const [field, meta] = useField(props.name); // Connect to Formik using `useField`

  return (
    <TextField
      {...field} // Spread Formik's field props (name, value, onChange, onBlur)
      {...props} // Spread any additional props (like `label`, `variant`, etc.)
      error={meta.touched && Boolean(meta.error)} // Show error state
      helperText={meta.touched && meta.error} // Show error message
    />
  );
};

export default CustomTextField;
