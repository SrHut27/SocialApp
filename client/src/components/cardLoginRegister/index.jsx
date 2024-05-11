
"use client"
import Link from "next/link"
import styles from "./card.module.css"
import React, { useState } from 'react';


const Card = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
            } else {
                console.error('Erro ao cadastrar usuário.');
            }
        } catch (error) {
            console.error('Erro ao realizar requisição:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    return (
        <div>
            <div className={styles.facebookcaixa}>
                <form className={styles.inputsdiv} onSubmit={handleSubmit}>
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
                    placeholder="Confirmar Senha"
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
