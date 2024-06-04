import React, { useState } from 'react';
import './Verify.css';
import Register from './Register';
import Login from './App';

function Verify() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState('verify');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleMain = () => {
        setCurrentPage('login');
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === 'ut') {
            setCurrentPage('register');
        } else {
            setError('Incorrect password. Please try again.');
        }
    };

    const renderPage = () => {
        switch(currentPage) {
            case 'verify':
                return (
                    <div className="verifyapp">
                    <div className="verify">
                        <img className="backbutton" onClick={handleMain} src="/src/files/icons/backbutton.png" alt="Back" />
                        <h1>Verify for Register</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="form-control"
                                />
                            </div>
                            {error && <div className="error">{error}</div>}
                            <button type="submit" className="btn">Submit</button>
                        </form>
                    </div>
                    </div>
                );
            case 'login':
                return <Login />;
            case 'register':
                return <Register />;
        }
    }

    return (
        <div className="App">
            {renderPage()}
        </div>
    );
}

export default Verify;
