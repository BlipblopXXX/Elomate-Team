import React, { useState, useEffect } from 'react';
import './Assignment.css';

const courses = [
    {selectedPhase: 'Phase 10', selectedTopic: 'General Development', name: 'On Boarding', no: 'No Batch'},
    {selectedPhase: 'Phase 10', selectedTopic: 'General Development', name: 'SOLUTION Culture', no: 'No Batch'},
    {selectedPhase: 'Phase 10', selectedTopic: 'General Development', name: 'Behaviour Competencies', no: 'No Batch'},
    {selectedPhase: 'Phase 10', selectedTopic: 'General Development', name: 'Business Process UT', no: 'No Batch'},
    {selectedPhase: 'Phase 10', selectedTopic: 'General Development', name: 'Kebhinekaan', no: 'No Batch'},
    {selectedPhase: 'Phase 10', selectedTopic: 'General Development', name: 'BMS', no: 'No Batch'},
    {selectedPhase: 'Phase 10', selectedTopic: 'General Development', name: 'Basic Mentoring', no: 'No Batch'},
    {selectedPhase: 'Phase 10', selectedTopic: 'General Development', name: 'Project Management', no: 'No Batch'},
    {selectedPhase: 'Phase 10', selectedTopic: 'Orientasi Divisi', name: 'Business Process Divisi', no: 'No Batch'},
    {selectedPhase: 'Phase 10', selectedTopic: 'Orientasi Divisi', name: 'Functional BMC', no: 'No Batch'},
    {selectedPhase: 'Phase 10', selectedTopic: 'Orientasi Divisi', name: 'Case Studies', no: 'No Batch'},
    {selectedPhase: 'Phase 10', selectedTopic: 'BGMS', name: 'Character Building', no: 'No Batch'},
    {selectedPhase: 'Phase 10', selectedTopic: 'BGMS', name: 'Teamwork', no: 'No Batch'},
    {selectedPhase: 'Phase 10', selectedTopic: 'BGMS', name: 'Drive & Courage', no: 'No Batch'},
    {selectedPhase: 'Phase 10', selectedTopic: 'NEOP', name: 'Executive Sharing', no: 'No Batch'},
    {selectedPhase: 'Phase 10', selectedTopic: 'NEOP', name: 'Corporate Value', no: 'No Batch'},
    {selectedPhase: 'Phase 10', selectedTopic: 'NEOP', name: 'AHEMCE Value Chain', no: 'No Batch'},
    {selectedPhase: 'Phase 10', selectedTopic: 'NEOP', name: 'Business Process AHEMCE', no: 'No Batch'},
    {selectedPhase: 'Phase 10', selectedTopic: 'NEOP', name: 'Personal Branding', no: 'No Batch'},
    {selectedPhase: 'Phase 10', selectedTopic: 'Review1', name: 'Review 1', no: 'No Batch'},
    {selectedPhase: 'Phase 20 + 70', selectedTopic: 'Project', name: 'Final Project', no: 'No Batch'},
    {selectedPhase: 'Phase 20 + 70', selectedTopic: 'Review2', name: 'Review 2', no: 'No Batch'},
    {selectedPhase: 'Phase 20 + 70', selectedTopic: 'Review2', name: 'Review 3', no: 'No Batch'},
    {selectedPhase: 'Phase 20 + 70', selectedTopic: 'Review2', name: 'Review 4', no: 'No Batch'},
    {selectedPhase: 'Phase 20 + 70', selectedTopic: 'Review2', name: 'Review 5', no: 'No Batch'},
    {selectedPhase: 'Phase 20 + 70', selectedTopic: 'Review2', name: 'Final Review', no: 'No Batch'}
]

