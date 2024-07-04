import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SelfPeer.css';

const baseURL = 'http://localhost:3001';

const cards = [
    { title: 'SOLUTION Culture', selectedphase: 'option1', no: 'Batch ' },
    { title: '8 Behaviour Competencies', selectedphase: 'option1', no: 'Batch ' },
    { title: 'SOLUTION Culture', selectedphase: 'option2', no: 'Batch ' },
    { title: '8 Behaviour Competencies', selectedphase: 'option2', no: 'Batch ' },
    { title: 'SOLUTION Culture', selectedphase: 'option3', no: 'Batch ' },
    { title: '8 Behaviour Competencies', selectedphase: 'option3', no: 'Batch ' },
    { title: 'SOLUTION Culture', selectedphase: 'option4', no: 'Batch ' },
    { title: '8 Behaviour Competencies', selectedphase: 'option4', no: 'Batch ' }
];

const SelfQuestion = [
    { title: 'Self Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Bersikap dengan sopan dan ramah' },
    { title: 'Self Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Menunda-nunda pekerjaan' },
    { title: 'Self Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Mematuhi semua peraturan yang berlaku' },
    { title: 'Self Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Mengelola waktu secara efisien' },
    { title: 'Self Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Memiliki semangat juang dan pantang menyerah' },
    { title: 'Self Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Berani mengambil peran positif untuk menyelesaikan masalah' },
    { title: 'Self Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Menolak keceriaan di lingkungan kerja (terlalu kaku & formal)' },
    { title: 'Self Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Mampu memotivasi diri sendiri untuk berpikir & bertindak berbeda dari biasanya' },
    { title: 'Self Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Menunjukkan kesesuaian kata dan perbuatan' },
    { title: 'Self Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Merupakan pribadi yang penuh rasa ingin tahu' },
    { title: 'Self Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Melihat tantangan sebagai peluang untuk melakukan perbaikan atau inovasi' },
    { title: 'Self Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Menghargai pendapat dan hasil kerja orang lain' },
    { title: 'Self Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Pribadi yang mudah beradaptasi'},
    { title: 'Self Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Menjaga hubungan internal atau eksternal yang terbentuk secara efektif' },
    { title: 'Self Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Menerima masukkan, kritik, dan saran untuk mengembangkan kualitas diri' },
    { title: 'Self Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Memahami arah bisnis perusahaan di masa datang dan menerjemahkan pemahaman tersebut ke dalam strategi jangka pendek & jangka panjang' },
    { title: 'Self Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Mampu merumuskan strategi secara jelas dan terukur' },
    { title: 'Self Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Memiliki keterampilan membangun hubungan yang konstruktif dan efektif' },
    { title: 'Self Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Mampu menyampaikan pandangan atau ide secara jelas dan percaya diri' },
    { title: 'Self Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Terbuka pada feed back (umpan balik)' },
    { title: 'Self Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Melakukan layanan pelanggan yang unggul (customer delight) di unit kerjanya' },
    { title: 'Self Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Mampu mengidentifikasi akar suatu permasalahan dengan mengumpulkan dan menganalisa data yang tersedia' },
    { title: 'Self Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Mampu berpikir kreatif dan mengusulkan alternatif solusi dari suatu permasalahan' },
    { title: 'Self Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Fokus pada tujuan organisasi dengan menurunkannya ke dalam obyektif dan rencana kerja' },
    { title: 'Self Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Menerapkan PDCA dalam pekerjaan' },
    { title: 'Self Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Mampu memimpin tim dengan mengarahkan dan mendelegasikan tugas berdasarkan tuntutan pekerjaan yang sesuai dengan kemampuan dan kepribadiannya' },
    { title: 'Self Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Berperilaku sesuai SOLUTION dalam kapasitasnya sebagai pemimpin' },
    { title: 'Self Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Menyelesaikan tugas secara antusias dan optimis, dengan target kualitas yang tinggi' },
    { title: 'Self Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Memiliki kemauan dan usaha untuk mempelajari pengetahuan, keterampilan dan budaya baru' },
    { title: 'Self Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Membina kerja sama yang efektif dengan berbagai pihak dalam rangka penyelesaian tugas' },
    { title: 'Self Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Mempertimbangkan perbedaan individu, menghormati perbedaan yang ada, dan memanfaatkan secara positif keragaman yang ada' }
];

