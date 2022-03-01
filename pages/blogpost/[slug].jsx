import React from 'react';
import Head from 'next/head';
import styles from '../../styles/BlogPost.module.css';

const Blog = (props) => {
    const { blog } = props;
    return (
        <div className={styles.container}>
            <Head>
                <title>{blog.title} - Hunting Coder</title>
            </Head>
            <main className={styles.main}>
                <h1>{blog.title}</h1>
                <hr />
                <div>{blog.content}</div>
            </main>
        </div>
    );
};

const renderBlogPost = async (slug) => {
    let response = await fetch(`${process.env.HOST_URL}/api/blogpost/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug: slug })
    });
    let data = await response.json();
    return data;
};

export const getServerSideProps = async (context) => {
    const { slug } = context.query;
    return {
        props: {
            // Requesting Data When `slug` appears
            blog: await renderBlogPost(slug),
        },
    }
};

export default Blog;
