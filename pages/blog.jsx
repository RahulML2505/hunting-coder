import React, { useState } from 'react';
import styles from '../styles/Blog.module.css';
import Link from 'next/link';
import Head from 'next/head';
import fs from 'fs';

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
                                <h3 className={`${styles.link} ${styles['blogItem-h']}`}>{blog.title}</h3>
                            </Link>
                            <p>
                                {String(blog.metadesc).slice(0, 200)}{'...'}
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

// const renderBlogs = async () => {
//     let response = await fetch(`${process.env.HOST_URL}/api/blogs/`);
//     let data = await response.json();
//     return data;
// };

const renderBlogs = async () => {
    let
        dirname = process.env.BLOG_DATA_FOLDER,
        files_str = await fs.promises.readdir(dirname),
        filenames = Array(files_str)[0],
        file_extension = '.json',
        blogs = [];

    for (const filename of filenames) {
        if (filename.includes(file_extension)) {
            let content = await fs.promises.readFile(`${dirname}/${filename}`, 'utf-8');
            let data = JSON.parse(content);
            blogs.push(
                {
                    slug: filename.replace(file_extension, ''),
                    ...data
                }
            );
        }
    }
    return blogs;
};

// export const getServerSideProps = async (context) => {
//     return {
//         props: {
//             blogs: await renderBlogs(),
//         },
//     }
// };

// export const getServerSideProps = async (context) => {
//     return {
//         props: {
//             blogs: await renderBlogs(),
//         },
//     }
// };

export const getStaticProps = async (context) => {
    return {
        props: {
            blogs: await renderBlogs(),
        },
    }
};

export default Blog;
