import Header from "@/components/Header/Header";
import SaleBlock from "@/components/Header/SaleBlock";
import { setupStore } from "@/store/store";
import "@/styles/globals.css";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

const store = setupStore();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <div id="root">
                    <Header />
                    <SaleBlock />
                    <Component {...pageProps} />
                </div>
            </ThemeProvider>
        </Provider>
    );
}
