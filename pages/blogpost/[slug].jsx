import React, { useState } from 'react';
import Head from 'next/head';
// import fs from 'fs';
import styles from '../../styles/BlogPost.module.css';

const Slug = (props) => {
    const [blog,] = useState(props.blog);
    const createMarkup = (content) => {
        return { __html: content };
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>{blog?.title} - Hunting Coder</title>
            </Head>
            <main className={styles.main}>
                <h1>{blog?.title}</h1>
                <hr />
                {blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>}
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

// const renderBlogPost = async (slug) => {
//     let dirname = process.env.BLOG_DATA_FOLDER;
//     let blog = await fs.promises.readFile(`${dirname}/${slug}.json`, 'utf-8');
//     return JSON.parse(blog);
// };

// export const getStaticPaths = async () => {
//     let
//         dirname = process.env.BLOG_DATA_FOLDER,
//         files_str = await fs.promises.readdir(dirname),
//         filenames = Array(files_str)[0],
//         file_extension = '.json',
//         paths = [];

//     for (const filename of filenames) {
//         if (filename.includes(file_extension)) {
//             let content = await fs.promises.readFile(`${dirname}/${filename}`, 'utf-8');
//             let data = JSON.parse(content);
//             paths.push({ params: { slug: filename.replace(file_extension, ''), ...data } }
//             );
//         }
//     }
//     return {
//         paths: paths,
//         fallback: true
//     };
// };

export const getServerSideProps = async (context) => {
    const { slug } = context.query;
    // export const getStaticProps = async (context) => {
    //     const { slug } = context.params;
    return {
        props: {
            // Requesting Data When `slug` appears
            blog: await renderBlogPost(slug),
        },
    }
};

export default Slug;
