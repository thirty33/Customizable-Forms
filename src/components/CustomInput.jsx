import { useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';

export function CustomInput({
  propName,
  label,
  stateValue,
  type = 'text',
  handleFormState,
  otherProps = {},
}) {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <TextField
      sx={{ marginBottom: 2 }}
      type={type}
      label={label}
      fullWidth
      required
      error={!!errors[propName]}
      helperText={errors[propName] ? errors[propName].message : ''}
      value={stateValue}
      {...register(propName, {
        onChange: (e) => {
          handleFormState(e);
        },
      })}
      {...otherProps}
    />
  );
}
