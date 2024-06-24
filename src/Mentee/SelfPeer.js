import React, { useState } from 'react';
import './SelfPeer.css';

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
    { nama: 'Naufal Romiz', statusSolution: 'Done', statusBehaviour: 'Not Yet' },
    { nama: 'Ali Alban', statusSolution: 'Not Yet', statusBehaviour: 'Not Yet' },
    { nama: 'Emmanuela Evelyn', statusSolution: 'Not Yet', statusBehaviour: 'Not Yet' },
    { nama: 'Doni', statusSolution: 'Done', statusBehaviour: 'Not Yet' }
];

function SelfPeer() {
    const [currentPage, setCurrentPage] = useState('main');
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [peerList, setPeerList] = useState(PeerList);
    const [selectedPeer, setSelectedPeer] = useState(null);
    const [answers, setAnswers] = useState({});

    const handleMain = () => {
        setCurrentPage('main');
        setSelectedTask(null);
        setSelectedQuestion(null);
        setSelectedPeer(null);
        setAnswers({});
    };

    const handleSecond = (task, role) => {
        setSelectedTask(task);
        if (role === 'Self') {
            setCurrentPage('second');
            if (task.title === 'SOLUTION Culture') {
                setSelectedQuestion('Solution');
            } else if (task.title === '8 Behaviour Compentencies') {
                setSelectedQuestion('8 Behaviour Compentency');
            }
        } else if (role === 'Peer') {
            setCurrentPage('peerList');
        }
    };

    const handlePeerSelected = (person) => {
        if ((selectedTask.title === 'SOLUTION Culture' && person.statusSolution === 'Not Yet') ||
            (selectedTask.title === '8 Behaviour Compentencies' && person.statusBehaviour === 'Not Yet')) {
            setSelectedPeer(person);
            setCurrentPage('second');
            if (selectedTask.title === 'SOLUTION Culture') {
                setSelectedQuestion('Solution');
            } else if (selectedTask.title === '8 Behaviour Compentencies') {
                setSelectedQuestion('8 Behaviour Compentency');
            }
        }
    };

    const handleAnswerClick = (questionIndex, value) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionIndex]: value
        }));
    };

    const handleSubmit = () => {
        const questions = selectedPeer ? 
            PeerQuestion.filter(item => item.title2 === selectedQuestion) : 
            SelfQuestion.filter(item => item.title2 === selectedQuestion);

        for (let i = 0; i < questions.length; i++) {
            if (!answers.hasOwnProperty(i)) {
                alert("Ada pertanyaan yang belum diisi");
                return;
            }
        }

        if (selectedPeer) {
            setPeerList(prevList => 
                prevList.map(person => {
                    if (person.nama === selectedPeer.nama) {
                        if (selectedTask.title === 'SOLUTION Culture') {
                            return { ...person, statusSolution: 'Done' };
                        } else if (selectedTask.title === '8 Behaviour Compentencies') {
                            return { ...person, statusBehaviour: 'Done' };
                        }
                    }
                    return person;
                })
            );
        }
        handleMain();
    };

    const renderCard = () => {
        const filteredphase = cards.filter(card => card.selectedphase === 'option1'); // Sesuaikan dengan logika pemilihan fase Anda

        return filteredphase.map((selfpeer, index) => (
            <div key={index} className="selfpeer-item">
                <div className="description">
                    <img className="selfpeer-img" src="/src/files/icons/TaskImg.png" alt="Task" />
                    <div className="selfpeer-text">
                        <div className="selfpeer-title"><b>{selfpeer.title}</b></div>
                        <div className="selfpeer-batch">{selfpeer.no}</div>
                    </div>                    
                </div>     
                <div className="TwinButton">
                        <button className="self-button" onClick={() => handleSecond(selfpeer, 'Self')}>Self</button>
                        <button className="peer-button" onClick={() => handleSecond(selfpeer, 'Peer')}>Peer</button>
                </div>           
            </div>
        ));
    };

    const renderQuestion = () => {
        const questions = selectedPeer ? 
            PeerQuestion.filter(item => item.title2 === selectedQuestion) : 
            SelfQuestion.filter(item => item.title2 === selectedQuestion);

        return questions.map((question, index) => (
            <div key={index}>
                {index + 1}. {question.question}
                <div className="buttonPosition">
                    {[1, 2, 3, 4].map(value => (
                        <button 
                            key={value}
                            className={`btnGhost ${answers[index] === value ? 'selected' : ''}`}
                            onClick={() => handleAnswerClick(index, value)}
                        >
                            {value}
                        </button>
                    ))}
                </div>
            </div>
        ));
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
                                <select className="phaseselect">
                                    <option value="option1">Phase 10</option>
                                    <option value="option2">Phase 20+70 OJT1</option>
                                    <option value="option3">Phase 20+70 OJT2</option>
                                    <option value="option4">Phase 20+70 OJT3</option>
                                </select>
                            </div>
                        </div>
                        <hr />
                        <div className="selfpeer-rc">
                            {renderCard()}
                        </div>
                    </div>
                );
            case 'second':
                return (
                    <div className="selfpeer">
                        <div className="title2">
                            <img className="backbutton" onClick={handleMain} src="/src/files/icons/backbutton.png" alt="Back Button" />
                            <h><b>{selectedQuestion}</b></h>
                        </div>
                        <hr />
                        <div className="question-container">
                            {renderQuestion()}
                            <div className="submitButton">
                                <button className="submit" onClick={handleSubmit}> <b>Submit</b> </button>
                            </div>
                        </div>
                        <div className="question-container-scale">
                            <h><b>Skala Penilaian</b></h>
                            <p className="numberOne">1 &nbsp;&nbsp; Sangat Tidak Sesuai </p>
                            <p className="numberTwo">2 &nbsp;&nbsp; Tidak Sesuai </p>
                            <p className="numberThree">3 &nbsp;&nbsp; Sesuai </p>
                            <p className="numberFour">4 &nbsp;&nbsp; Sangat Sesuai </p>
                        </div>
                    </div>
                );
            case 'peerList':
                return (
                    <div className="selfpeer">
                        <div className="title3">
                            <img className="backbutton" src="/src/files/icons/backbutton.png" onClick={handleMain} alt="Back Button" />
                            <h><b>Peer Assessment - Daftar Nama</b></h>
                        </div>
                        <hr />
                        <div className='table-PL'>
                            <div className="table-header">
                                <div className="peer-no">No</div>
                                <div className="peer-name">Nama</div>
                                <div className="peer-status">Status</div>
                            </div>
                            <div className="peer-list">
                                {peerList.map((person, index) => (
                                    <div
                                        key={index}
                                        className={`peer-item ${((selectedTask.title === 'SOLUTION Culture' && person.statusSolution === 'Done') ||
                                            (selectedTask.title === '8 Behaviour Compentencies' && person.statusBehaviour === 'Done')) ? 'disabled' : ''}`}
                                        onClick={() => handlePeerSelected(person)}
                                        style={{ cursor: ((selectedTask.title === 'SOLUTION Culture' && person.statusSolution === 'Done') ||
                                            (selectedTask.title === '8 Behaviour Compentencies' && person.statusBehaviour === 'Done')) ? 'not-allowed' : 'pointer' }}
                                    >
                                        <div className="peer-no">{index + 1}.</div>
                                        <div className="peer-name">{person.nama}</div>
                                        <div className="peer-status">
                                            {selectedTask.title === 'SOLUTION Culture' ? person.statusSolution : person.statusBehaviour}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return <div>{renderPage()}</div>;
}

export default SelfPeer;
