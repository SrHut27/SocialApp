"use client"
import styles from "./recupfinal.module.css"
import Link from "next/link"
import { useState, useEffect } from "react"

const RecoveryFinalPass = () => {
const [formData, setFormData] = useState ({
    password: '',
    confirmPassword: '',
})

    const [errorMessage, setErrorMessage] = useState('')
    const [resultadoMessage, setResultadoMessage] = useState('')
    const token = localStorage.getItem("resetToken")
    const recoveryPassword = async (e) => {
        e.preventDefault()
        
        try {
            const response = await fetch(`http://localhost:3001/auth/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: formData.password, confirmPassword: formData.confirmPassword })
            })
            const data = await response.json()
            if (response.ok) {
                setErrorMessage('')
                setResultadoMessage(data.resultado)
                setTimeout(() => {
                    window.location.href = '/'
                }, 2000)
            } else {
                throw new Error(data.error)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    return (
        <div className={styles.content}>
            {resultadoMessage && <p style={{ color: 'green', textAlign: "center" }}>{resultadoMessage}</p>}
            {errorMessage && <p style={{ color: 'red', textAlign: "center" }}>{errorMessage}</p>}
            <div className={styles.caixa}>

                <form className={styles.caixaMaior} onSubmit={recoveryPassword}>
                    <h1>Vamos cadastrar sua nova senha</h1>
                    <hr />
                    <h2>Digite sua nova senha</h2>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Senha" />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirmar senha"
                        />
                    <div className={styles.buttons}>
                        <Link href="/senha">
                            <button className={styles.buttonCancelar}>Voltar</button>
                        </Link>
                        <button className={styles.buttonPesquisar} type="submit">Continuar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RecoveryFinalPass