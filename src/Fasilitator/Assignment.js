import React, { useState, useEffect } from 'react';
import './Assignment.css';

const courses = [
    {selectedPhase: 'option1', selectedTopic: 'General Development', name: 'On Boarding', no: 'No Batch'},
    {selectedPhase: 'option1', selectedTopic: 'General Development', name: 'SOLUTION Culture', no: 'No Batch'},
    {selectedPhase: 'option1', selectedTopic: 'General Development', name: 'Behaviour Competencies', no: 'No Batch'},
    {selectedPhase: 'option1', selectedTopic: 'General Development', name: 'Business Process UT', no: 'No Batch'},
    {selectedPhase: 'option1', selectedTopic: 'General Development', name: 'Kebhinekaan', no: 'No Batch'},
    {selectedPhase: 'option1', selectedTopic: 'General Development', name: 'BMS', no: 'No Batch'},
    {selectedPhase: 'option1', selectedTopic: 'General Development', name: 'Basic Mentoring', no: 'No Batch'},
    {selectedPhase: 'option1', selectedTopic: 'General Development', name: 'Project Management', no: 'No Batch'},
    {selectedPhase: 'option1', selectedTopic: 'Orientasi Divisi', name: 'Business Process Divisi', no: 'No Batch'},
    {selectedPhase: 'option1', selectedTopic: 'Orientasi Divisi', name: 'Functional BMC', no: 'No Batch'},
    {selectedPhase: 'option1', selectedTopic: 'Orientasi Divisi', name: 'Case Studies', no: 'No Batch'},
    {selectedPhase: 'option1', selectedTopic: 'BGMS', name: 'Character Building', no: 'No Batch'},
    {selectedPhase: 'option1', selectedTopic: 'BGMS', name: 'Teamwork', no: 'No Batch'},
    {selectedPhase: 'option1', selectedTopic: 'BGMS', name: 'Drive & Courage', no: 'No Batch'},
    {selectedPhase: 'option1', selectedTopic: 'NEOP', name: 'Executive Sharing', no: 'No Batch'},
    {selectedPhase: 'option1', selectedTopic: 'NEOP', name: 'Corporate Value', no: 'No Batch'},
    {selectedPhase: 'option1', selectedTopic: 'NEOP', name: 'AHEMCE Value Chain', no: 'No Batch'},
    {selectedPhase: 'option1', selectedTopic: 'NEOP', name: 'Business Process AHEMCE', no: 'No Batch'},
    {selectedPhase: 'option1', selectedTopic: 'NEOP', name: 'Personal Branding', no: 'No Batch'},
    {selectedPhase: 'option1', selectedTopic: 'Review1', name: 'Review 1', no: 'No Batch'},
    {selectedPhase: 'option2', selectedTopic: 'Project', name: 'Final Project', no: 'No Batch'},
    {selectedPhase: 'option2', selectedTopic: 'Review2', name: 'Review 2', no: 'No Batch'},
    {selectedPhase: 'option2', selectedTopic: 'Review2', name: 'Review 3', no: 'No Batch'},
    {selectedPhase: 'option2', selectedTopic: 'Review2', name: 'Review 4', no: 'No Batch'},
    {selectedPhase: 'option2', selectedTopic: 'Review2', name: 'Review 5', no: 'No Batch'},
    {selectedPhase: 'option2', selectedTopic: 'Review2', name: 'Final Review', no: 'No Batch'}
]

