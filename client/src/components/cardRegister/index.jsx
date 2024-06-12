"use client"
import Link from "next/link"
import styles from "./register.module.css"
import React, { useState, useEffect } from 'react';


const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState('')
    const [resultadoMessage, setResultadoMessage] = useState('')
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (errorMessage) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [errorMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json()
            if (response.ok) {
                setErrorMessage('');
                setResultadoMessage(data.resultado)
                setTimeout(() => {
                    window.location.href = '/'
                }, 4000);
            } else {
                throw new Error(data.error)
            }
        } catch (error) {
            console.error('Erro ao realizar requisição:', error)
            setErrorMessage(error.message)
        }
    }

    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    return (
        <div className={styles.contentCadastro}>
            {resultadoMessage && <p style={{ color: 'green', textAlign: "center" }}>{resultadoMessage}</p>}
            {errorMessage && show && (
                <div className={`${styles.error} ${styles.show}`}>
                    <div className={styles.error__icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none">
                            <path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path>
                        </svg>
                    </div>
                    <div className={styles.error__title}>{errorMessage}</div>
                    <div className={styles.error__close} onClick={() => setShow(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20">
                            <path fill="#393a37" d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"></path>
                        </svg>
                    </div>
                </div>
            )}
            <div className={styles.facebookCaixaCadastro}>

                <div className={styles.facebookCaixaSupremaCadastro}>

                    <form className={styles.criarConta} onSubmit={handleSubmit}>

                        <h1>Cadastre sua conta</h1>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                        />
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
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirmar Senha" />
                        <button className={styles.buttonRegister} type="submit">Cadastre-se</button>
                    </form>

                    <div className={styles.bemVindo}>
                        <h1>Seja bem vindo</h1>
                        <h2>Para se manter conectado conosco, entre com suas informações pessoais</h2>
                        <Link href="/" className={styles.buttonLogin}>Entre</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RegisterForm;
