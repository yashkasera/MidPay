import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#0084FF',
        },
        secondary: {
            main: '#D5E9FD',
        },
        tertiary: {
            main: "#4CAF50",
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#F7F8FA',
            paper: '#FFFFFF',
        },
        backgroundSecondary: '#D2E8FD',
    },
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif'
        ].join(','),
    },
});

export default theme;