const assign = [
    {name: 'On Boarding', title: 'Pre-Test', due: '17 March 2024', status: 'Completed'},
    {name: 'On Boarding', title: 'Post-Test', due: '30 March 2024', status: 'Not Completed'},
    {name: 'SOLUTION Culture', title: 'Pre-Test', due: '17 March 2024', status: 'Completed'},
    {name: 'SOLUTION Culture', title: 'Post-Test', due: '30 March 2024', status: 'Not Completed'},
    {name: 'Behaviour Competencies', title: 'Pre-Test', due: '17 March 2024', status: 'Completed'},
    {name: 'Behaviour Competencies', title: 'Post-Test', due: '30 March 2024', status: 'Not Completed'},
    {name: 'Business Process UT', title: 'Pre-Test', due: '17 March 2024', status: 'Completed'},
    {name: 'Business Process UT', title: 'Post-Test', due: '30 March 2024', status: 'Not Completed'},
    {name: 'Kebhinekaan', title: 'Pre-Test', due: '17 March 2024', status: 'Completed'},
    {name: 'Kebhinekaan', title: 'Post-Test', due: '30 March 2024', status: 'Not Completed'},
    {name: 'BMS', title: 'Pre-Test', due: '17 March 2024', status: 'Completed'},
    {name: 'BMS', title: 'Post-Test', due: '30 March 2024', status: 'Not Completed'},
    {name: 'Basic Mentoring', title: 'Pre-Test', due: '17 March 2024', status: 'Completed'},
    {name: 'Basic Mentoring', title: 'Post-Test', due: '30 March 2024', status: 'Not Completed'},
    {name: 'Project Management', title: 'Pre-Test', due: '17 March 2024', status: 'Completed'},
    {name: 'Project Management', title: 'Post-Test', due: '30 March 2024', status: 'Not Completed'},
    {name: 'Business Process Divisi', title: 'Pre-Test', due: '17 March 2024', status: 'Completed'},
    {name: 'Business Process Divisi', title: 'Post-Test', due: '30 March 2024', status: 'Not Completed'},
    {name: 'Functional BMC', title: 'Pre-Test', due: '17 March 2024', status: 'Completed'},
    {name: 'Functional BMC', title: 'Post-Test', due: '30 March 2024', status: 'Not Completed'},
    {name: 'Case Studies', title: 'Pre-Test', due: '17 March 2024', status: 'Completed'},
    {name: 'Case Studies', title: 'Post-Test', due: '30 March 2024', status: 'Not Completed'},
    {name: 'Character Building', title: 'Pre-Test', due: '17 March 2024', status: 'Completed'},
    {name: 'Character Building', title: 'Post-Test', due: '30 March 2024', status: 'Not Completed'},
    {name: 'Teamwork', title: 'Pre-Test', due: '17 March 2024', status: 'Completed'},
    {name: 'Teamwork', title: 'Post-Test', due: '30 March 2024', status: 'Not Completed'},
    {name: 'Drive & Courage', title: 'Pre-Test', due: '17 March 2024', status: 'Completed'},
    {name: 'Drive & Courage', title: 'Post-Test', due: '30 March 2024', status: 'Not Completed'},
    {name: 'Executive Sharing', title: 'Pre-Test', due: '17 March 2024', status: 'Completed'},
    {name: 'Executive Sharing', title: 'Post-Test', due: '30 March 2024', status: 'Not Completed'},
    {name: 'Corporate Value', title: 'Pre-Test', due: '17 March 2024', status: 'Completed'},
    {name: 'Corporate Value', title: 'Post-Test', due: '30 March 2024', status: 'Not Completed'},
    {name: 'AHEMCE Value Chain', title: 'Pre-Test', due: '17 March 2024', status: 'Completed'},
    {name: 'AHEMCE Value Chain', title: 'Post-Test', due: '30 March 2024', status: 'Not Completed'},
    {name: 'Business Process AHEMCE', title: 'Pre-Test', due: '17 March 2024', status: 'Completed'},
    {name: 'Business Process AHEMCE', title: 'Post-Test', due: '30 March 2024', status: 'Not Completed'},
    {name: 'Personal Branding', title: 'Pre-Test', due: '17 March 2024', status: 'Completed'},
    {name: 'Personal Branding', title: 'Post-Test', due: '30 March 2024', status: 'Not Completed'},
    {name: 'Review 1', title: 'Meet', due: '-', status: 'Completed'},
    {name: 'Review 1', title: 'Case', due: '-', status: 'Not Completed'},
    {name: 'Review 2', title: 'Meet', due: '-', status: 'Completed'},
    {name: 'Review 2', title: 'Case', due: '-', status: 'Not Completed'},
    {name: 'Review 3', title: 'Meet', due: '-', status: 'Completed'},
    {name: 'Review 3', title: 'Case', due: '-', status: 'Not Completed'},
    {name: 'Review 4', title: 'Meet', due: '-', status: 'Completed'},
    {name: 'Review 4', title: 'Case', due: '-', status: 'Not Completed'},
    {name: 'Review 5', title: 'Meet', due: '-', status: 'Completed'},
    {name: 'Review 5', title: 'Case', due: '-', status: 'Not Completed'},
    {name: 'Final Review', title: 'Meet', due: '-', status: 'Completed'},
    {name: 'Final Review', title: 'Case', due: '-', status: 'Not Completed'},
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

function Assignment() {
    const [currentPage, setCurrentPage] = useState('main');
    const [selectedPhase, setSelectedPhase] = useState('option1');
    const [selectedTopic, setSelectedTopic] = useState('General Development');
    const [selectedAssign, setSelectedAssign] = useState(null);

    const handleMain = () => {
        setCurrentPage('main');
        setSelectedAssign(null);
    };

    const handleSecond = () => {
        setCurrentPage('second');
    };

    useEffect(() => {
        if (selectedPhase === 'option1') {
            setSelectedTopic('General Development');
        } else if (selectedPhase === 'option2') {
            setSelectedTopic('Project');
        }
    }, [selectedPhase]);

    const handlePhaseChange = (event) => {
        setSelectedPhase(event.target.value);
    };

    const handleTopicChange = (event) => {
        setSelectedTopic(event.target.value);
    };

    const handleCourseClick = (course) => {
        setSelectedAssign(course.name);
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
            const assignDetails = assign.filter(assign => assign.name === selectedAssign);
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
                                <div className="assign-duedet">Due</div>
                                <div className="assign-due">{assign.due}</div>
                                <hr />
                                <div className="assign-statusdet">Status</div>
                                <div className={`assign-status ${assign.status.toLowerCase()}`}>{assign.status}</div>
                            </div>
                        </div>
                    );
                }
                return null;
            });
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
                                    <option value="option1">Phase 10</option>
                                    <option value="option2">Phase 20 + 70</option>
                                </select>
                            </div>
                            <div className="topic">
                                <label htmlFor="topicDropdown">Topic</label>
                                <select className="topicselect" id="topicDropdown" value={selectedTopic} onChange={handleTopicChange}>
                                    {selectedPhase === "option1" && (
                                        <>
                                            <option value="General Development">General Development</option>
                                            <option value="Orientasi Divisi">Orientasi Divisi</option>
                                            <option value="BGMS">BGMS</option>
                                            <option value="NEOP">NEOP</option>
                                            <option value="Review1">Review</option>
                                        </>
                                    )}
                                    {selectedPhase === "option2" && (
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
