import React, { useState } from 'react';
import './App.css';
import MenteeMain from './Mentee/Main';
import FasilitatorMain from './Mentee/Main';
import AdminMain from './Mentee/Main';
import Verify from './Verify';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentPage, setCurrentPage] = useState('login');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Username dan password harus diisi');
      return;
    }

    const validUserPrefix = ['MT', 'FC', 'AD'];
    const isValidUser = validUserPrefix.some(prefix => username.startsWith(prefix));

    if (!isValidUser) {
      alert('Username menggunakan kode UT');
      return;
    }

    if (username.startsWith('MT')) {
      setCurrentPage('mentee');
    }
    if (username.startsWith('FC')) {
      setCurrentPage('fasilitator');
    }
    if (username.startsWith('AD')) {
      setCurrentPage('admin');
    }
  };

  const handleMentee = () => {
    setCurrentPage('mentee');
  }

  const handleFasilitator = () => {
    setCurrentPage('fasilitator');
  }

  const handleAdmin = () => {
    setCurrentPage('admin');
  }

  const handleRegister = () => {
    setCurrentPage('verify');
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
                <p className="text-paragraph">Silakan masukkan username dan password untuk mengakses UT Elomate</p>
                <form onSubmit={handleMentee}>
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
      case 'verify':
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
