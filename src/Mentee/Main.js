import React, { useState } from 'react';
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
    };

    const handleSchedule = () => {
        setCurrentScreen('schedule');
    };

    const handleParticipant = () => {
        setCurrentScreen('participant');
    };

    const handlePreActivity = () => {
        setCurrentScreen('preactivity');
    }

    const handleForum = () => {
        setCurrentScreen('forum');
    }

    const handleAssignment = () => {
        setCurrentScreen('assignment');
    }

    const handleSelfPeer = () => {
        setCurrentScreen('selfpeer');
    }

    const handleFinalReport = () => {
        setCurrentScreen('finalreport');
    }

    const handleAnnouncement = () => {
        setCurrentScreen('announcement');
    }

    const handleMentoring = () => {
        setCurrentScreen('mentoring');
    }

    const handleProfile = () => {
        setCurrentScreen('profile');
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
                                            <p>United Tractors</p>
                                        </div>
                                    </div>
                                    <div className="toolbutton">
                                        <a href="#" className="dashboard" onClick={handleDashboard}><img src="/src/files/icons/Dashboard.png"/> Dashboard</a>
                                        <a href="#" className="schedule" onClick={handleSchedule}><img src="/src/files/icons/Schedule.png"/> Schedule</a>
                                        <a href="#" className="preactivity" onClick={handlePreActivity}><img src="/src/files/icons/PreActivity.png"/> Pre-Activity</a>
                                        <a href="#" className="assignment" onClick={handleAssignment}><img src="/src/files/icons/Assignment.png"/> Assignment</a>
                                        <a href="#" className="selfpeer" onClick={handleSelfPeer}><img src="/src/files/icons/SelfPeer.png"/> Self & Peer Assessment</a>
                                        <a href="#" className="mentoring" onClick={handleMentoring}><img src="/src/files/icons/Mentoring.png"/> Mentoring</a>
                                        <a href="#" className="finalreport" onClick={handleFinalReport}><img src="/src/files/icons/FinalReport.png"/> Final Report</a>
                                        <a href="#" className="participant" onClick={handleParticipant}><img src="/src/files/icons/Participant.png"/> Participant Data</a>
                                        <a href="#" className="forum" onClick={handleForum}><img src="/src/files/icons/Forum.png" /> Forum</a>
                                        <a href="#" className="announcement" onClick={handleAnnouncement}><img src="/src/files/icons/Announcement.png"/> Announcement</a>
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
