"use client"
import styles from "./post.module.css"

const Post = () => {
    return (
        <div className={styles.post}>
            <div className={styles.postInformation}>
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
                </div>
            </div>
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
                        <p className={styles.commentContent}>Discordo as vezes </p>
                        <span className={styles.commentDate}>30 de maio de 2024</span>
                    </div>
                </div>
                <div className={styles.newComment}>
                    <textarea className={styles.newCommentInput} placeholder="Adicione um comentário..."></textarea>
                    <button className={styles.newCommentButton}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default Post