const assign = [
    {name: 'On Boarding', title: 'Pre-Test', start: '1 Maret 2024', due: '17 March 2024', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'On Boarding', title: 'Post-Test', start: '1 Maret 2024', due: '30 March 2024', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'SOLUTION Culture', title: 'Pre-Test', start: '1 Maret 2024', due: '17 March 2024', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'SOLUTION Culture', title: 'Post-Test', start: '1 Maret 2024', due: '30 March 2024', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Behaviour Competencies', title: 'Pre-Test', start: '1 Maret 2024', due: '17 March 2024', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Behaviour Competencies', title: 'Post-Test', start: '1 Maret 2024', due: '30 March 2024', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Business Process UT', title: 'Pre-Test', start: '1 Maret 2024', due: '17 March 2024', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Business Process UT', title: 'Post-Test', start: '1 Maret 2024', due: '30 March 2024', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Kebhinekaan', title: 'Pre-Test', start: '1 Maret 2024', due: '17 March 2024', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Kebhinekaan', title: 'Post-Test', start: '1 Maret 2024', due: '30 March 2024', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'BMS', title: 'Pre-Test', start: '1 Maret 2024', due: '17 March 2024', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'BMS', title: 'Post-Test', start: '1 Maret 2024', due: '30 March 2024', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Basic Mentoring', title: 'Pre-Test', start: '1 Maret 2024', due: '17 March 2024', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Basic Mentoring', title: 'Post-Test', start: '1 Maret 2024', due: '30 March 2024', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Project Management', title: 'Pre-Test', start: '1 Maret 2024', due: '17 March 2024', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Project Management', title: 'Post-Test', start: '1 Maret 2024', due: '30 March 2024', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Business Process Divisi', title: 'Pre-Test', start: '1 Maret 2024', due: '17 March 2024', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Business Process Divisi', title: 'Post-Test', start: '1 Maret 2024', due: '30 March 2024', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Functional BMC', title: 'Pre-Test', start: '1 Maret 2024', due: '17 March 2024', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Functional BMC', title: 'Post-Test', start: '1 Maret 2024', due: '30 March 2024', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Case Studies', title: 'Pre-Test', start: '1 Maret 2024', due: '17 March 2024', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Case Studies', title: 'Post-Test', start: '1 Maret 2024', due: '30 March 2024', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Character Building', title: 'Pre-Test', start: '1 Maret 2024', due: '17 March 2024', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Character Building', title: 'Post-Test', start: '1 Maret 2024', due: '30 March 2024', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Teamwork', title: 'Pre-Test', start: '1 Maret 2024', due: '17 March 2024', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Teamwork', title: 'Post-Test', start: '1 Maret 2024', due: '30 March 2024', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Drive & Courage', title: 'Pre-Test', start: '1 Maret 2024', due: '17 March 2024', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Drive & Courage', title: 'Post-Test', start: '1 Maret 2024', due: '30 March 2024', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Executive Sharing', title: 'Pre-Test', start: '1 Maret 2024', due: '17 March 2024', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Executive Sharing', title: 'Post-Test', start: '1 Maret 2024', due: '30 March 2024', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Corporate Value', title: 'Pre-Test', start: '1 Maret 2024', due: '17 March 2024', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Corporate Value', title: 'Post-Test', start: '1 Maret 2024', due: '30 March 2024', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'AHEMCE Value Chain', title: 'Pre-Test', start: '1 Maret 2024', due: '17 March 2024', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'AHEMCE Value Chain', title: 'Post-Test', start: '1 Maret 2024', due: '30 March 2024', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Business Process AHEMCE', title: 'Pre-Test', start: '1 Maret 2024', due: '17 March 2024', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Business Process AHEMCE', title: 'Post-Test', start: '1 Maret 2024', due: '30 March 2024', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Personal Branding', title: 'Pre-Test', start: '1 Maret 2024', due: '17 March 2024', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Personal Branding', title: 'Post-Test', start: '1 Maret 2024', due: '30 March 2024', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Review 1', title: 'Meet', start: '1 Maret 2024', due: '-', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Review 1', title: 'Case', start: '1 Maret 2024', due: '-', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Review 2', title: 'Meet', start: '1 Maret 2024', due: '-', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Review 2', title: 'Case', start: '1 Maret 2024', due: '-', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Review 3', title: 'Meet', start: '1 Maret 2024', due: '-', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Review 3', title: 'Case', start: '1 Maret 2024', due: '-', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Review 4', title: 'Meet', start: '1 Maret 2024', due: '-', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Review 4', title: 'Case', start: '1 Maret 2024', due: '-', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Review 5', title: 'Meet', start: '1 Maret 2024', due: '-', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Review 5', title: 'Case', start: '1 Maret 2024', due: '-', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Final Review', title: 'Meet', start: '1 Maret 2024', due: '-', status: 'Completed', time: 60, type: 'Pilihan Ganda' , qcount: 10},
    {name: 'Final Review', title: 'Case', start: '1 Maret 2024', due: '-', status: 'Incompleted', time: 60, type: 'Pilihan Ganda' , qcount: 10},
]

const progress = [
    { selectedTopic: 'General Development', order: '1', name: 'On Boarding', value: 100 },
    { selectedTopic: 'General Development', order: '2', name: 'SOLUTION Culture', value: 50 },
    { selectedTopic: 'General Development', order: '3', name: 'Behaviour Competencies', value: 0 },
    { selectedTopic: 'General Development', order: '4', name: 'Business Process UT', value: 0 },
    { selectedTopic: 'General Development', order: '5', name: 'Kebhinekaan', value: 0 },
    { selectedTopic: 'General Development', order: '6', name: 'BMS', value: 0 },
    { selectedTopic: 'General Development', order: '7', name: 'Basic Mentoring', value: 0 },
    { selectedTopic: 'General Development', order: '8', name: 'Project Management', value: 0 },
    { selectedTopic: 'Orientasi Divisi', order: '1', name: 'Business Process Divisi', value: 0 },
    { selectedTopic: 'Orientasi Divisi', order: '2', name: 'Functional BMC', value: 0 },
    { selectedTopic: 'Orientasi Divisi', order: '3', name: 'Case Studies', value: 0 },
    { selectedTopic: 'BGMS', order: '1', name: 'Character Building', value: 0 },
    { selectedTopic: 'BGMS', order: '2', name: 'Teamwork', value: 0 },
    { selectedTopic: 'BGMS', order: '3', name: 'Drive & Courage', value: 0 },
    { selectedTopic: 'NEOP', order: '1', name: 'Executive Sharing', value: 0 },
    { selectedTopic: 'NEOP', order: '2', name: 'Corporate Value', value: 0 },
    { selectedTopic: 'NEOP', order: '3', name: 'AHEMCE Value Chain', value: 0 },
    { selectedTopic: 'NEOP', order: '4', name: 'Business Process AHEMCE', value: 0 },
    { selectedTopic: 'NEOP', order: '5', name: 'Personal Branding', value: 0 },
    { selectedTopic: 'Review1', order: '1', name: 'Review 1', value: 0 },
    { selectedTopic: 'Project', order: '1', name: 'Final Project', value: 0},
    { selectedTopic: 'Review2', order: '1', name: 'Review 2', value: 0 },
    { selectedTopic: 'Review2', order: '2', name: 'Review 3', value: 0 },
    { selectedTopic: 'Review2', order: '3', name: 'Review 4', value: 0 },
    { selectedTopic: 'Review2', order: '4', name: 'Review 5', value: 0 },
    { selectedTopic: 'Review2', order: '5', name: 'Final Review', value: 0 },
];

const questions = [
    {
        question: 'Apa yang dimaksud dengan integritas dalam konteks karakter?',
        options: ['A. Kejujuran', 'B. Keberanian', 'C. Kedisiplinan', 'D. Kesopanan']
    },
    {
        question: 'Bagaimana cara membangun karakter yang kuat?',
        options: ['A. Mengikuti aturan', 'B. Berlatih secara konsisten', 'C. Berbohong', 'D. Mengabaikan orang lain']
    },
    {
        question: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        options: ['A. Lorem ipsum dolor sit amet', 'B. consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.', 'C. quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.', 'D. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.']
    },
    {
        question: 'Bagaimana cara membangun karakter yang kuat?',
        options: ['A. Mengikuti aturan', 'B. Berlatih secara konsisten', 'C. Berbohong', 'D. Mengabaikan orang lain']
    },
    {
        question: 'Bagaimana cara membangun karakter yang kuat?',
        options: ['A. Mengikuti aturan', 'B. Berlatih secara konsisten', 'C. Berbohong', 'D. Mengabaikan orang lain']
    }, 
]; 

function Assignment() {
    const [currentPage, setCurrentPage] = useState('main');
    const [selectedPhase, setSelectedPhase] = useState('Phase 10');
    const [selectedTopic, setSelectedTopic] = useState('General Development');
    const [selectedAssign, setSelectedAssign] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedTest, setSelectedTest] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleMain = () => {
        setCurrentPage('main');
        setSelectedAssign(null);
        setSelectedTest(null);
    };

    const handleSecond = () => {
        setCurrentPage('second');
    };

    const handleStart = () => {
        setCurrentPage('fourth');
    };

    const handleThird = (assign) => {
        setCurrentPage('third');
        setSelectedAssign(assign.name);
        setSelectedTest(assign.title);
    };

    useEffect(() => {
        if (selectedPhase === 'Phase 10') {
            setSelectedTopic('General Development');
        } else if (selectedPhase === 'Phase 20 + 70') {
            setSelectedTopic('Project');
        }
    }, [selectedPhase]);

    useEffect(() => {
        if (currentPage === 'third' && selectedCourse) {
            setSelectedAssign(selectedCourse.name);
        }
    }, [currentPage, selectedCourse]);

    const handlePhaseChange = (event) => {
        setSelectedPhase(event.target.value);
    };

    const handleTopicChange = (event) => {
        setSelectedTopic(event.target.value);
    };
 

    const handleCourseClick = (course) => {
        setSelectedAssign(course.name);
        setSelectedCourse(course);
    };

    const handleStartClick = () => {
        if (window.confirm('Apakah Anda yakin ingin memulai mengerjakan soal ini?')) {
           handleStart();
        }
    };

    const handleFinishClick = () => {
        if (window.confirm('Apakah Anda yakin ingin menyelesaikan soal ini?')) {
            handleSecond();
        }
    };

    const handlePreviousClick = () => {
        setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleNextClick = () => {
        setCurrentQuestion((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
    };

    const getDescription = () => {
        const filteredCourses = courses.filter(course => course.selectedPhase === selectedPhase && course.selectedTopic === selectedTopic);

        return (
            <div className="course-container">
                {filteredCourses.map(course => {
                    const courseProgress = progress.find(prog => prog.name === course.name);
                    const progressValue = courseProgress ? courseProgress.value : 0;

                    return (
                        <div key={course.name} className="course" onClick={() => handleCourseClick(course)}>
                            <div className="description">
                                <img className="courseimg" src="/src/files/icons/CourseImg.png" alt="Course" />
                                <div className="course-text">
                                    <div className="course-name">{course.name}</div>
                                    <div className="course-no-batch">{course.no}</div>
                                </div>
                                <div className="progress-circle" style={{ background: `conic-gradient(#4caf50 ${progressValue * 3.6}deg, #e0e0e0 0deg)` }}>
                                    <div className="progress-value">{progressValue}%</div>
                                </div>
                            </div>
                            <hr />
                            <div className="course-button" onClick={handleSecond}>Click to View the activity</div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderSelected = () => {
        if (selectedAssign) {
            const selected = courses.find(item => item.name === selectedAssign);
            const courseProgress = progress.find(prog => prog.name === selectedAssign);
            const progressValue = courseProgress ? courseProgress.value : 0;

            if (selected) {
                return (
                    <div className="selected-details">
                        <div className="selected-name">{selected.name}</div>
                        <div className="selected-no">{selected.no}</div>
                        <div className="progress-divider">
                            <div className="progress-bar-container">
                                <div className="progress-bar" style={{ width: `${progressValue}%` }}></div>
                            </div>
                            <div className="progress-text">{progressValue}%</div>
                        </div>
                    </div>
                );
            }
        }
        return null;
    };

    const renderAssignDetails = () => {
        if (selectedAssign) {
            const assignDetails = assign.filter(a => a.name === selectedAssign);
            return assignDetails.map((assign, index) => {
                const course = courses.find(course => course.name === selectedAssign);
                if (course) {
                    const statusClass = assign.status.toLowerCase();
                    return (
                        <div key={index} className="assign-details">
                            <div className="assign-desc1">
                                <img className="assign-img" src="/src/files/icons/CourseImg.png" alt="Assignment" />
                                <div className="assign-description">
                                    <div className="assign-title">{assign.title}</div>
                                    <div className="assign-no">{course.no}</div>
                                </div>
                                <div className={`progress-circle ${statusClass}`} >
                                </div>
                            </div>
                            <div className="assign-desc2">
                                <div className="assign-bottomdivider">
                                    <div className="assign-duecombo">
                                        <div className="assign-duedet">Due</div>
                                        <div className="assign-due">{assign.due}</div>
                                    </div>
                                    <div>
                                        <div className="assign-statusdet">Status</div>
                                        <div className={`assign-status ${statusClass}`}>{assign.status}</div>
                                    </div>
                                </div>
                                <hr />
                                <div className="course-button" onClick={() => handleThird(assign)}>Click to View the activity</div>
                            </div>
                        </div>
                    );
                }
                return null;
            });
        }
        return null;
    };

    const renderAssignSelected = () => {
        if (selectedAssign) {
            const selectedAssignDetails = assign.filter(a => a.name === selectedAssign && a.title === selectedTest);

            return (
                <div>
                    {selectedAssignDetails.map((assignDetail, index) => (
                        <div key={index} className="assign-selected-details">
                            <div className="assign-title">
                                <span className="assign-detail-value">{assignDetail.title} Course</span>
                            </div>
                            <hr />
                            <div className="assign-top">
                                <div className="assign-detail">
                                    <span className="assign-detail-label">Start: </span>
                                    <span className="assign-detail-value">{assignDetail.start}</span>
                                </div>
                                <div className="assign-detail-due">
                                    <span className="assign-detail-label">Due: </span>
                                    <span className="assign-detail-value">{assignDetail.due}</span>
                                </div>
                                <div className="assign-detail">
                                    <span className="assign-detail-label">Time: </span>
                                    <span className="assign-detail-value">{assignDetail.time} minutes</span>
                                </div>
                            </div>
                            <div className="assign-bottom">
                                <div className="assign-detail">
                                    <span className="assign-detail-label">Type: </span>
                                    <span className="assign-detail-value">{assignDetail.type}</span>
                                </div>
                                <div className="assign-detail">
                                    <span className="assign-detail-label">Question Count: </span>
                                    <span className="assign-detail-value">{assignDetail.qcount}</span>
                                </div>
                                <div className="assign-button" onClick={handleStartClick}>Start</div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    const assignDetailsStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    };

    if (selectedAssign && assign.filter(item => item.name === selectedAssign).length % 3 === 0) {
        assignDetailsStyle.flexDirection = 'column';
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'main':
                return (
                    <div className="assignment1">
                        <div className="title">
                            <h><b>Assignment</b></h>
                        </div>
                        <div className="selecttile">
                            <div className="phase">
                                <label htmlFor="phaseDropdown">Phase</label>
                                <select className="phaseselect" id="phaseDropdown" value={selectedPhase} onChange={handlePhaseChange}>
                                    <option value="Phase 10">Phase 10</option>
                                    <option value="Phase 20 + 70">Phase 20 + 70</option>
                                </select>
                            </div>
                            <div className="topic">
                                <label htmlFor="topicDropdown">Topic</label>
                                <select className="topicselect" id="topicDropdown" value={selectedTopic} onChange={handleTopicChange}>
                                    {selectedPhase === "Phase 10" && (
                                        <>
                                            <option value="General Development">General Development</option>
                                            <option value="Orientasi Divisi">Orientasi Divisi</option>
                                            <option value="BGMS">BGMS</option>
                                            <option value="NEOP">NEOP</option>
                                            <option value="Review1">Review</option>
                                        </>
                                    )}
                                    {selectedPhase === "Phase 20 + 70" && (
                                        <>
                                            <option value="Project">Project</option>
                                            <option value="Review2">Review</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        </div>
                        <hr />
                        <div className="class">
                            {getDescription()}
                        </div>
                    </div>
                );
            case 'second':
                return (
                    <div className="assignment2">
                        <div className="title2">
                            <h><b>Assignment</b></h>
                        </div>
                        <hr />
                        <img className="backbutton" onClick={handleMain} src="/src/files/icons/backbutton.png" alt="Back" />
                        <div className="assign-selected">
                            {renderSelected()}
                        </div>
                        <hr />
                        <div className="assign-details-container" style={assignDetailsStyle}>
                            {renderAssignDetails()}
                        </div>
                    </div>
                );
            case 'third':
                return (
                    <div className="assignment3">
                        <div className="title3">
                            <h><b>Assignment</b></h>
                        </div>
                        <hr />
                        <img className="backbutton" onClick={handleSecond} src="/src/files/icons/backbutton.png" alt="Back" />
                        <div className="description">
                            <div className="course-text">
                                {selectedCourse && (
                                    <>
                                        <div className="course-name">{selectedCourse.name}</div>
                                        <div className="course-no-batch">{selectedCourse.no}</div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="assign-selected-container">
                            {renderAssignSelected()}
                        </div>
                    </div>
                );
            case 'fourth':
                return(
                    <div className="assignment4">
                        <div className="title4">
                            <img className="backbutton" onClick={handleSecond} src="/src/files/icons/backbutton.png" alt="Back" />
                            <h><b className='title'>Assignment</b></h>
                        </div>
                        <hr />
                        <div className="question-navigation">
                            {questions.map((_, index) => (
                                <button
                                    key={index}
                                    className={`question-number ${currentQuestion === index ? 'active' : ''}`}
                                    onClick={() => setCurrentQuestion(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <div className="question-container">
                            <div className="question">
                                {questions[currentQuestion].question}
                            </div>
                            <hr />
                            <div className="options">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <div key={index} className="option">
                                        <input type="radio" id={`option${index}`} name="option" />
                                        <label htmlFor={`option${index}`}>{option}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="navigation-buttons">
                                {currentQuestion > 0 && (
                                    <button onClick={handlePreviousClick}>Previous</button>
                                )}
                                {currentQuestion < questions.length - 1 ? (
                                    <button onClick={handleNextClick}>Next</button>
                                ) : (
                                    <button onClick={handleFinishClick}>Finish</button>
                                )}
                            </div>
                        </div>
                    </div>
                )
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

export default Assignment;
