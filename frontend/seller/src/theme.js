import {red} from '@mui/material/colors';
import {adaptV4Theme, createTheme} from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme(adaptV4Theme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#DB597F',
        },
        secondary: {
            main: '#FFD868',
        },
        error: {
            main: red["400"],
            secondary:'#F66060',
        },
        background: {
            default: '#1F1D2B',
            paper: '#382E4E',
        },
        highlightColor: 'rgba(184,158,213,0.25)',
        elevatedPaper: '#4F4062'

    },
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif'
        ].join(','),
    },
}));

export default theme;