const PeerQuestion = [
    { title: 'Peer Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Bersikap dengan sopan dan ramah' },
    { title: 'Peer Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Menunda-nunda pekerjaan' },
    { title: 'Peer Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Mematuhi semua peraturan yang berlaku' },
    { title: 'Peer Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Mengelola waktu secara efisien' },
    { title: 'Peer Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Memiliki semangat juang dan pantang menyerah' },
    { title: 'Peer Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Berani mengambil peran positif untuk menyelesaikan masalah' },
    { title: 'Peer Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Menolak keceriaan di lingkungan kerja (terlalu kaku & formal)' },
    { title: 'Peer Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Mampu memotivasi diri sendiri untuk berpikir & bertindak berbeda dari biasanya' },
    { title: 'Peer Assessment', title2: 'Solution', qassessmentTopic: 1, uestion: 'Menunjukkan kesesuaian kata dan perbuatan' },
    { title: 'Peer Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Merupakan pribadi yang penuh rasa ingin tahu' },
    { title: 'Peer Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Melihat tantangan sebagai peluang untuk melakukan perbaikan atau inovasi' },
    { title: 'Peer Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Menghargai pendapat dan hasil kerja orang lain' },
    { title: 'Peer Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Pribadi yang mudah beradaptasi'},
    { title: 'Peer Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Menjaga hubungan internal atau eksternal yang terbentuk secara efektif' },
    { title: 'Peer Assessment', title2: 'Solution', assessmentTopic: 1, question: 'Menerima masukkan, kritik, dan saran untuk mengembangkan kualitas diri' },
    { title: 'Peer Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Memahami arah bisnis perusahaan di masa datang dan menerjemahkan pemahaman tersebut ke dalam strategi jangka pendek & jangka panjang' },
    { title: 'Peer Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Mampu merumuskan strategi secara jelas dan terukur' },
    { title: 'Peer Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Memiliki keterampilan membangun hubungan yang konstruktif dan efektif' },
    { title: 'Peer Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Mampu menyampaikan pandangan atau ide secara jelas dan percaya diri' },
    { title: 'Peer Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Terbuka pada feed back (umpan balik)' },
    { title: 'Peer Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Melakukan layanan pelanggan yang unggul (customer delight) di unit kerjanya' },
    { title: 'Peer Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Mampu mengidentifikasi akar suatu permasalahan dengan mengumpulkan dan menganalisa data yang tersedia' },
    { title: 'Peer Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Mampu berpikir kreatif dan mengusulkan alternatif solusi dari suatu permasalahan' },
    { title: 'Peer Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Fokus pada tujuan organisasi dengan menurunkannya ke dalam obyektif dan rencana kerja' },
    { title: 'Peer Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Menerapkan PDCA dalam pekerjaan' },
    { title: 'Peer Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Mampu memimpin tim dengan mengarahkan dan mendelegasikan tugas berdasarkan tuntutan pekerjaan yang sesuai dengan kemampuan dan kepribadiannya' },
    { title: 'Peer Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Berperilaku sesuai SOLUTION dalam kapasitasnya sebagai pemimpin' },
    { title: 'Peer Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Menyelesaikan tugas secara antusias dan optimis, dengan target kualitas yang tinggi' },
    { title: 'Peer Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Memiliki kemauan dan usaha untuk mempelajari pengetahuan, keterampilan dan budaya baru' },
    { title: 'Peer Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Membina kerja sama yang efektif dengan berbagai pihak dalam rangka penyelesaian tugas' },
    { title: 'Peer Assessment', title2: '8 Behaviour Competencies', assessmentTopic: 2, question: 'Mempertimbangkan perbedaan individu, menghormati perbedaan yang ada, dan memanfaatkan secara positif keragaman yang ada' }
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
            } else if (task.title === '8 Behaviour Competencies') {
                setSelectedQuestion('8 Behaviour Competencies');
            }
        } else if (role === 'Peer') {
            setCurrentPage('peerList');
        }
    };

    const handlePeerSelected = (person) => {
        if ((selectedTask.title === 'SOLUTION Culture' && person.statusSolution === 'Not Yet') ||
            (selectedTask.title === '8 Behaviour Competencies' && person.statusBehaviour === 'Not Yet')) {
            setSelectedPeer(person);
            setCurrentPage('second');
            if (selectedTask.title === 'SOLUTION Culture') {
                setSelectedQuestion('Solution');
            } else if (selectedTask.title === '8 Behaviour Competencies') {
                setSelectedQuestion('8 Behaviour Competencies');
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
                        } else if (selectedTask.title === '8 Behaviour Competencies') {
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
    
        const scale = selectedTask.title === '8 Behaviour Competencies' ? [1, 2, 3, 4, 5] : [1, 2, 3, 4];
    
        return questions.map((question, index) => (
            <div key={index}>
                {index + 1}. {question.question}
                <div className="buttonPosition">
                    {scale.map(value => (
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
                            {selectedTask.title === '8 Behaviour Competencies' ? (
                                <>
                                    <p className="numberThree">3 &nbsp;&nbsp; Cukup Sesuai </p>
                                    <p className="numberFour">4 &nbsp;&nbsp; Sesuai </p>
                                    <p className="numberFive">5 &nbsp;&nbsp; Sangat Sesuai </p>
                                </>
                            ) : (
                                <>
                                    <p className="numberThree">3 &nbsp;&nbsp; Sesuai </p>
                                    <p className="numberFour">4 &nbsp;&nbsp; Sangat Sesuai </p>
                                </>
                            )}
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
                                            (selectedTask.title === '8 Behaviour Competencies' && person.statusBehaviour === 'Done')) ? 'disabled' : ''}`}
                                        onClick={() => handlePeerSelected(person)}
                                        style={{ cursor: ((selectedTask.title === 'SOLUTION Culture' && person.statusSolution === 'Done') ||
                                            (selectedTask.title === '8 Behaviour Competencies' && person.statusBehaviour === 'Done')) ? 'not-allowed' : 'pointer' }}
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
