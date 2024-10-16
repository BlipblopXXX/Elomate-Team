import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Main.css';
import App from '../App';
import EAP from './EAP';
import Chat from './Games';
import Dashboard from './Dashboard';
import Schedule from './Schedule';
import Participant from './Participant';
import PreActivity from './PreActivity';
import Forum from './Forum';
import Assignment from './Assignment';
import SelfPeer from './SelfPeer';
import FinalReport from './FinalReport';
import Announcement from './Announcement';
import Mentoring from './Mentoring';
import Profile from './Profile';

function Main() {
    const [currentPage, setCurrentPage] = useState('home');
    const [currentScreen, setCurrentScreen] = useState('dashboard');
    const [batchNumber, setBatchNumber] = useState('');
    const [selectedTool, setSelectedTool] = useState('dashboard');
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchBatch = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3001/profile", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;
                console.log("Fetched profile data:", data);
                const userProfile = data.user;

                setBatchNumber(userProfile.BATCH);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchBatch();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        setCurrentPage('login');
    };

    const handleEAP = () => {
        setCurrentScreen('eap');
    }

    const handleGames = () => {
        setCurrentScreen('chat');
    };

    const handleDashboard = () => {
        setCurrentScreen('dashboard');
        setSelectedTool('dashboard');
    };

    const handleSchedule = () => {
        setCurrentScreen('schedule');
        setSelectedTool('schedule');
    };

    const handleParticipant = () => {
        setCurrentScreen('participant');
        setSelectedTool('participant');
    };

    const handlePreActivity = () => {
        setCurrentScreen('preactivity');
        setSelectedTool('preactivity');
    }

    const handleForum = () => {
        setCurrentScreen('forum');
        setSelectedTool('forum');
    }

    const handleAssignment = () => {
        setCurrentScreen('assignment');
        setSelectedTool('assignment');
    }

    const handleSelfPeer = () => {
        setCurrentScreen('selfpeer');
        setSelectedTool('selfpeer');
    }

    const handleFinalReport = () => {
        setCurrentScreen('finalreport');
        setSelectedTool('finalreport');
    }

    const handleAnnouncement = () => {
        setCurrentScreen('announcement');
        setSelectedTool('announcement');
    }

    const handleMentoring = () => {
        setCurrentScreen('mentoring');
        setSelectedTool('mentoring');
    }

    const handleProfile = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    }

    const handleProfileClick = () => {
        setCurrentScreen('profile');
        setIsProfileDropdownOpen(false);
    }

    const renderScreen = () => {
        switch (currentScreen){
            case 'eap':
                return <EAP />;
            case 'chat':
                return <Chat />;
            case 'dashboard':
                return <Dashboard />;
            case 'schedule':
                return <Schedule />;
            case 'participant':
                return <Participant />;
            case 'preactivity':
                return <PreActivity />;
            case 'forum':
                return <Forum />;
            case 'assignment':
                return <Assignment />;
            case 'selfpeer':
                return <SelfPeer />;
            case 'finalreport':
                return <FinalReport />;
            case 'announcement':
                return <Announcement />;
            case 'mentoring':
                return <Mentoring />;
            case 'profile':
                return <Profile />;
            default:
                return null;
        }
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'login':
                return <App />
            case 'home':
                return (
                    <div className="home">
                        <div className="maintitle">
                            <img className="elomate" src="/src/files/images/LogoElomate.png" alt="Elomate Logo" />
                            <div className="user" ref={dropdownRef}>
                                <img className="icon1" onClick={handleEAP} src="/src/files/icons/Health.png" alt="EAP" />
                                <img className="icon2" onClick={handleGames} src="/src/files/icons/Games.png" alt="Games" />
                                <img className="icon3" onClick={handleProfile} src="/src/files/icons/User.svg" alt="User" />
                                <div className="user-text">
                                    <p><b>Nama Elomate</b></p>
                                    <p>Nomor Elomate</p>
                                </div>
                                {isProfileDropdownOpen && (
                                    <div className="profile-dropdown">
                                        <button onClick={handleProfileClick} className="dropdown-item">
                                            <img src="/src/files/icons/User.svg" alt="Profile Icon" className="dropdown-icon" /> Profile
                                        </button>
                                        <button onClick={handleLogout} className="dropdown-item"> 
                                            <img src="/src/files/icons/Logout.svg" alt="Profile Icon" className="dropdown-icon" /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="divider">
                            <div className="toolbar">
                                <div className="toollist">
                                    <div className="role">
                                        <div className="role-title">
                                            <div href="#"><img src="/src/files/icons/Role.svg" alt="Role Icon"/> Role</div>
                                        </div>
                                        <div className="role-details">
                                            <div><b>Management Trainee</b></div>
                                            <div>Batch {batchNumber}</div>
                                        </div>
                                    </div>
                                    <div className="toolbutton">
                                        <a href="#" className={`dashboard ${selectedTool === 'dashboard' ? 'selected' : ''}`} onClick={handleDashboard}><img src="/src/files/icons/Dashboard.svg" alt="Dashboard"/> Dashboard</a>
                                        <a href="#" className={`schedule ${selectedTool === 'schedule' ? 'selected' : ''}`} onClick={handleSchedule}><img src="/src/files/icons/schedule.svg" alt="Schedule"/> Schedule</a>
                                        <a href="#" className={`preactivity ${selectedTool === 'preactivity' ? 'selected' : ''}`} onClick={handlePreActivity}><img src="/src/files/icons/activity.svg" alt="Pre-Activity"/> Pre-Activity</a>
                                        <a href="#" className={`assignment ${selectedTool === 'assignment' ? 'selected' : ''}`} onClick={handleAssignment}><img src="/src/files/icons/Assignment.svg" alt="Assignment"/> Assignment</a>
                                        <a href="#" className={`selfpeer ${selectedTool === 'selfpeer' ? 'selected' : ''}`} onClick={handleSelfPeer}><img src="/src/files/icons/Assessment.svg" alt="Assessment"/> Assessment</a>
                                        <a href="#" className={`mentoring ${selectedTool === 'mentoring' ? 'selected' : ''}`} onClick={handleMentoring}><img src="/src/files/icons/Mentoring.svg" alt="Mentoring"/> Mentoring</a>
                                        <a href="#" className={`finalreport ${selectedTool === 'finalreport' ? 'selected' : ''}`} onClick={handleFinalReport}><img src="/src/files/icons/Final-Report.svg" alt="Final Report"/> Final Report</a>
                                        <a href="#" className={`participant ${selectedTool === 'participant' ? 'selected' : ''}`} onClick={handleParticipant}><img src="/src/files/icons/Participant.svg" alt="Participant Data"/> Participant Data</a>
                                        <a href="#" className={`forum ${selectedTool === 'forum' ? 'selected' : ''}`} onClick={handleForum}><img src="/src/files/icons/Forum.svg" alt="Forum" /> Forum</a>
                                        <a href="#" className={`announcement ${selectedTool === 'announcement' ? 'selected' : ''}`} onClick={handleAnnouncement}><img src="/src/files/icons/Announcement.svg" alt="Announcement"/> Announcement</a>
                                        {/* Hapus tombol Logout yang terpisah */}
                                        {/* <a href="#" className="logout" onClick={handleLogout}><img src="/src/files/icons/Logout.svg"/> Logout</a> */}
                                    </div>
                                </div>
                                <img className="ut" src="/src/files/images/LogoUnitedTractors.png" alt="United Tractors Logo" />
                            </div>
                            <div className="filler">
                                {renderScreen()}
                            </div>
                        </div>
                    </div>
                );
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

export default Main;
