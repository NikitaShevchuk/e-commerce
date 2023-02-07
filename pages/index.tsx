import Header from "@/components/Header/Header";
import SaleBlock from "@/components/Header/SaleBlock";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <link rel="icon" href="favicon.svg" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta name="description" content="Web site created using create-react-app" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
                    rel="stylesheet"
                />
                <title>E-commerce</title>
            </Head>
            <main>
                <Header />
                <SaleBlock />
            </main>
        </>
    );
}
