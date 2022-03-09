import { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';

import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Head from 'next/head';

import Progress from '../components/progress';
import { useProgressStore } from '../store';

function MyApp({ Component, pageProps }) {
  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);
  const isAnimating = useProgressStore((state) => state.isAnimating);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };
    const handleStop = () => {
      setIsAnimating(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Progress isAnimating={isAnimating} />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
