import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import Head from 'next/head';

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>Mapbox Location Selector</title>
        <meta name="description" content="Mapbox location selector example" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="View a ratings graph of your favourite TV shows"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
