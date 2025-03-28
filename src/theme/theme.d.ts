import '@emotion/react';
import '@mui/material/styles';
import { Theme as MuiTheme } from '@mui/material/styles';

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {
    spacing(value: number): number;
    shape: {
      borderRadius: number;
    };
  }
}

declare module '@mui/material/styles' {
  interface Theme extends MuiTheme {
    status?: {
      danger?: string;
    };
    spacing(value: number): number;
    shape: {
      borderRadius: number;
    };
  }
  interface ThemeOptions extends Partial<Theme> {
    status?: {
      danger?: string;
    };
  }
}