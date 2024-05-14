"use client"
import Link from "next/link"
import styles from "./register.module.css"
import React, { useState } from 'react';


const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState('')
    const [resultadoMessage, setResultadoMessage] = useState('')

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
            <div className={styles.facebookCaixaCadastro}>
                
                <div className={styles.facebookCaixaSupremaCadastro}>
                    
                    <form className={styles.criarConta} onSubmit={handleSubmit}>
                    {resultadoMessage && <p style={{ color: 'green', textAlign: "center" }}>{resultadoMessage}</p>}
                    {errorMessage && <p style={{ color: 'red', textAlign: "center"  }}>{errorMessage}</p>}
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
