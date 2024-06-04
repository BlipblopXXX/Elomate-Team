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

    const [progress, setProgress] = useState(0);
    const [progress2, setProgress2] = useState(0);
    const [progress3, setProgress3] = useState(0);
    const [progress4, setProgress4] = useState(0);

    const ProgressBar = ({ percentage }) => {
        return (
          <div className="progress-bar">
            <div
              className="progresss"
              style={{ width: `${percentage}%` }}
            />
          </div>
        );
    }
     // Simulate progress increase over time
     setTimeout(() => {
        if (progress < 100) {
          setProgress(progress + 10);
        }
        }, 1000);
        // Simulate progress increase over time
    setTimeout(() => {
        if (progress2 < 100) {
          setProgress2(progress2 + 20);
        }
        }, 1000);
        // Simulate progress increase over time
    setTimeout(() => {
        if (progress3 < 100) {
          setProgress3(progress3 + 20);
        }
        }, 1000);
        // Simulate progress increase over time
    setTimeout(() => {
        if (progress4 < 100) {
          setProgress4(progress4 + 20);
        }
        }, 1000);



    const handleEditAccount = () => {
        handleSecond();
        
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'main':
                return(
                    <div className="profile">
                        <div className="title">
                            <h><b>User Profile</b></h> 
                            <div className="EditButton" onClick={handleEditAccount}> Edit Account </div>
                        </div>
                        <div className="form">
                            <hr />
                            <div className='EditProfile' onClick={handleEditAccount}> Edit Profile </div>
                            <div className="profileup">
                                <img className="picture" src="/src/files/profile/Profile1.png" />
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

                        <div className='bot-container'>
                            <div className='left-container'>
                                <div className='judul-container'>
                                    <div><strong> Mandatory Course Progress </strong></div>
                                </div>
                                <div className="profiledown">
                                    <p>General Development      
                                    <div className='bar'>
                                        <div className='bar1'>
                                            <ProgressBar percentage={progress}/>
                                        </div>
                                        <div className='bar2'>{progress}%</div>
                                    </div>          
                                    </p>
                                    <p>Orientasi Divisi
                                    <div className='bar'>
                                            <div className='bar1'>
                                                <ProgressBar percentage={progress2}/>
                                            </div>
                                            <div className='bar2'>{progress2}%</div>
                                        </div>
                                    </p>
                                    <p>BGMS
                                    <div className='bar'>
                                            <div className='bar1'>
                                                <ProgressBar percentage={progress3}/>
                                            </div>
                                            <div className='bar2'>{progress3}%</div>
                                        </div>
                                    </p>
                                    <p>Neop 
                                    <div className='bar'>
                                            <div className='bar1'>
                                                <ProgressBar percentage={progress4}/>
                                            </div>
                                            <div className='bar2'>{progress4}%</div>
                                        </div>
                                    </p>
                                </div>
                                <div className='updateprogress'>
                                    *Last Update 15 November 2023
                                </div>
                            </div>
                            <div  className='right-container'>
                                <p>test</p>
                            </div>
                                



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

