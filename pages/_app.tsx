import Header from "@/components/Header/Header";
import SaleBlock from "@/components/Header/SaleBlock";
import { wrapper } from "@/store/store";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { SkeletonTheme } from "react-loading-skeleton";
import { Provider } from "react-redux";

// styles
import "@/styles/globals.css";
import "@/styles/index.css";
import "react-loading-skeleton/dist/skeleton.css";

export default function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <SkeletonTheme baseColor="#c1c1c1" highlightColor="#dcdcdc">
                    <div id="root">
                        <Header />
                        <SaleBlock />
                        <Component {...props.pageProps} />
                    </div>
                </SkeletonTheme>
            </ThemeProvider>
        </Provider>
    );
}
