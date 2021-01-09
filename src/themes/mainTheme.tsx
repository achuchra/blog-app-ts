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
      light: '#0843a1',
      main: '#052d6b',
      dark: '#041c42',
      contrastText: '#fff',
    },
    secondary: {
      light: '#faf6eb',
      main: '#e3dfd3',
      dark: '#b5b1a5',
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
  spacing: 10,
} as ThemeOptions);

export default theme;
