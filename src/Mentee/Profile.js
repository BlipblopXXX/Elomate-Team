import React, { useState, useEffect } from 'react';
import './Profile.css';
import { MonthView } from 'react-calendar';

// const AdditionalActivities = [
//     {name: 'Social activity1', title: '1'},
//     {name: 'Social activity2', title: '2'},
//     {name: 'Social activity3', title: '3'},
// ]

// const Additional = [
//     {name: 'Social activity1', title: '1'},
//     {name: 'Social activity2', title: '2'},
//     {name: 'Social activity3', title: '3'},
// ]

const Additional = [
    {
      activities: [
        { activity: 'Social Activity1', role: 'Peran', description: 'Deskripsi', },
        { activity: 'Social Activity2', role: 'Peran', description: 'Deskripsi', },
        { activity: 'Social Activity3', role: 'Peran', description: 'Deskripsi', },
      ]
    
    }
]
function Profile() {
    const [currentPage, setCurrentPage] = useState('main');
    const handleMain = () => {
        setCurrentPage('main');
    }
    const handleSecond = () => {
        setCurrentPage('second');
    }
    const handleThree = () => {
        setCurrentPage('three');
    }
    const handleFour = () => {
        setCurrentPage('four');
    }
    const handleFive = () => {
        setCurrentPage('five');
    }

    const handleEditAccount = () => {
        setCurrentPage('second');
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
                                <div className='EditProfile' onClick={handleEditAccount}> Edit Profile </div>
                            </div>
                            <hr />
                            <div className='bot-container'>
                                <div><strong className='title-container'> Additional Activities </strong></div>
                                <div className='card-container'>
                                    {Additional.map((item) => (
                                        <div className="Social-activity">
                                            <div className="Social-Activity">
                                                {item.activities.map((AdditionalActivities, index) => (
                                                <div key={index} className="Social-activity">
                                                    <div className="activity-details">
                                                        <div className='activity-row'>
                                                            <img src='/src/files/icons/'/><div className="activity">{AdditionalActivities.activity}</div>
                                                        </div>
                                                        <div className='activity-row'>
                                                            <img src='/src/files/icons/'/><div className="Peran">{AdditionalActivities.role}</div>
                                                            </div>
                                                        <div className='activity-row'>
                                                            <img src='/src/files/icons/'/><div className="Deskripsi">{AdditionalActivities.description} </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <img className='viewButton' src='/src/files/icons/buttonview.png'/>
                                                        <button>del</button>
                                                        <button>edit</button>
                                                    </div>
                                                </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                </div>

                            </div>
                        </div>
                    );
            case 'second':
                return(
                    <div className='profile'>
                        <div className='editprofile-container'>test</div>
                    </div>
                )
                
            case 'three':
                return null;
            case 'four':
                return null;
            case 'five':
                return null;
            default:
                return null;
        };
    }
    
    return(
        <div className='App'>
            {renderPage()}
        </div>
    );
}
    

export default Profile;
