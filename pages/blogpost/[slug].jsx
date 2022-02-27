import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/BlogPost.module.css';

const Blog = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [blog, setBlog] = useState(null);

    const renderBlogPost = async () => {
        let response = await fetch('/api/blogpost/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ slug: slug })
        });
        let data = await response.json();

        setBlog(<>
            <h1>{data.title}</h1>
            <hr />
            <div>{data.content}</div>
        </>);
    };

    useEffect(() => {
        // Requesting Data When `slug` appears
        if (router.isReady) {
            renderBlogPost();
        }
    }, [router.isReady]);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                {blog}
            </main>
        </div>
    );
};

export default Blog;
