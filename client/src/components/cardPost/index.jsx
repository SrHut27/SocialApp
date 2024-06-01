"use client"
import styles from "./post.module.css"
import React, { useState, useEffect } from 'react'

const Post = () => {
    const [showPopup, setShowPopup] = useState(false)

    const togglePopup = () => {
        setShowPopup(!showPopup)
    }

    useEffect(() => {
        if (showPopup) {
            document.body.classList.add(styles.bodyNoScroll)
        } else {
            document.body.classList.remove(styles.bodyNoScroll)
        }
    }, [showPopup])

    return (
        <div>
            {showPopup && (
                <div className={styles.overlay}></div>
            )}

        <div className={showPopup ? `${styles.post} ${styles.postExpanded}` : styles.post}>
            
            {showPopup && (<div className={styles.headerPost}> 
                <h1>Publicação de User</h1>
                <button className={styles.closeButton} onClick={togglePopup}>X</button>
            </div>)}
            <div className={showPopup ? `${styles.postInformation} ${styles.postInformationExpanded}` : styles.postInformation}>
                <div className={styles.profileImage}>
                    <img src="profilePicTest.jpeg" alt="#" />
                </div>
                <div className={styles.postGrid2}>
                    <h2 className={styles.profileName}>User</h2>
                    <p className={styles.postText}>Testando layout apenas layout
                        Testando layout apenas layout Testando layout apenas layout
                        Testando layout apenas layout Testando layout apenas layout
                    </p>
                    <div className={styles.postImage}>
                        <img src="Test.jpeg" alt="#" />
                    </div>
                    <button onClick={togglePopup} className={`${styles.commentButton} ${showPopup ? styles.hideButton : ''}`}>
                        <img src="comment.png" alt="Comentar" className={styles.commentIcon} /> <p>Comentar</p>
                    </button>
                </div>
            </div>
            {showPopup && (
                <div className={styles.commentsSection}>
                    <h3 className={styles.commentsTitle}>Comentários</h3>
                    
                    <div className={styles.comment}>
                        <div className={styles.commentProfileImage}>
                            <img src="profilePicTest.jpeg" alt="#" />
                        </div>
                        <div className={styles.commentText}>
                            <h4 className={styles.commentUserName}>User 2</h4>
                            <p className={styles.commentContent}>Papo reto</p>
                            <span className={styles.commentDate}>30 de maio de 2024</span>
                        </div>
                    </div>
                    <div className={styles.comment}>
                        <div className={styles.commentProfileImage}>
                            <img src="profilePicTest.jpeg" alt="#" />
                        </div>
                        <div className={styles.commentText}>
                            <h4 className={styles.commentUserName}>User 3</h4>
                            <p className={styles.commentContent}>Discordo às vezes</p>
                            <span className={styles.commentDate}>30 de maio de 2024</span>
                        </div>
                    </div>
                    <div className={styles.newComment}>
                        <textarea className={styles.newCommentInput} placeholder="Adicione um comentário..."></textarea>
                        <button className={styles.newCommentButton}>Enviar</button>
                    </div>
                </div>
            )}
        </div>
        </div>
    )
}

export default Post