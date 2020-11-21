import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
      grey: '#eee',
    },
    background: {
      paper: '#fff',
      default: '#fafafa',
      main: '#f5f5f5',
    },
    primary: {
      light: '#ff8e8a',
      main: '#ff7d79',
      dark: '#ee5c68',
      contrastText: '#fff',
    },
    secondary: {
      light: '#8272a4',
      main: '#716193',
      dark: '#605082',
      contrastText: '#fff',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  },
} as ThemeOptions);

export default theme;
