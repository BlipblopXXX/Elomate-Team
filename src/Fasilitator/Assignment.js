import React, { useState, useEffect } from 'react';
import './Assignment.css';

const batchList = [
    { 
        batchName: 'Batch 1', 
        trainees: [
            { name: 'Naufal Romiz' },
            { name: 'Ali Alban' },
            { name: 'Emmanuela Evelyn' }
        ]
    },
    { 
        batchName: 'Batch 2', 
        trainees: [
            { name: 'John Doe' },
            { name: 'Jane Smith' },
            { name: 'Samuel Green' }
        ]
    }
];
  

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
    {name: 'On Boarding', title: 'Pre-Test', start: '2024-03-01', due: '2024-03-17', status: 'Completed', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'On Boarding', title: 'Post-Test', start: '2024-03-01', due: '2024-03-30', status: 'Incompleted', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'SOLUTION Culture', title: 'Pre-Test', start: '2024-03-01', due: '2024-03-17', status: 'Completed', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'SOLUTION Culture', title: 'Post-Test', start: '2024-03-01', due: '2024-03-30', status: 'Incompleted', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Behaviour Competencies', title: 'Pre-Test', start: '2024-03-01', due: '2024-03-17', status: 'Completed', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Behaviour Competencies', title: 'Post-Test', start: '2024-03-01', due: '2024-03-30', status: 'Incompleted', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Business Process UT', title: 'Pre-Test', start: '2024-03-01', due: '2024-03-17', status: 'Completed', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Business Process UT', title: 'Post-Test', start: '2024-03-01', due: '2024-03-30', status: 'Incompleted', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Kebhinekaan', title: 'Pre-Test', start: '2024-03-01', due: '2024-03-17', status: 'Completed', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Kebhinekaan', title: 'Post-Test', start: '2024-03-01', due: '2024-03-30', status: 'Incompleted', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'BMS', title: 'Pre-Test', start: '2024-03-01', due: '2024-03-17', status: 'Completed', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'BMS', title: 'Post-Test', start: '2024-03-01', due: '2024-03-30', status: 'Incompleted', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Basic Mentoring', title: 'Pre-Test', start: '2024-03-01', due: '2024-03-17', status: 'Completed', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Basic Mentoring', title: 'Post-Test', start: '2024-03-01', due: '2024-03-30', status: 'Incompleted', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Project Management', title: 'Pre-Test', start: '2024-03-01', due: '2024-03-17', status: 'Completed', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Project Management', title: 'Post-Test', start: '2024-03-01', due: '2024-03-30', status: 'Incompleted', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Business Process Divisi', title: 'Pre-Test', start: '2024-03-01', due: '2024-03-17', status: 'Completed', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Business Process Divisi', title: 'Post-Test', start: '2024-03-01', due: '2024-03-30', status: 'Incompleted', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Functional BMC', title: 'Pre-Test', start: '2024-03-01', due: '2024-03-17', status: 'Completed', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Functional BMC', title: 'Post-Test', start: '2024-03-01', due: '2024-03-30', status: 'Incompleted', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Case Studies', title: 'Pre-Test', start: '2024-03-01', due: '2024-03-17', status: 'Completed', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Case Studies', title: 'Post-Test', start: '2024-03-01', due: '2024-03-30', status: 'Incompleted', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Character Building', title: 'Pre-Test', start: '2024-03-01', due: '2024-03-17', status: 'Completed', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Character Building', title: 'Post-Test', start: '2024-03-01', due: '2024-03-30', status: 'Incompleted', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Teamwork', title: 'Pre-Test', start: '2024-03-01', due: '2024-03-17', status: 'Completed', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Teamwork', title: 'Post-Test', start: '2024-03-01', due: '2024-03-30', status: 'Incompleted', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Drive & Courage', title: 'Pre-Test', start: '2024-03-01', due: '2024-03-17', status: 'Completed', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Drive & Courage', title: 'Post-Test', start: '2024-03-01', due: '2024-03-30', status: 'Incompleted', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Executive Sharing', title: 'Pre-Test', start: '2024-03-01', due: '2024-03-17', status: 'Completed', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Executive Sharing', title: 'Post-Test', start: '2024-03-01', due: '2024-03-30', status: 'Incompleted', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Corporate Value', title: 'Pre-Test', start: '2024-03-01', due: '2024-03-17', status: 'Completed', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'Corporate Value', title: 'Post-Test', start: '2024-03-01', due: '2024-03-30', status: 'Incompleted', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'AHEMCE Value Chain', title: 'Pre-Test', start: '2024-03-01', due: '2024-03-17', status: 'Completed', time: 60, type: 'Pilihan Ganda', qcount: 10},
    {name: 'AHEMCE Value Chain', title: 'Post-Test', start: '2024-03-01', due: '2024-03-30', status: 'Incompleted', time: 60, type: 'Pilihan Ganda', qcount: 10},
];

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

