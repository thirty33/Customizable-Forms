import { useFormContext, Controller } from 'react-hook-form';
import { GridWrapper } from '@containers/GridWrapper';

import {
  FormControlLabel,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
} from '@mui/material';

export function CustomRadioGroup({
  propName,
  label,
  stateValue,
  optionList = [],
}) {
  const {
    formState: { errors },
    register,
    control,
  } = useFormContext();

  return (
    <FormControl error={!!errors[propName]}>
      <FormLabel id="demo-controlled-radio-buttons-group">{label}</FormLabel>

      <Controller
        name="genre"
        control={control}
        rules={{ required: 'Please make a selection.' }}
        defaultValue={stateValue}
        render={({ field, fieldState }) => (
          <>
            <GridWrapper container>
              <RadioGroup {...field}>
                {optionList.map((item) => (
                  <GridWrapper item xs={12} key={item.label}>
                    <FormControlLabel
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                    />
                  </GridWrapper>
                ))}
              </RadioGroup>
            </GridWrapper>
          </>
        )}
      />
      {!!errors[propName] && (
        <FormHelperText>{errors[propName].message}</FormHelperText>
      )}
    </FormControl>
  );
}
