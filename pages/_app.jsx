import '../styles/globals.css';
// import '../styles/styles.css';
// import Dummy from '../components/dummy';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Dummy /> */}
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
