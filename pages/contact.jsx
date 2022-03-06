import React, { useState } from 'react';
import styles from '../styles/Contact.module.css';

const Contact = () => {
    const [contactData, setContactData] = useState({
        name: '', email: '',
        phone: '', desc: ''
    });

    const onChange = (e) => {
        setContactData({
            ...contactData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(contactData)
        })
        const data = await response.json();

        if (response.status === 200) {
            // console.log(data.details);
            alert("Thanks for contacting us!");
            setContactData({ ...contactData, desc: '' });
        } else {
            console.log(data);
        }
    };

    const {
        name, email, phone, desc
    } = contactData;

    return (
        <div className={styles.container}>
            <h1>Contact Us</h1>
            <form onSubmit={onSubmit}>
                <div className={styles.mb_3}>
                    <label htmlFor="name" className={styles.form_label}>Enter your name</label>
                    <input type="text" className="form-control" name='name' id="name" value={name} onChange={onChange} aria-describedby="name-help" required />
                </div>
                <div className={styles.mb_3}>
                    <label htmlFor="email" className={styles.form_label}>Email address</label>
                    <input type="email" className="form-control" name='email' id="email" value={email} onChange={onChange} aria-describedby="email-help" required /><br />
                    <small id="email-help" className="form-text">We'll never share your email with anyone else.</small>
                </div>
                <div className={styles.mb_3}>
                    <label htmlFor="phone" className={styles.form_label}>Phone</label><br />
                    <input type="tel" className="form-control" name='phone' id="phone" value={phone} onChange={onChange} aria-describedby="phone-help" required /><br />
                    <small id="phone-help" className="form-text">We'll never share your phone with anyone else.</small>
                </div>
                <div className={styles.mb_3}>
                    <label htmlFor="desc">Elaborate your concern</label><br />
                    <textarea className="form-control" placeholder="Write your concern here" id="desc" name='desc' value={desc} onChange={onChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
};

export default Contact;
