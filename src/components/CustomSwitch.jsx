import { useFormContext } from 'react-hook-form';

import {
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Typography,
  Switch,
} from '@mui/material';

export function CustomSwitch({ propName, label, stateValue, handleFormState }) {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch inputProps={{ 'aria-label': 'controlled' }} />}
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
