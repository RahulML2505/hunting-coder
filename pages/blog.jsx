import React, { useEffect, useState } from 'react';
import styles from '../styles/Blog.module.css';
import Link from 'next/link';

const Blog = () => {

    const [blogs, setBlogs] = useState(null);

    const renderBlogs = async () => {
        let response = await fetch('/api/blogs/');
        let data = await response.json();
        let blogs = [];

        let idx = 0;
        for (const blog of data) {
            blogs.push(
                <div className={styles.blogItem} key={`blog_${idx++}`}>
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
            )
        }

        setBlogs(blogs);
    };

    useEffect(() => {
        renderBlogs();
    }, []);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className="blogs">
                    {blogs}
                </div>
            </main>
        </div>
    );
};

export default Blog;
