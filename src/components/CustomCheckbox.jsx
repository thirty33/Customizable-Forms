import { useFormContext } from 'react-hook-form';

import {
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Typography,
  Checkbox,
} from '@mui/material';

export function CustomCheckbox({
  propName,
  label,
  stateValue,
  handleFormState,
}) {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox required />}
        checked={stateValue}
        {...register(propName, {
          onChange: (e) => {
            handleFormState(e, 'checked');
          },
        })}
        label={
          <Typography color={errors[propName] ? 'error' : 'inherit'}>
            {label}
          </Typography>
        }
      />
      <FormHelperText error={!!errors[propName]}>
        {errors[propName] ? errors[propName].message : ''}
      </FormHelperText>
    </FormGroup>
  );
}
