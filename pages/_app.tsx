import Header from "@/components/Header/Header";
import SaleBlock from "@/components/Header/SaleBlock";
import { wrapper } from "@/store/store";
import "@/styles/globals.css";
import "@/styles/index.css";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <div id="root">
                    <Header />
                    <SaleBlock />
                    <Component {...props.pageProps} />
                </div>
            </ThemeProvider>
        </Provider>
    );
}
