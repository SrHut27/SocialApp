"use client"

import Link from "next/link";
import styles from "./up.module.css"
import React, { useState } from 'react';


const UpSessionLogin = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const authenticateUser = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json()
            if (response.ok) {
                localStorage.setItem('token', data.token)
                window.location.href = '/dashboard'
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <header>
            <div className={styles.cabecalho}>
                <div>
                    <Link href="/" className={styles.linkSocial}>SocialApp</Link>
                </div>
                <form className={styles.inputs} onSubmit={authenticateUser}>
                    <input
                        className={styles.inputmail}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <input
                        className={styles.inputpass}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Senha"

                    />
                    <button
                        className={styles.buttonEntrar} type="submit">
                        Entrar
                    </button>
                </form>
            </div>
        </header>
    )
}

export default UpSessionLogin;