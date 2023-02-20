import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="favicon.svg" />
                <meta name="theme-color" content="#000000" />
                <meta name="description" content="Web site created using create-react-app" />
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}