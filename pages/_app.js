import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Head from 'next/head';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
