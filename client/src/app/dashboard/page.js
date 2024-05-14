"use client"
import WithAuth from '@/components/auth/auth';

const DashboardPage = () => {
    const Logout = () => {
      localStorage.removeItem('token')
      window.location.href = '/'
    }
    return <div>
      Dashboard
      <button onClick={Logout}>Sair</button>
    </div>;
};

export default WithAuth(DashboardPage);