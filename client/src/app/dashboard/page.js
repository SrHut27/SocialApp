"use client"
import UpSessionDashboard from "@/components/upSessionDashboard";
import Post from "@/components/cardPost";
import styles from "./page.module.css"

const DashboardPage = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    window.location.href = '/'
    return null
  }

  return <>
    <UpSessionDashboard/>
    <div className={styles.post}>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
    </div>
  </>;
};

export default DashboardPage;