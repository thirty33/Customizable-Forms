import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { Stack } from '@mui/system';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import {
  Typography,
  IconButton,
} from '@mui/material';

export function CustomFileInput({ propName }) {
  const [file, setFile] = useState({});

  // files managment
  const previewImage = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <Stack direction="row" sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton variant="contained" component="label" size="large">
        <UploadFileIcon></UploadFileIcon>
        <input
          type="file"
          hidden
          {...register(propName, {
            onChange: (e) => {
              previewImage(e);
            },
          })}
        />
      </IconButton>
      <Typography color={errors[propName] ? 'error' : 'inherit'}>
        {errors[propName] ? errors[propName].message : file?.name || 'file.ext'}
      </Typography>
    </Stack>
  );
}
