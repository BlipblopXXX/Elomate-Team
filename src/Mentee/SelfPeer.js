import React, { useState } from 'react';
import './SelfPeer.css';

const courses = [
    { selectedphase: 'option1', selectedtopic: 'Phase 10' },
    { selectedphase: 'option2', selectedtopic: 'Phase 20+70 OJT1' },
    { selectedphase: 'option3', selectedtopic: 'Phase 20+70 OJT2' },
    { selectedphase: 'option4', selectedtopic: 'Phase 20+70 OJT3' }
];

const roles = [
    { selectedphase: 'option1', selectedrole: 'Self' },
    { selectedphase: 'option2', selectedrole: 'Peer' }
];

const cards = [
    { title: 'SOLUTION Culture', selectedphase: 'option1', no: 'Batch ' },
    { title: '8 Behaviour Compentencies', selectedphase: 'option1', no: 'Batch ' },
    { title: 'SOLUTION Culture', selectedphase: 'option2', no: 'Batch ' },
    { title: '8 Behaviour Compentencies', selectedphase: 'option2', no: 'Batch ' },
    { title: 'SOLUTION Culture', selectedphase: 'option3', no: 'Batch ' },
    { title: '8 Behaviour Compentencies', selectedphase: 'option3', no: 'Batch ' },
    { title: 'SOLUTION Culture', selectedphase: 'option4', no: 'Batch ' },
    { title: '8 Behaviour Compentencies', selectedphase: 'option4', no: 'Batch ' }
];

const SelfQuestion = [
    { title: 'Self Assessment', title2: 'Solution', question: 'Seberapa sering anda menerapkan nilai serve?' },
    { title: 'Self Assessment', title2: 'Solution', question: 'Seberapa besar pemahan anda tentang nilai Organized?' },
    { title: 'Self Assessment', title2: 'Solution', question: 'Seberapa besar pemahaman anda tentang nilai Vision & Business Sense?' },
    { title: 'Self Assessment', title2: 'Solution', question: 'Seberapa sering anda menerapkan nilai Interpersonal Skill dengan baik?' },
    { title: 'Self Assessment', title2: 'Solution', question: 'Seberapa besar pemahaman anda tentang nilai uniqueness?' },
    { title: 'Self Assessment', title2: '8 Behaviour Compentency', question: 'Vision and Business Sense' },
    { title: 'Self Assessment', title2: '8 Behaviour Compentency', question: 'Analysis & Judgement' },
    { title: 'Self Assessment', title2: '8 Behaviour Compentency', question: 'Customer Focus' },
    { title: 'Self Assessment', title2: '8 Behaviour Compentency', question: 'Drive & Courage' },
    { title: 'Self Assessment', title2: '8 Behaviour Compentency', question: 'Teamwork' },
    { title: 'Self Assessment', title2: '8 Behaviour Compentency', question: 'Planning & Driving Action' },
    { title: 'Self Assessment', title2: '8 Behaviour Compentency', question: 'Interpersonal Skill' },
    { title: 'Self Assessment', title2: '8 Behaviour Compentency', question: 'Leading & Motivating' }
];

const PeerQuestion = [
    { title: 'Peer Assessment', title2: 'Solution', question: 'Seberapa sering anda menerapkan nilai serve?' },
    { title: 'Peer Assessment', title2: 'Solution', question: 'Seberapa besar pemahan anda tentang nilai Organized?' },
    { title: 'Peer Assessment', title2: 'Solution', question: 'Seberapa besar pemahaman anda tentang nilai Vision & Business Sense?' },
    { title: 'Peer Assessment', title2: 'Solution', question: 'Seberapa sering anda menerapkan nilai Interpersonal Skill dengan baik?' },
    { title: 'Peer Assessment', title2: 'Solution', question: 'Seberapa besar pemahaman anda tentang nilai uniqueness?' },
    { title: 'Peer Assessment', title2: '8 Behaviour Compentency', question: 'Vision and Business Sense' },
    { title: 'Peer Assessment', title2: '8 Behaviour Compentency', question: 'Analysis & Judgement' },
    { title: 'Peer Assessment', title2: '8 Behaviour Compentency', question: 'Customer Focus' },
    { title: 'Peer Assessment', title2: '8 Behaviour Compentency', question: 'Drive & Courage' },
    { title: 'Peer Assessment', title2: '8 Behaviour Compentency', question: 'Teamwork' },
    { title: 'Peer Assessment', title2: '8 Behaviour Compentency', question: 'Planning & Driving Action' },
    { title: 'Peer Assessment', title2: '8 Behaviour Compentency', question: 'Interpersonal Skill' },
    { title: 'Peer Assessment', title2: '8 Behaviour Compentency', question: 'Leading & Motivating' }
];

const PeerList = [
    { nama: 'Naufal Romiz', status: 'Done' },
    { nama: 'Ali Alban', status: 'Not Yet' },
    { nama: 'Emmanuela Evelyn', status: 'Not Yet' },
    { nama: 'Doni', status: 'Done' }
];

