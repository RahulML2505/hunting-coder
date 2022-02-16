import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
// import Script from 'next/script';
import styles from '../styles/Home.module.css';
// import styles1 from '../styles/Home1.module.css';
// import styles2 from '../styles/Home2.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hunting Coders</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="keywords" content="nextjs, hunting coder, hunting coder blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Script src="/sc.js" strategy="lazyOnload"></Script> */}

      <nav className={styles['main-nav']}>
        <ul>
          <Link href='/'><li className={styles.link} >Home</li></Link>
          <Link href='/about'><li className={styles.link} >About</li></Link>
          <Link href='/blog'><li className={styles.link} >Blog</li></Link>
          <Link href='/contact'><li className={styles.link} >Contact</li></Link>
        </ul>
      </nav>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Hunting Coders!</a>
        </h1>

        <p className={styles.description}>
          A blog for hunting coders by a hunting coder
        </p>

        <div className="blogs">
          {/* <div className={styles1.con}> */}
          {/* <div className={styles2.con}> */}
          {/* <div className={`${styles1.con} ${styles2.con}`}> */}
          <h2>Populer Blogs</h2>
          <div className="blogItem">
            <h3>How to learn JavaScript in 2022?</h3>
            <p>JavScript is the language used to design logic for the web</p>
          </div>
        </div>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};
