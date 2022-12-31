import { Html, Head, Main, NextScript } from 'next/document'
import logo from '../assets/app-nlw-copa-preview.png';

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="shortcut icon" href="/favicon/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            <body className='bg-nlw-900 bg-app bg-no-repeat bg-cover'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )

}