"use client"

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
  return <div>
    Dashboard
    <button onClick={Logout}>Sair</button>
  </div>;
};

export default DashboardPage;