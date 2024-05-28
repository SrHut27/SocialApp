"use client"
import UpSessionDashboard from "@/components/upSessionDashboard";
import Post from "@/components/cardPost";

const DashboardPage = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    window.location.href = '/'
    return null
  }

  const Logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }
  return <>
    <UpSessionDashboard/>
    Dashboard
    <button onClick={Logout}>Sair</button>
  </>;
};

export default DashboardPage;