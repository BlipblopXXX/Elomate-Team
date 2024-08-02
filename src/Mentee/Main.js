import React, { useState, useEffect } from 'react';
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
        setCurrentScreen('profile');
        setSelectedTool('profile');
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
                            <div className="user">
                                <img className="icon1" onClick={handleEAP} src="/src/files/icons/Health.png"/>
                                <img className="icon2" onClick={handleGames} src="/src/files/icons/Games.png"/>
                                <img className="icon3" onClick={handleProfile} src="/src/files/icons/User.png"/>
                                <div className="user-text">
                                    <p><b>Nama Elomate</b></p>
                                    <p>Nomor Elomate</p>
                                </div>
                            </div>
                        </div>
                        <div className="divider">
                            <div className="toolbar">
                                <div className="toollist">
                                    <div className="role">
                                        <div className="role-title">
                                            <p href="#"><img src="/src/files/icons/Role.png"/> Role</p>
                                        </div>
                                        <div className="role-details">
                                            <p><b>Management Trainee</b></p>
                                            <p>Batch {batchNumber}</p>
                                        </div>
                                    </div>
                                    <div className="toolbutton">
                                    <a href="#" className={`dashboard ${selectedTool === 'dashboard' ? 'selected' : ''}`} onClick={handleDashboard}><img src="/src/files/icons/Dashboard.png"/> Dashboard</a>
                                    <a href="#" className={`schedule ${selectedTool === 'schedule' ? 'selected' : ''}`} onClick={handleSchedule}><img src="/src/files/icons/Schedule.png"/> Schedule</a>
                                    <a href="#" className={`preactivity ${selectedTool === 'preactivity' ? 'selected' : ''}`} onClick={handlePreActivity}><img src="/src/files/icons/PreActivity.png"/> Pre-Activity</a>
                                    <a href="#" className={`assignment ${selectedTool === 'assignment' ? 'selected' : ''}`} onClick={handleAssignment}><img src="/src/files/icons/Assignment.png"/> Assignment</a>
                                    <a href="#" className={`selfpeer ${selectedTool === 'selfpeer' ? 'selected' : ''}`} onClick={handleSelfPeer}><img src="/src/files/icons/SelfPeer.png"/> Assessment</a>
                                    <a href="#" className={`mentoring ${selectedTool === 'mentoring' ? 'selected' : ''}`} onClick={handleMentoring}><img src="/src/files/icons/Mentoring.png"/> Mentoring</a>
                                    <a href="#" className={`finalreport ${selectedTool === 'finalreport' ? 'selected' : ''}`} onClick={handleFinalReport}><img src="/src/files/icons/FinalReport.png"/> Final Report</a>
                                    <a href="#" className={`participant ${selectedTool === 'participant' ? 'selected' : ''}`} onClick={handleParticipant}><img src="/src/files/icons/Participant.png"/> Participant Data</a>
                                    <a href="#" className={`forum ${selectedTool === 'forum' ? 'selected' : ''}`} onClick={handleForum}><img src="/src/files/icons/Forum.png" /> Forum</a>
                                    <a href="#" className={`announcement ${selectedTool === 'announcement' ? 'selected' : ''}`} onClick={handleAnnouncement}><img src="/src/files/icons/Announcement.png"/> Announcement</a>
                                    <a href="#" className="logout" onClick={handleLogout}><img src="/src/files/icons/Logout.png"/> Logout</a>
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
