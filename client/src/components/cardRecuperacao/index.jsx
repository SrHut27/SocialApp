"use client";
import styles from "./recup.module.css";
import Link from "next/link";
import React, { useState } from "react";

const RecoveryPassCard = () => {
<<<<<<< HEAD
    const [formData, setFormData] = useState({
        email: '',
        resetToken: '',
    })
    const [errorMessage, setErrorMessage] = useState('')
    const [resultadoMessage, setResultadoMessage] = useState('')
    const [showTokenInput, setShowTokenInput] = useState(false);

    const recoveryMail = async (e) => {
        e.preventDefault()
        console.log(formData)

        try {
            const response = await fetch('http://localhost:3001/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: formData.email }),
            })
            const data = await response.json()
            if (response.ok) {
                setShowTokenInput(true)
                setErrorMessage('')
                setResultadoMessage(data.resultado)
            } else {
                throw new Error(data.error)
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(error.message)
        }
    }
    const verifyToken = async (e) => {
        e.preventDefault()
        if (showTokenInput && !formData.resetToken) {
            setErrorMessage('Por favor, insira o código de verificação.')
            setResultadoMessage('')
            return
          }

        try {
            const response = await fetch(`http://localhost:3001/auth/reset-password/${formData.resetToken}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json()
            if (response.ok) {
                localStorage.setItem('resetToken', data.token)
                window.location.href = '/recuperarsenha'
            } else {
                throw new Error(data.error)
            }
        } catch (error) {
            setErrorMessage(error.message)
            setResultadoMessage('')

        }
    }


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
=======
  const [formData, setFormData] = useState({
    email: "",
    resetToken: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [resultadoMessage, setResultadoMessage] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(false);

  const recoveryMail = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch(
        "http://localhost:3001/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setShowTokenInput(true);
        setErrorMessage("");
        setResultadoMessage(data.resultado);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };
  const verifyToken = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3001/auth/reset-password/${formData.resetToken}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setResultadoMessage(data.resultado);
        setErrorMessage("");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setResultadoMessage("");
>>>>>>> 53f71dc144a55aecd58bf1a36b71e69ac3be9dcd
    }
  };

<<<<<<< HEAD
    return (
        <div className={styles.content}>
            {resultadoMessage && <p style={{ color: 'green', textAlign: "center" }}>{resultadoMessage}</p>}
            {errorMessage && <p style={{ color: 'red', textAlign: "center" }}>{errorMessage}</p>}
            <div className={styles.caixa}>

                <form className={styles.caixaMaior} onSubmit={showTokenInput ? verifyToken : recoveryMail}>
                    <h1>Enviaremos um código para o seu email</h1>
                    <hr />
                    <h2>Podemos enviar um código de login para:</h2>
                    <input
                        className={styles.recuperacaoemail}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email" />
                    {showTokenInput && (
                        <input
                            className={styles.recuperacaoToken}
                            type="text"
                            name="resetToken"
                            value={formData.resetToken}
                            onChange={handleChange}
                            placeholder="Código de verificação"
                        />
                    )}
                    <div className={styles.buttons}>
                        <Link href="/">
                            <button className={styles.buttonCancelar}>Cancelar</button>
                        </Link>
                        <button className={styles.buttonPesquisar} type="submit">Continuar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
=======
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
>>>>>>> 53f71dc144a55aecd58bf1a36b71e69ac3be9dcd

  return (
    <div className={styles.content}>
      <div className={styles.caixa}>
        {resultadoMessage && (
          <p style={{ color: "green", textAlign: "center" }}>
            {resultadoMessage}
          </p>
        )}
        {errorMessage && (
          <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
        )}
        <form
          className={styles.caixaMaior}
          onSubmit={showTokenInput ? verifyToken : recoveryMail}
        >
          <h1>Enviaremos um código para o seu email</h1>
          <hr />
          <h2>Podemos enviar um código de login para:</h2>
          <input
            className={styles.recuperacaoemail}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {showTokenInput && (
            <input
              className={styles.recuperacaoToken}
              type="text"
              name="resetToken"
              value={formData.resetToken}
              onChange={handleChange}
              placeholder="Código de verificação"
            />
          )}
          <div className={styles.buttons}>
            <Link href="/">
              <button className={styles.buttonCancelar}>Cancelar</button>
            </Link>
            <button className={styles.buttonPesquisar} type="submit">
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoveryPassCard;
