"use client"
import Link from "next/link"
import styles from "./card.module.css"
import React, { useState } from 'react';


const Card = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [errorMessage, setErrorMessage] = useState('');

    const authenticateUser = async (e) => {
        e.preventDefault()
        console.log(formData)

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
                throw new Error(data.error)
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(error.message);
        }
    }


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className={styles.facebookcaixa}>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <form className={styles.inputsdiv} onSubmit={authenticateUser}>
                
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    />
                    <input 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Senha"
                    />
                    <button className={styles.buttonEntrar} type="submit">Entrar</button>
                    <Link href={'/senha'} className={styles.linkSenha}>Esqueceu a senha ?</Link>
                    <hr></hr>
                    <Link href={'/cadastro'} className={styles.buttonCriar}>Criar nova conta</Link>
                </form>
                <p><strong>Crie uma Página</strong> para uma celebridade, uma marca ou uma empresa.</p>
            </div>
        </div>
    )
}
export default Card;
