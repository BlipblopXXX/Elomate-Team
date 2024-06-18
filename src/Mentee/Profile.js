import React, { useState, useEffect } from 'react';
import './Profile.css';

    function Profile() {

    const Additional = [
        {
          activities: [
            { activity: 'Social Activity1', Date: '15 juli 2024', role: 'Peran', description: 'Deskripsi', },
            { activity: 'Social Activity2', Date: '15 juli 2024', role: 'Peran', description: 'Deskripsi', },
            { activity: 'Social Activity3', Date: '15 juli 2024', role: 'Peran', description: 'Deskripsi', },
          ]
        
        }
    ]

    const AdditionalView = [
        {
          Additionals: [
            { Date: '15 juli 2024', role: 'Peran', description: 'Deskripsi yang diikuti', },
          ]
        }
    ]
    
    const [fullName, setFullName] = useState('');
    const handleInputName = (event) => {
        setFullName(event.target.value);
    };

    const [NRP, setNRP] = useState('890837829');
    const handleInputNRP = (event) => {
        setNRP(event.target.value);
    };

    const [posisi, setPosisi] = useState('');
    const handleInputPosisi = (event) => {
        setPosisi(event.target.value);
    };

    const [tempatLahir, setTempatLahir] = useState('');
    const handleInputTempat = (event) => {
        setTempatLahir(event.target.value);
    };

    const [date, setDate] = useState(new Date());
    const formatDate = (date) => {
        let d = new Date(date),
          day = '' + d.getDate(),
            month = '' + (d.getMonth() + 1),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
      }

    const [universitas, setUniversitas] = useState('');
    const handleInputUniversitas = (event) => {
        setUniversitas(event.target.value);
    };

    const [domisili, setDomisili] = useState('');
    const handleInputDomisili = (event) => {
        setDomisili(event.target.value);
    };

    const [nomor, setNomor] = useState('');
    const handleInputNomor = (event) => {
        setNomor(event.target.value);
    };

    const [email, setEmail] = useState('');
    const handleInputEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleSaveButton = (event) => {
        handleMain();
    }

    const [password, setPassword] = useState('');
    const handleInputPassword = (event) => {
        setPassword(event.target.value);
    };

    const [confirmPassword, setConfirmPassword] = useState('');
    const handleInputConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleeditbutton = (event) => {
        handleFour();
    }

    const [Activity, setActivity] = useState('');
    const handleInputActivity = (event) => {
        setActivity(event.target.value);
    };

    const [Role, setRole] = useState('');
    const handleInputRole = (event) => {
        setRole(event.target.value);
    };

    const [Description, setDescription] = useState('');
    const handleInputDescription = (event) => {
        setDescription(event.target.value);
    };

    const [Attachment, setAttachment] = useState('');
    const handleInputAttachment = (event) => {
        setAttachment(event.target.value);
    };

        const handleviewbutton = (event) => {
            handleFive();
        }
    const [Certificate, setCertificate] = useState('');
    const handleInputCertificate = (event) => {
        setCertificate(event.target.value);
    };

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

    const handleEditProfile = () => {
        setCurrentPage('second');
    }

    const handleEditAccount = () => {
        setCurrentPage('three');
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
                                <div className='EditProfile' onClick={handleEditProfile}> Edit Profile </div>
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
                                                            <div className="activity">{AdditionalActivities.activity}</div>
                                                        </div>
                                                        <div className='activity-row'>
                                                            <img className='icon' src='/src/files/icons/dateadditional.png'/><div className="24 Juli 2024">{AdditionalActivities.Date}</div>
                                                        </div>
                                                        <div className='activity-row'>
                                                            <img className='icon' src='/src/files/icons/Roleadditional.png'/><div className="Peran">{AdditionalActivities.role}</div>
                                                        </div>
                                                        <div className='activity-row'>
                                                            <img className='icon' src='/src/files/icons/desc.png'/><div className="Deskripsi">{AdditionalActivities.description} </div>
                                                        </div>
                                                    </div>
                                                    <div className='buttons'>
                                                        <img className='editbutton' onClick={handleeditbutton} src='/src/files/icons/editbutton.png'/>
                                                        <img className='deletebutton' src='/src/files/icons/deletebutton.png'/>
                                                        <img className='viewButton' onClick={handleviewbutton} src='/src/files/icons/buttonview.png'/>
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
                        <div className="title2">
                            <img className="backbutton" onClick={handleMain} src="/src/files/icons/backbutton.png" />
                            <h><b>Edit Profile</b></h>
                        </div>
                        <hr />

                        <div className='editprofile-container'>
                            <div className='picture-container'>
                                <img className="pictureEdit" src="/src/files/profile/Profile1.png" />
                            </div>
                            <label>
                                <div>
                                    <p className='judul'>Nama Lengkap</p>
                                    <label className='inputText'>
                                        <input
                                        type="text"
                                        className='inputan'
                                        value={fullName}
                                        onChange={handleInputName}
                                        />
                                    </label>
                                </div>
                            </label>
                            <label>
                                <div>
                                    <p className='judul'>NRP</p>
                                    <label className='inputText'>
                                        <input
                                        type="text"
                                        disabled
                                        className='inputan'
                                        value={NRP}
                                        onChange={handleInputNRP}
                                        />
                                    </label>
                                </div>
                            </label>
                            <label>
                                <div>
                                    <p className='judul'>Posisi</p>
                                    <label className='inputText'>
                                        <input
                                        type="text"
                                        className='inputan'
                                        value={posisi}
                                        onChange={handleInputPosisi}
                                        />
                                    </label>
                                </div>
                            </label>
                            <label>
                                <div>
                                    <p className='judul'>Tempat Lahir</p>
                                    <label className='inputText'>
                                        <input
                                        type="text"
                                        className='inputan'
                                        value={tempatLahir}
                                        onChange={handleInputTempat}
                                        />
                                    </label>
                                </div>
                            </label>
                            <p className='judul'>Tanggal Lahir</p>
                            <input
                                type="date"
                                className="dateInput"
                                value={formatDate(date)}
                                onChange={(e) => setDate(new Date(e.target.value))}
                            />
                            <label>
                                <div>
                                    <p className='judul'>Asal Universitas</p>
                                    <label className='inputText'>
                                        <input
                                        type="text"
                                        className='inputan'
                                        value={universitas}
                                        onChange={handleInputUniversitas}
                                        />
                                    </label>
                                </div>
                            </label>
                            <label>
                                <div>
                                    <p className='judul'>Domisili</p>
                                    <label className='inputText'>
                                        <input
                                        type="text"
                                        className='inputan'
                                        value={domisili}
                                        onChange={handleInputDomisili}
                                        />
                                    </label>
                                </div>
                            </label>
                            <label>
                                <div>
                                    <p className='judul'>No. HP</p>
                                    <label className='inputText'>
                                        <input
                                        type="Phone number"
                                        className='inputan'
                                        value={nomor}
                                        onChange={handleInputNomor}
                                        />
                                    </label>
                                </div>
                            </label>
                            <label>
                                <div>
                                    <p className='judul'>Email</p>
                                    <label className='inputText'>
                                        <input
                                        type="email"
                                        className='inputan'
                                        value={email}
                                        onChange={handleInputEmail}
                                        />
                                    </label>
                                </div>
                            </label>
                            <button className='saveButton' onClick={handleSaveButton}>
                                Save
                            </button>
                        </div>
                    </div>
                )
                
            case 'three':
                return (
                    <div className='profile'>
                        <div className="title2">
                            <img className="backbutton" onClick={handleMain} src="/src/files/icons/backbutton.png" />
                            <h><b>Edit Account</b></h>
                        </div>
                        <hr />
                    <div className='editaccount-container'>
                        <label>
                            <div>
                                <p className='judul'>NRP</p>
                                <label className='inputText'>
                                    <input
                                    type="text"
                                    disabled
                                    className='inputan'
                                    value={NRP}
                                    onChange={handleInputNRP}
                                    />
                                </label>
                            </div>
                        </label>
                        <label>
                            <div>
                                <p className='judul'>Password</p>
                                <label className='inputText'>
                                    <input
                                    type="password"
                                    className='inputan'
                                    value={password}
                                    onChange={handleInputPassword}
                                    />
                                </label>
                            </div>
                        </label>
                        <label>
                            <div>
                                <p className='judul'>Confirm Password</p>
                                <label className='inputText'>
                                    <input
                                    type="password"
                                    className='inputan'
                                    value={confirmPassword}
                                    onChange={handleInputConfirmPassword}
                                    />
                                </label>
                            </div>
                        </label>
                        <button className='saveButton' onClick={handleSaveButton}>
                            Save
                        </button>
                    </div>

                    </div>
                )
            case 'four':
                return(
                    <div className='profile'>
                        <div className='title3'>
                            <img className="backbutton" onClick={handleMain} src="/src/files/icons/backbutton.png"/>
                            <h><b> Additional Activities</b></h>
                        </div>
                        <hr />
                        <div className='addbutoon-container'>
                            <label>
                                <div>
                                    <p className='judul'>Activity</p>
                                    <label className= 'inputText'>
                                        <input
                                        type="text"
                                        className='inputan'
                                        value={Activity}
                                        onChange={handleInputActivity} 
                                        />
                                    </label>
                                </div>
                            </label>
                        </div>
                        <p className='judul'>Date</p>
                            <input
                            type="date"
                            className="dateInput"
                            value={formatDate(date)}
                            onChange={(e) => setDate(new date(e.target.value))} 
                            />

                            <p className='judul'> Role </p>
                                <input
                                type="text"
                                className='inputan'
                                value={Role}
                                onChange={handleInputRole}
                                 />
                            
                            <p className='judul'>Description</p>
                                <input
                                type="text"
                                className='inputan'
                                value={Description}
                                onChange={handleInputDescription} 
                                />

                            <p className='judul'>Attachment</p>
                                <input
                                type="file"
                                className='inputan'
                                value={Attachment}
                                onChange={handleInputAttachment} 
                                />
                                  <button className='saveButton' onClick={handleSaveButton}>
                                Save
                            </button>
                    </div>
                  

                )
                
            case 'five':
                return(
                    <div className='profile'>
                        <div className='title3'>
                            <img className="backbutton" onClick={handleMain} src="/src/files/icons/backbutton.png"/>
                            <h><b> Additional Activities</b></h>
                        </div>
                        <hr />
                        <div className='butoonview-container'>
                        <div><strong className='title-container'> Social Activity </strong></div>
                        
                        {AdditionalView.map((item) => (
                            <div className="Additional-container">
                                <div>
                                    {item.Additionals.map((AdditionalView, index) => (
                                    <div key={index}>
                                        <p><strong>Date:</strong> {AdditionalView.Date}</p>
                                        <p><strong>Posted:</strong> {AdditionalView.role}</p>
                                        <p><strong>Description:</strong> {AdditionalView.description}</p>
                                        <p className='judul'>Certificate</p>
                                            <input
                                            type="file"
                                            className='inputan'
                                            value={Certificate}
                                            onChange={handleInputCertificate} 
                                            />
                                    </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                           

                                    
                                       
                        <hr />
                        </div>
                    </div>
  
                                    
                        
                )
                
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
