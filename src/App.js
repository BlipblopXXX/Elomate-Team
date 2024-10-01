import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import MenteeMain from './Mentee/Main';
import FasilitatorMain from './Mentee/Main';
import AdminMain from './Mentee/Main';
import Register from './Register';
import Verify from './Verify';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mentee');
  const [currentPage, setCurrentPage] = useState('login');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password || !role) {
      alert('Username, password, dan peran harus diisi');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/login', { nrp: username, password: password });
      const { data } = response;

     
      localStorage.setItem('token', data.token);

  
      setCurrentPage(role);
    } catch (error) {
      console.error('Gagal login:', error);
      if (error.response) {
        if (error.response.status === 401) {
          alert('Username atau password salah');
        } else {
          alert('Gagal login, silakan coba lagi.');
        }
      } else {
        alert('Gagal login, silakan coba lagi.');
      }
    }
  };

  const handleRegister = () => {
    setCurrentPage('register');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return (
          <div className="login-container">
            <div className="left-section">
              <img src="/src/files/images/LoginImg.png" alt="Login Image" />
            </div>
            <div className="right-section">
              <div className="logo">
                <img className="ut" src="/src/files/images/LogoUnitedTractors.png" alt="United Tractors Logo" />
                <img className="elomate" src="/src/files/images/LogoElomate.png" alt="Elomate Logo" />
              </div>
              <div className="card">
                <h1 className="text-header"><b>Selamat Datang!</b></h1>
                <p className="text-paragraph">Silakan masukkan username, password, dan peran untuk mengakses UT Elomate</p>
                <form onSubmit={handleLogin}>
                  <input
                    type="text"
                    placeholder="Username/NRP"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <select className="role" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="mentee">Mentee</option>
                    <option value="fasilitator">Fasilitator</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div className="button">
                    <button type="submit"><b>Login</b></button>
                  </div>
                  <a className="gotoReg" href="#" onClick={handleRegister}>
                    Don't have any account? Register
                  </a>
                </form>
              </div>
            </div>
          </div>
        );
      case 'register':
        return <Verify />;
      case 'mentee':
        return <MenteeMain />;
      case 'fasilitator':
        return <FasilitatorMain />;
      case 'admin':
        return <AdminMain />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
