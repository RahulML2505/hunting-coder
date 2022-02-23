import React from 'react';
import Link from 'next/link';
import styles from '../styles/components/Navbar.module.css';

const Navbar = () => {
    return (

        <nav className={styles['main-nav']}>
            <ul>
                <Link href='/'><li className={styles.link} >Home</li></Link>
                <Link href='/about'><li className={styles.link} >About</li></Link>
                <Link href='/blog'><li className={styles.link} >Blog</li></Link>
                <Link href='/contact'><li className={styles.link} >Contact</li></Link>
            </ul>
        </nav>

    );
};

export default Navbar;
