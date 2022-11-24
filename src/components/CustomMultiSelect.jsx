import { useFormContext } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';

import {
  FormHelperText,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  OutlinedInput,
} from '@mui/material';

// multi select configuration
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name = '', personName = [], theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export function CustomMultiSelect({
  propName,
  label,
  stateValue,
  handleFormState,
  optionList = [],
}) {
  const theme = useTheme();

  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <FormControl fullWidth error={!!errors[propName]}>
      <InputLabel id={`${propName}-multiple-name-label`}>{label}</InputLabel>
      <Select
        labelId={`${propName}-multiple-name-label`}
        id={`${propName}-multiple-name`}
        multiple
        value={stateValue}
        {...register(propName, {
          onChange: (e) => {
            handleFormState(e);
          },
        })}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
      >
        {optionList.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, stateValue, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
      {!!errors[propName] && (
        <FormHelperText>{errors[propName].message}</FormHelperText>
      )}
    </FormControl>
  );
}
