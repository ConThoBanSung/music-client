import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://backend-e154.onrender.com/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      const data = await res.json();
      localStorage.setItem('adminToken', data.token);
      navigate('/admin/dashboard');
    } catch (error) {
      alert('Sai tên đăng nhập hoặc mật khẩu!');
    }
  };

  return (
    <div className="login-box">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="admin-box">
          <label>Tên đăng nhập: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="admin-box">
          <label>Mật khẩu: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default AdminLogin;
