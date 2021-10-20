import { red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#DB597F',
        },
        secondary: {
            main: '#FFD868',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#1F1D2B',
            paper: '#382E4E',
        },
        backgroundSecondary: '#382E4E',
    },
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif'
        ].join(','),
    },
});

export default theme;
