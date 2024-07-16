import React, { useState } from 'react';
import './Register.css';
import Main from './Mentee/Main';
import App from './App';

function Register() {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [batch, setBatch] = useState('');
  const [currentPage, setCurrentPage] = useState('register');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (currentPage === 'register') {
        if (password !== confirmPassword) {
            alert('Password and Confirm Password must match');
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nama: fullname,
                    nrp: username,
                    email: email,
                    phone_number: phoneNumber,
                    password: password,
                    confirm_pass: confirmPassword,
                    batch: batch
                }),
            });

            if (response.ok) {
                alert('Registration Successful!');
                setCurrentPage('login');
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to register user');
        }
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <App />
      case 'register':
        return (
          <div className="register-container">
            <div className="left-section">
              <img src="/src/files/images/LoginImg.png" alt="Login Image" />
            </div>
            <div className="right-section">
              <div className="logo">
                <img className="ut" src="/src/files/images/LogoUnitedTractors.png" alt="United Tractors Logo" />
                <img className="elomate" src="/src/files/images/LogoElomate.png" alt="Elomate Logo" />
              </div>
              <div className="card">
                <h1 className="text-header"><b>Registration</b></h1>
                <p className="text-paragraph">Silakan masukkan data diri anda untuk mendaftar akun UT Elomate</p>
                <form onSubmit={handleRegister}>
                  <input
                    type="text"
                    placeholder="Fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="NRP"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Batch"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                  />
                  <div className="button">
                    <button type="submit"><b>Register</b></button>
                  </div>
                  <a className="gotoLog" href="#" onClick={() => setCurrentPage('login')}>Already have an an account? Login</a>
                </form>
              </div>
            </div>
          </div>
        );
      case 'main':
        return <Main />;
    }
  };

  return (
    <div className="Register">
      {renderPage()}
    </div>
  );
}

export default Register;
