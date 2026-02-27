import { createTheme } from '@mui/material/styles'

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2F5AF3',
      dark: '#133C95',
      light: '#638DFD',
    },
    secondary: {
      main: '#4C6FFF',
    },
    background: {
      default: '#F5F7FC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#101828',
      secondary: '#475467',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontSize: '2.25rem',
      letterSpacing: '-0.02em',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.75rem',
      letterSpacing: '-0.01em',
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 10,
          minHeight: 44,
          paddingInline: 20,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
      },
    },
  },
})
