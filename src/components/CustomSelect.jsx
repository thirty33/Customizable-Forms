import { useFormContext } from 'react-hook-form';

import {
  FormHelperText,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  OutlinedInput,
} from '@mui/material';

export function CustomSelect({
  propName,
  label,
  stateValue,
  handleFormState,
  optionList = [],
}) {
    
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <FormControl fullWidth error={!!errors[propName]}>
      <InputLabel id={`${propName}-select`}>{label}</InputLabel>
      <Select
        labelId={`${propName}-select`}
        id={`${propName}-simple-select`}
        value={stateValue}
        {...register(propName, {
          onChange: (e) => {
            handleFormState(e);
          },
        })}
        input={<OutlinedInput label="Name" />}
      >
        {optionList.map((item) => (
          <MenuItem value={item.value} key={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
      {!!errors[propName] && (
        <FormHelperText>{errors[propName].message}</FormHelperText>
      )}
    </FormControl>
  );
}
