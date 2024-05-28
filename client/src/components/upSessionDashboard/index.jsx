"use client"
import styles from "./upDashboard.module.css"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

const upSessionDashboard = () => {
    const [menuVisible, setMenuVisible] = useState(false)
    const menuRef = useRef(null)
    const Logout = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
      }
    const toggleSettings = () => {
        setMenuVisible(!menuVisible)
    };
    const closeSettings = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuVisible(false);
        }
    }
    useEffect(() => {
        if (menuVisible) {
            document.addEventListener('click', closeSettings)
        } else {
            document.removeEventListener('click', closeSettings)
        }
        return () => {
            document.removeEventListener('click', closeSettings)
        }
    }, [menuVisible])
    
    return(
        <header>
            <div className={styles.cabecalho}>
                <div>
                    <Link href="/" className={styles.linkSocial}>SocialApp</Link>
                </div>
                <div className={styles.settingsButton} onClick={toggleSettings}>
                <img src="config.png" alt="Settings" className={styles.settingsIcon} />
                </div>
                {menuVisible && (
                    <div className={styles.settingMenu} ref={menuRef}>
                        <a href="#">Trocar nome de usuário</a>
                        <a href="#">Trocar imagem de usuário</a>
                        <a href="#" onClick={Logout}>Sair</a>
                    </div>
                )}
            </div>
            <hr className={styles.hr}/>
        </header>
    )
}

export default upSessionDashboard