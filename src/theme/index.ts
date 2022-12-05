import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#181818',
        },
        secondary: {
            main: '#fff',
        },
        text: {
            primary: '#181818',
            secondary: '#fff',
            disabled: '#999'
        },
        background: {
            paper: '#f4f3f3',
        },
    },
    typography: {
        fontFamily: 'Space Mono',
        htmlFontSize: 14,
        fontSize: 14,
        h3: {
            fontWeight: 700,
            fontSize: 14,
            textAlign: 'left'
        },
        h4: {
            fontWeight: 700,
            fontSize: 26,
            textAlign: 'left',
        },
        h5: {
            fontWeight: 700,
            fontSize: 40,
            color: 'white'
        },
        caption: {
            fontWeight: 300,
            fontSize: 14,
            textAlign: 'left'
        }
    },
    shape: {
        borderRadius: 0
    }
});

export default theme;