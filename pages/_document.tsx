import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/e-commerce/favicon.svg" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="description" content="Web site created using Next.js" />
                <link rel="manifest" href="/e-commerce/manifest.json" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
