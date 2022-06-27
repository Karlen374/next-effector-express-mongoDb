import type { AlertColor } from '@mui/material';

export interface AlertWarningProps {
  severity: AlertColor;
  variant: 'standard' | 'filled' | 'outlined';
  text: string;
}
