import { Theme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface CustomTheme extends Theme {
        palette: {
            type: "light";
            primary: {
                main: string;
            };
            secondary: {
                main: string;
            };
            text: {
                primary: string;
                secondary: string;
                disabled: string;
                hint: string;
            };
            background: {
                paper: string;
            };
        };
        typography: {
            fontFamily: string;
            htmlFontSize: number;
        };
    }
    // allow configuration using `createTheme`
    interface CustomThemeOptions extends ThemeOptions {
        palette?: {
            type?: "light";
            primary?: {
                main?: string;
            };
            secondary?: {
                main?: string;
            };
            text?: {
                primary?: string;
                secondary?: string;
                disabled?: string;
                hint?: string;
            };
            background?: {
                paper?: string;
            };
        };
        typography?: {
            fontFamily?: string;
            htmlFontSize?: number;
        };
    }
    export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