const assignment = [
    {selectedTopic: 'General Development', name: 'On Boarding'},
    {selectedTopic: 'General Development', name: 'SOLUTION Culture'},
    {selectedTopic: 'General Development', name: 'Behaviour Competencies'},
    {selectedTopic: 'General Development', name: 'Business Process UT'},
    {selectedTopic: 'General Development', name: 'Kebhinekaan'},
    {selectedTopic: 'General Development', name: 'BMS'},
    {selectedTopic: 'General Development', name: 'Basic Mentoring'},
    {selectedTopic: 'General Development', name: 'Project Management'},
    {selectedTopic: 'Orientasi Divisi', name: 'Business Process Divisi'},
    {selectedTopic: 'Orientasi Divisi', name: 'Functional BMC'},
    {selectedTopic: 'Orientasi Divisi', name: 'Case Studies'},
    {selectedTopic: 'BGMS', name: 'Character Building'},
    {selectedTopic: 'BGMS', name: 'Teamwork'},
    {selectedTopic: 'BGMS', name: 'Drive & Courage'},
    {selectedTopic: 'NEOP', name: 'Executive Sharing'},
    {selectedTopic: 'NEOP', name: 'Corporate Value'},
    {selectedTopic: 'NEOP', name: 'AHEMCE Value Chain'},
    {selectedTopic: 'NEOP', name: 'Business Process AHEMCE',},
    {selectedTopic: 'NEOP', name: 'Personal Branding'},
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
    const [currentPage, setCurrentPage] = useState('first');
    const [selectedPhase, setSelectedPhase] = useState('Phase 10');
    const [selectedTopic, setSelectedTopic] = useState('General Development');
    const [selectedAssignment, setSelectedAssignment] = useState('On Boarding');
    const [selectedAssign, setSelectedAssign] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedTest, setSelectedTest] = useState(null);
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [due, setDue] = useState('');
    const [status, setStatus] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState('');
    const [qcount, setQcount] = useState('');
    const [editableDetails, setEditableDetails] = useState({});
    const [assignmentDetails, setAssignmentDetails] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleFirst = () =>{
        setCurrentPage('first');
    }

    const handleMain = () => {
        setCurrentPage('main');
        setSelectedAssign(null);
        setSelectedTest(null);
    };

    const handleMain2 = () => {
        setCurrentPage('main2');
        setSelectedAssign(null);
        setSelectedTest(null);
    };

    const handleSecond = () => {
        setCurrentPage('second');
    };

    const handleSecond2 = () => {
        setCurrentPage('second2');
    };

    const handleStart = () => {
        setCurrentPage('fourth');
    };

    const handleAddAll= () => {
        setCurrentPage('five0')
    }

    const handleAddAll2= () => {
        setCurrentPage('five1')
    }

    const handleAddAll3= () => {
        setCurrentPage('five2')
    }

    const handleAddAll4= () => {
        setCurrentPage('five3')
    }

    const handleAddFinishClick = () => {
        handleAddAll4();    
    };

    const handleThird = (assign) => {
        setCurrentPage('third');
        setSelectedAssign(assign.name);
        setSelectedTest(assign.title);
    };

    const handleThird2 = (assign) => {
        setCurrentPage('third2');
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

    const handleAssignmentChange = (e) => {
        setSelectedAssignment(e.target.value);
    };

    const handleCourseClick = (course) => {
        setSelectedAssign(course.name);
        setSelectedCourse(course);
    };

    const handleStartClick = () => {
        handleStart();
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

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (time < 1) {
            alert("Time cannot be less than 1 minute.");
            return;
        }
        if (qcount < 1) {
            alert("Question count cannot be less than 1.");
            return;
        }
    
        const initialQuestions = Array.from({ length: qcount }, () => ({
            question: '',
            options: ['', '', '', ''],
        }));
    
        setAssignmentDetails({
            phase: selectedPhase,
            topic: selectedTopic,
            assignment: selectedAssignment,
            title,
            start,
            due,
            status: "Incomplete",
            time,
            type,
            qcount,
        });
    
        setQuestions(initialQuestions);
        setCurrentPage('five1');
    };

    const handleConfirm = () => {
        setCurrentPage('five2');
    };

    const handleQuestionChange = (index, value) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question, i) =>
                i === index ? { ...question, question: value } : question
            )
        );
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question, i) =>
                i === questionIndex
                    ? {
                        ...question,
                        options: question.options.map((option, j) =>
                            j === optionIndex ? value : option
                        ),
                    }
                    : question
            )
        );
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

    const getDescription2 = () => {
        const filteredCourses = courses.filter(course => course.selectedPhase === selectedPhase && course.selectedTopic === selectedTopic);

        return (
            <div className="course-container">
                {filteredCourses.map(course => {

                    return (
                        <div key={course.name} className="course" onClick={() => handleCourseClick(course)}>
                            <div className="description">
                                <img className="courseimg" src="/src/files/icons/CourseImg.png" alt="Course" />
                                <div className="course-text">
                                    <div className="course-name">{course.name}</div>
                                    <div className="course-no-batch">{course.no}</div>
                                </div>
                            </div>
                            <hr />
                            <div className="course-button" onClick={handleSecond2}>Click to View the activity</div>
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

    const renderSelected2 = () => {
        if (selectedAssign) {
            const selected = courses.find(item => item.name === selectedAssign);

            if (selected) {
                return (
                    <div className="selected-details">
                        <div className="selected-name">{selected.name}</div>
                        <div className="selected-no">{selected.no}</div>
                    </div>
                );
            }
        }
        return null;
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(date));
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
                                        <div className="assign-due">{formatDate(assign.due)}</div>
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
    
    const renderAssignDetails2 = () => {
        if (selectedAssign) {
            const assignDetails = assign.filter(a => a.name === selectedAssign);
            return assignDetails.map((assign, index) => {
                const course = courses.find(course => course.name === selectedAssign);
                if (course) {
                    return (
                        <div key={index} className="assign-details">
                            <div className="assign-desc1">
                                <img className="assign-img" src="/src/files/icons/CourseImg.png" alt="Assignment" />
                                <div className="assign-description">
                                    <div className="assign-title">{assign.title}</div>
                                    <div className="assign-no">{course.no}</div>
                                </div>
                            </div>
                            <div className="assign-desc2">
                                <div className="assign-bottomdivider">
                                    <div className="assign-duecombo">
                                        <div className="assign-duedet">Due</div>
                                        <div className="assign-due">{formatDate(assign.due)}</div>
                                    </div>
                                </div>
                                <hr />
                                <div className="course-button" onClick={() => handleThird2(assign)}>Click to Edit the activity</div>
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
                                    <span className="assign-detail-value">{formatDate(assignDetail.start)}</span>
                                </div>
                                <div className="assign-detail-due">
                                    <span className="assign-detail-label">Due: </span>
                                    <span className="assign-detail-value">{formatDate(assignDetail.due)}</span>
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
                                <div className="assign-button" onClick={handleStartClick}>Check</div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    const handleInputChange = (index, field, value) => {
        setEditableDetails(prevState => ({
            ...prevState,
            [index]: {
                ...prevState[index],
                [field]: value,
            },
        }));
    };

    const renderAssignSelected2 = () => {
        if (selectedAssign) {
            const selectedAssignDetails = assign.filter(a => a.name === selectedAssign && a.title === selectedTest);
    
            return (
                <div className="editassign">
                    {selectedAssignDetails.map((assignDetail, index) => {
                        if (!editableDetails[index]) {
                            setEditableDetails({
                                ...editableDetails,
                                [index]: {
                                    start: assignDetail.start,
                                    due: assignDetail.due,
                                    time: assignDetail.time,
                                    type: assignDetail.type,
                                    qcount: assignDetail.qcount,
                                },
                            });
                        }
    
                        return (
                            <div key={index} className="assign-selected-details">
                                <div className="assign-title">
                                    <div className="assign-detail-value">{assignDetail.title} Course</div>
                                </div>
                                <hr />
                                <div className="assign-top">
                                    <div className="assign-detail">
                                        <span className="assign-detail-label">Start: </span>
                                        <input
                                            type="date"
                                            value={editableDetails[index]?.start || assignDetail.start}
                                            onChange={(e) => handleInputChange(index, 'start', e.target.value)}
                                        />
                                    </div>
                                    <div className="assign-detail">
                                        <span className="assign-detail-label">Due: </span>
                                        <input
                                            type="date"
                                            value={editableDetails[index]?.due || assignDetail.due}
                                            onChange={(e) => handleInputChange(index, 'due', e.target.value)}
                                        />
                                    </div>
                                    <div className="assign-detail">
                                        <span className="assign-detail-label">Time: (in minutes)</span>
                                        <input
                                            type="number"
                                            value={editableDetails[index]?.time || assignDetail.time}
                                            onChange={(e) => handleInputChange(index, 'time', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="assign-bottom">
                                    <div className="assign-detail">
                                        <span className="assign-detail-label">Type: </span>
                                        <input
                                            type="text"
                                            value={editableDetails[index]?.type || assignDetail.type}
                                            onChange={(e) => handleInputChange(index, 'type', e.target.value)}
                                        />
                                    </div>
                                    <div className="assign-detail">
                                        <span className="assign-detail-label">Question Count: </span>
                                        <input
                                            type="number"
                                            value={editableDetails[index]?.qcount || assignDetail.qcount}
                                            onChange={(e) => handleInputChange(index, 'qcount', e.target.value)}
                                        />
                                    </div>
                                    <div className="assign-button">Edit Question</div>
                                </div>
                            </div>
                        );
                    })}
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
            case 'first':
                return (
                    <div className="assignment0">
                        <div className="title">
                            <h><b>Assignment</b></h>
                        </div>
                        <hr />
                        <div className="batch-list">
                            {batchList.map((batch, index) => (
                                <div key={index} className="batch-card">
                                    <div className="batch-header">
                                        <div className="batch-name">{batch.batchName}</div>
                                        <div className="batch-quest" onClick={handleMain2}>
                                            ?
                                        </div>
                                        <div className="insert" onClick={handleAddAll}>
                                            +
                                        </div>
                                    </div>
                                    <ul>
                                        {batch.trainees.map((trainee, idx) => (
                                            <li onClick={handleMain} key={idx}>{trainee.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
            );
            case 'main':
                return (
                    <div className="assignment1">
                        <div className="title">
                            <h><b>Assignment</b></h>
                        </div>
                        <hr />
                        <img className="backbutton" onClick={handleFirst} src="/src/files/icons/backbutton.png" alt="Back" />
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
            case 'five0':
                return (
                    <div className="assignment5">
                        <div className="title5">
                            <h><b>Assignment</b></h>
                        </div>
                        <hr />
                        <img className="backbutton" onClick={handleFirst} src="/src/files/icons/backbutton.png" alt="Back" />
                        <div className="add-assignment">
                            <h2>Add New Assignment</h2>
                            <div className="selecttile">
                                <div className="phase">
                                    <label htmlFor="phaseDropdown"><b>Phase:</b></label>
                                    <select className="phaseselect" id="phaseDropdown" value={selectedPhase} onChange={handlePhaseChange}>
                                        <option value="Phase 10">Phase 10</option>
                                        <option value="Phase 20 + 70">Phase 20 + 70</option>
                                    </select>
                                </div>
                                <div className="topic">
                                    <label htmlFor="topicDropdown"><b>Topic:</b></label>
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
                                <div className="assignment-name">
                                    <label htmlFor="assignmentDropdown"><b>Assignment:</b></label>
                                    <select className="assignmentselect" id="assignmentDropdown" value={selectedAssignment} onChange={handleAssignmentChange}>
                                        {assignment.map((item, index) => (
                                            <option key={index} value={item.name}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <h><b>Title:</b></h>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                <h><b>Start Date:</b></h>
                                <input type="date" value={start} onChange={(e) => setStart(e.target.value)} required />
                                <h><b>Due Date:</b></h>
                                <input type="date" value={due} onChange={(e) => setDue(e.target.value)} required />
                                <h><b>Status:</b></h>
                                <input type="text" value="Incomplete" readOnly />
                                <h><b>Time (minutes):</b></h>
                                <input 
                                    type="number" 
                                    value={time} 
                                    onChange={(e) => setTime(e.target.value)} 
                                    required 
                                />
                                <h><b>Type:</b></h>
                                <select value={type} onChange={(e) => setType(e.target.value)} required>
                                    <option value="" disabled>Select Type</option>
                                    <option value="Pilihan Ganda">Pilihan Ganda</option>
                                    <option value="Esai">Esai</option>
                                </select>
                                <h><b>Question Count:</b></h>
                                <input 
                                    type="number" 
                                    value={qcount} 
                                    onChange={(e) => setQcount(e.target.value)} 
                                    required 
                                />
                                <button type="submit">Next</button>
                            </form>
                        </div>
                    </div>
                );
            case 'five1':
                return(
                    <div className="assignment5">
                        <div className="title5">
                            <h><b>Assignment Details</b></h>
                        </div>
                        <hr />
                        <img className="backbutton" onClick={handleAddAll} src="/src/files/icons/backbutton.png" alt="Back" />
                        {assignmentDetails && (
                            <div className="assignment-details">
                                <div>
                                    <p><b>Phase:</b> {assignmentDetails.phase}</p>
                                    <p><b>Topic:</b> {assignmentDetails.topic}</p>
                                    <p><b>Assignment:</b> {assignmentDetails.assignment}</p>
                                    <p><b>Title:</b> {assignmentDetails.title}</p>
                                    <p><b>Start Date:</b> {assignmentDetails.start}</p>
                                </div>
                                <div>
                                    <p><b>Due Date:</b> {assignmentDetails.due}</p>
                                    <p><b>Status:</b> {assignmentDetails.status}</p>
                                    <p><b>Time (minutes):</b> {assignmentDetails.time}</p>
                                    <p><b>Type:</b> {assignmentDetails.type}</p>
                                    <p><b>Question Count:</b> {assignmentDetails.qcount}</p>
                                </div>
                            </div>
                        )}
                        <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
                    </div>
                )
            case 'five2':
                return (
                    <div className="assignment5">
                        <div className="title5">
                            <h><b>Assignment Questions</b></h>
                        </div>
                        <hr />
                        <img className="backbutton" onClick={handleAddAll2} src="/src/files/icons/backbutton.png" alt="Back" />
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
                                <textarea
                                    value={questions[currentQuestion]?.question || ''}
                                    onChange={(e) => handleQuestionChange(currentQuestion, e.target.value)}
                                    placeholder="Enter your question here"
                                />
                            </div>
                            <hr />
                            <div className="options">
                                {questions[currentQuestion]?.options.map((option, index) => (
                                    <div key={index} className="option">
                                        <input
                                            type="radio"
                                            id={`option${index}`}
                                            name="option"
                                            required
                                        />
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleOptionChange(currentQuestion, index, e.target.value)}
                                            placeholder={`Option ${index + 1}`}
                                        />
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
                                    <button onClick={handleAddFinishClick}>Finish</button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case 'five3':
                return (
                    <div className="assignment5">
                        <div className="title5">
                            <h><b>Submitted Questions</b></h>
                        </div>
                        <hr />
                        <img className="backbutton" onClick={handleAddAll3} src="/src/files/icons/backbutton.png" alt="Back" />
                        <div className="questions-list">
                            {questions.map((question, index) => (
                                <div key={index} className="question-item">
                                    <h4>Question {index + 1}:</h4>
                                    <p>{question.question}</p>
                                    <h5>Options:</h5>
                                    <ul>
                                        {question.options.map((option, optIndex) => (
                                            <li key={optIndex}>{option}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            {questions.length === 0 && <p>No questions submitted yet.</p>}
                        </div>
                    </div>
                );
            case 'main2':
                return (
                    <div className="assignment1">
                        <div className="title">
                            <h><b>Assignment</b></h>
                        </div>
                        <hr />
                        <img className="backbutton" onClick={handleFirst} src="/src/files/icons/backbutton.png" alt="Back" />
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
                            {getDescription2()}
                        </div>
                    </div>
                );
            case 'second2':
                return (
                    <div className="assignment2">
                        <div className="title2">
                            <h><b>Assignment</b></h>
                        </div>
                        <hr />
                        <img className="backbutton" onClick={handleMain2} src="/src/files/icons/backbutton.png" alt="Back" />
                        <div className="assign-selected">
                            {renderSelected2()}
                        </div>
                        <hr />
                        <div className="assign-details-container" style={assignDetailsStyle}>
                            {renderAssignDetails2()}
                        </div>
                    </div>
                );
            case 'third2':
                return (
                    <div className="assignment3">
                        <div className="title3">
                            <h><b>Assignment</b></h>
                        </div>
                        <hr />
                        <img className="backbutton" onClick={handleSecond2} src="/src/files/icons/backbutton.png" alt="Back" />
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
                            {renderAssignSelected2()}
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

export default Assignment;
