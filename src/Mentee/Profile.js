import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile() {
    const [currentPage, setCurrentPage] = useState('main');
    const handleMain = () => {
        setCurrentPage('Main');
    }
    const handleSecond = () => {
        setCurrentPage('Second');
    }
    const handleThree = () => {
        setCurrentPage('Three');
    }
    const handleFour = () => {
        setCurrentPage('Four');
    }
    const handleFive = () => {
        setCurrentPage('Five');
    }

    const handleEditAccount = () => {
        handleSecond();
        
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'main':
                return(
                    <div className="Profile">
                        <div className="title">
                            <h><b>User Profile</b></h> 
                            <div className="EditButton" onClick={handleEditAccount}> Edit Account </div>
                        </div>
                        <div className="form">
                            <hr />
                            <div className="profileup">
                                <img className="picture" src="/src/files/profile/Profile1.png" />
                                <div className='EditProfile' onClick={handleEditAccount}> Edit Profile </div>
                                <div className="input">
                                    <div className="input-name"><b>Nama :</b></div>
                                    <hr />
                                    <div className="input-nrp"><b>NRP :</b></div>
                                    <hr />
                                    <div className="input-position"><b>Posisi :</b></div>
                                    <hr />
                                    <div className="input-birth"><b>Tempat, Tanggal Lahir :</b></div>
                                    <hr />
                                    <div className="input-uni"><b>Asal Universitas :</b></div>
                                    <hr />
                                    <div className="input-dom"><b>Domisili :</b></div>
                                    <hr />
                                    <div className="input-hp"><b>No HP :</b></div>
                                    <hr />
                                    <div className="input-Email"><b>Email :</b></div>
                                </div>
                            </div>
                            <hr />
                            <div className="profiledown">


                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }

    return(
        <div className="App">
            {renderPage()}
        </div>
    );
}

export default Profile;
