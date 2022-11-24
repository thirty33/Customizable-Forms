import Grid from '@mui/material/Grid';

export function GridWrapper({ children, ...props }) {
  return <Grid {...props}>{children}</Grid>;
}