function SelfPeer() {
    const [currentPage, setCurrentPage] = useState('main');
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [peerList, setPeerList] = useState(PeerList);
    const [selectedPeer, setSelectedPeer] = useState(null);

    const [selectedPhase, setSelectedPhase] = useState('option1');
    const [selectedRole, setSelectedRole] = useState('Self');

    const handlePhaseChange = (event) => {
        setSelectedPhase(event.target.value);
    };

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleMain = () => {
        setCurrentPage('main');
        setSelectedTask(null);
        setSelectedQuestion(null);
        setSelectedPeer(null);
    };

    const handleSecond = (task) => {
        setSelectedTask(task);
        if (selectedRole === 'Self' && task.title === 'SOLUTION Culture') {
            setCurrentPage('second');
            setSelectedQuestion('Solution');
        } else if (selectedRole === 'Self' && task.title === '8 Behaviour Compentencies') {
            setCurrentPage('second');
            setSelectedQuestion('8 Behaviour Compentency');
        } else if (selectedRole === 'Peer' && task.title === 'SOLUTION Culture') {
            setCurrentPage('peerList');
            setSelectedQuestion('Solution');
        } else if (selectedRole === 'Peer' && task.title === '8 Behaviour Compentencies') {
            setCurrentPage('peerList');
            setSelectedQuestion('8 Behaviour Compentency');
        } else {
            return null;
        }
    };

    const handlePeerSelected = (person) => {
        if (person.status === 'Not Yet') {
            setSelectedPeer(person);
            setCurrentPage('second');
        }
    };

    const renderCard = () => {
        const filteredphase = cards.filter(card => card.selectedphase === selectedPhase);

        return filteredphase.map((selfpeer, index) => (
            <div key={index} className="selfpeer-item">
                <div className="description">
                    <img className="selfpeer-img" src="/src/files/icons/TaskImg.png" alt="
                    Task" />
                    <div className="selfpeer-text">
                        <div className="selfpeer-title">{selfpeer.title}</div>
                        <div className="selfpeer-batch">{selfpeer.no}</div>
                    </div>
                </div>
                <div className="TwinButton">
                    <div className="selfpeer-button" onClick={() => handleSecond(selfpeer)}>Mulai Isi Penilaian</div>
                </div>
            </div>
        ));
    };

    const renderQuestion = () => {
        const questions1 = SelfQuestion.filter(item => item.title2 === selectedQuestion);
        const questions2 = PeerQuestion.filter(item => item.title2 === selectedQuestion);

        if (selectedRole === 'Self') {
            return questions1.map((question, index) => (
                <div key={index}>
                    {index + 1}. {question.question}
                    <div className="buttonPosition">
                        <button className="btnGhost">1</button>
                        <button className="btnGhost">2</button>
                        <button className="btnGhost">3</button>
                        <button className="btnGhost">4</button>
                        <button className="btnGhost">5</button>
                    </div>
                </div>
            ));
        } else if (selectedRole === 'Peer') {
            return questions2.map((question, index) => (
                <div key={index}>
                    {index + 1}. {question.question}
                    <div className="buttonPosition">
                        <button className="btnGhost">1</button>
                        <button className="btnGhost">2</button>
                        <button className="btnGhost">3</button>
                        <button className="btnGhost">4</button>
                        <button className="btnGhost">5</button>
                    </div>
                </div>
            ));
        } else {
            return null;
        }
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'main':
                return (
                    <div className="selfpeer">
                        <div className="title1">
                            <h><b>Assessment</b></h>
                        </div>
                        <div className="Dropdown">
                            <div className="phasetitle">
                                <a>Phase</a>
                                <select className="phaseselect" value={selectedPhase} onChange={handlePhaseChange}>
                                    <option value="option1">Phase 10</option>
                                    <option value="option2">Phase 20+70 OJT1</option>
                                    <option value="option3">Phase 20+70 OJT2</option>
                                    <option value="option4">Phase 20+70 OJT3</option>
                                </select>
                            </div>

                            <div className="roletitle">
                                <a>Role</a>
                                <select className="role" value={selectedRole} onChange={handleRoleChange}>
                                    <option value="Self">Self</option>
                                    <option value="Peer">Peer</option>
                                </select>
                            </div>
                        </div>
                        <hr />
                        <div className="selfpeer">
                            {renderCard()}
                        </div>
                    </div>
                );
            case 'second':
                return (
                    <div className="selfpeer">
                        <div className="title2">
                            <img onClick={handleMain} src="/src/files/icons/backbutton.png" alt="Back Button" />
                            <h><b>{selectedQuestion}</b></h>
                        </div>
                        <hr />
                        <div className="question-container">
                            {renderQuestion()}
                            <div className="submitButton">
                                <button className="submit"> <b>Submit</b> </button>
                            </div>
                        </div>
                        <div className="question-container-scale">
                            <h><b>Skala Penilaian</b></h>
                            <p className="numberOne">1 &nbsp;&nbsp; Sangat Kurang </p>
                            <p className="numberTwo">2 &nbsp;&nbsp; Kurang </p>
                            <p className="numberThree">3 &nbsp;&nbsp; Cukup </p>
                            <p className="numberFour">4 &nbsp;&nbsp; Baik </p>
                            <p className="numberFive">5 &nbsp;&nbsp; Sangat Baik </p>
                        </div>
                    </div>
                );
            case 'peerList':
                return (
                    <div className="selfpeer">
                        <div className="title3">
                            <img src="/src/files/icons/backbutton.png" onClick={handleMain} alt="Back Button" />
                            <h><b>Peer Assessment - Daftar Nama</b></h>
                        </div>
                        <hr />
                        <div className="table-header">
                            <div className="peer-name">Nama</div>
                            <div className="peer-status">Status</div>
                        </div>
                        <div className="peer-list">
                            {peerList.map((person, index) => (
                                <div
                                    key={index}
                                    className={`peer-item ${person.status === 'Done' ? 'disabled' : ''}`}
                                    onClick={() => handlePeerSelected(person)}
                                    style={{ cursor: person.status === 'Done' ? 'not-allowed' : 'pointer' }}
                                >
                                    <div className="peer-name">{person.nama}</div>
                                    <div className="peer-status">{person.status}</div>
                                </div>
                            ))}
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

export default SelfPeer;

