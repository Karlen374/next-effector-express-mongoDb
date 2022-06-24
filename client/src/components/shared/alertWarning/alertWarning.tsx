import Alert from '@mui/material/Alert';
import { AlertWarningProps } from './alertWarning.interface';

const AlertWarning = ({ severity, variant, text }:AlertWarningProps) => {
  return (
    <Alert severity={severity} variant={variant}>{text}</Alert>
  );
};
export default AlertWarning;
