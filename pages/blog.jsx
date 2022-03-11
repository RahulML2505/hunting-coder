import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Blog.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.blogs);
  const [blogsCount, setBlogsCount] = useState(blogs.length);
  const [totalBlogs, setTotalBlogs] = useState(props.total_blogs);

  const fetchMoreBlogs = async () => {
    const new_count = blogsCount + 2;
    const response = await fetch(`${props.host_url}/api/blogs?count=${new_count}`);
    const { blogs, total_blogs } = await response.json();

    if (response.status === 200) {
      setBlogs(blogs);
      setBlogsCount(new_count);
      setTotalBlogs(total_blogs);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Blog - Hunting Coder</title>
      </Head>
      <main className={styles.main}>

        <div className="blogs">
          <InfiniteScroll
            dataLength={blogs.length}
            next={fetchMoreBlogs}
            hasMore={blogs.length >= totalBlogs ? false : true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <div className={styles.blogs_end_message}>
                <small>Yeh you exceed all blogs!</small>
              </div>
            }
          >
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
          </InfiniteScroll>
        </div>
      </main>
    </div>
  );
};

const renderBlogs = async () => {
  let response = await fetch(`${process.env.HOST_URL}/api/blogs?count=3`);
  let data = await response.json();
  return data;
};

export const getServerSideProps = async (context) => {
  const data = await renderBlogs();
  return {
    props: {
      ...data,
      host_url: process.env.HOST_URL,
    },
  }
};

export default Blog;
