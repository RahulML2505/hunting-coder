import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
// import fs from 'fs';
import styles from '../styles/Blog.module.css';

const Blog = (props) => {
  const [blogs,] = useState(props.blogs);
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
              <h3 className={`${styles.link} ${styles.h3}`}>{blog.title}</h3>
            </Link>

            <p className={styles.metadesc}>
              {String(blog.metadesc).slice(0, 260)}{'...'}
            </p>

            <div className={styles.buttons}>
              <Link href={`/blogpost/${blog.slug}`}>
                <button className={styles.readmore_button}>Read More</button>
              </Link>
            </div>

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
