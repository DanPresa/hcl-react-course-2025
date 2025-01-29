import React from 'react';
import { FormControlLabel, Checkbox, Typography } from '@mui/material';
import { useField } from 'formik';

interface CustomCheckboxProps {
  name: string;
  label: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ name, label }) => {
  const [field, meta, helpers] = useField({ name, type: 'checkbox' }); // Ensure the `type` is set to "checkbox"

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            {...field} // Formik's field props (name, value, onChange, onBlur)
            checked={field.value} // Bind the checked state to Formik's value
            onChange={(event) => {
              helpers.setValue(event.target.checked); // Update Formik state on change
            }}
          />
        }
        label={label}
      />
      <div>
        {meta.touched && meta.error && (
          <Typography color="error" variant="caption">
            {meta.error}
          </Typography>
        )}
      </div>
    </>
  );
};

export default CustomCheckbox;
