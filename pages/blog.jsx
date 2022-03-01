import React from 'react';
import styles from '../styles/Blog.module.css';
import Link from 'next/link';
import Head from 'next/head';

const Blog = (props) => {
    const { blogs } = props;
    return (
        <div className={styles.container}>
            <Head>
                <title>Blog - Hunting Coder</title>
            </Head>
            <main className={styles.main}>
                <div className="blogs">
                    {blogs.map((blog, idx) =>
                        <div className={styles.blogItem} key={`blog_${idx}`}>
                            <Link href={`/blogpost/${blog.slug}`}>
                                <h3 className={`${styles.link} ${styles['blogItem-h']}`}>{blog.title}</h3>
                            </Link>
                            <p>
                                {String(blog.content).slice(0, 200)}{'...'}
                                <Link href={`/blogpost/${blog.slug}`}>
                                    <span className={styles.readmore}>readmore</span>
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

const renderBlogs = async () => {
    let response = await fetch(`${process.env.HOST_URL}/api/blogs/`);
    let data = await response.json();
    return data;
};

export const getServerSideProps = async (context) => {
    return {
        props: {
            blogs: await renderBlogs(),
        },
    }
};

export default Blog;
