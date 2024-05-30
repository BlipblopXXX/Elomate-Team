import React, { useState } from 'react';
import './Mentoring.css';


function Mentoring() {
    const [currentPage, setCurrentPage] = useState('main');
    const [addScheduleButtonClicked, setAddScheduleButtonClicked] = useState(true);
    const [ongoingButtonClicked, setOngoingButtonClicked] = useState(false);
    const [closedButtonClicked, setClosedButtonClicked] = useState(false);
    const [showMentoringA, setShowMentoringA] = useState(true);
    const [showMentoringB, setShowMentoringB] = useState(false);
    const [showMentoringC, setShowMentoringC] = useState(false);

    const handleMain = () => {
        setCurrentPage('main');
    }

    const handleSecond = () => {
        setCurrentPage('second');
    }

    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    };

    const handleAddScheduleButtonClick = () => {
        setAddScheduleButtonClicked(true);
        setOngoingButtonClicked(false);
        setClosedButtonClicked(false);
        setShowMentoringA(true);
        setShowMentoringB(false);
        setShowMentoringC(false);
    }

    const handleOngoingButtonClicked = () => {
        setAddScheduleButtonClicked(false);
        setOngoingButtonClicked(true);
        setClosedButtonClicked(false);
        setShowMentoringA(false);
        setShowMentoringB(true);
        setShowMentoringC(false);
    }

    const handleClosedButtonClick = () => {
        setAddScheduleButtonClicked(false);
        setOngoingButtonClicked(false);
        setClosedButtonClicked(true);
        setShowMentoringA(false);
        setShowMentoringB(false);
        setShowMentoringC(true);
    }

    const [date, setDate] = useState(new Date());
  
    // Fungsi untuk mengubah format tanggal menjadi yyyy-mm-dd
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


    const [time, setTime] = useState();
    const [time1, setTime1] = useState();
      
    const handleChange = (event) => {
        setTime(event.target.value);
    }

    const handleChangeEnd = (event) => {
        setTime1(event.target.value);
    }

    const [type, setType] = useState(null);  
    const handleCheckboxTypeChange = (option) => {
        setType(option);
    };

    const [method, setMethod] = useState(null);
    const handleCheckboxMethodChange = (option) => {
        setMethod(option);
    };

    const [mentorName, setMentorName] = useState('');
    const handleInputTopicChange = (event) => {
        setTopicName(capitalizeWords(event.target.value));
    };

    const [topicName, setTopicName] = useState('');
    const handleInputMentorChange = (event) => {
        setMentorName(capitalizeWords(event.target.value));
    };

    const [competencies, setCompetencies] = useState([]);
    const handleCompetencyChange = (option) => {
        if (competencies.includes(option)) {
            setCompetencies(competencies.filter(item => item !== option));
        } else {
            setCompetencies([...competencies, option]);
        }
    };

    const [dateError, setDateError] = useState('');
    const [timeError, setTimeError] = useState('');
    const [time1Error, setTime1Error] = useState('');
    const [typeError, setTypeError] = useState('');
    const [methodError, setMethodError] = useState('');
    const [mentorNameError, setMentorNameError] = useState('');
    const [topicNameError, setTopicNameError] = useState('');
    const [competenciesError, setCompetenciesError] = useState('');
    const [lesson, setLesson] = useState('');
    const [catatan, setCatatan] = useState('');

    const [schedules, setSchedules] = useState([])
    const [form, setForm] = useState([])
    const handleAddButtonClick = () => {

        setDateError('');
        setTimeError('');
        setTime1Error('');
        setTypeError('');
        setMethodError('');
        setMentorNameError('');
        setTopicNameError('');
        setCompetenciesError('');

        // Validation logic
        let valid = true;
        if (!date) {
            setDateError('*Date is required.');
            valid = false;
        }
        if (!time) {
            setTimeError('*Start time is required.');
            valid = false;
        }
        if (!time1) {
            setTime1Error('*End time is required.');
            valid = false;
        }
        if (!type) {
            setTypeError('*Type is required.');
            valid = false;
        }
        if (!method) {
            setMethodError('*Method is required.');
            valid = false;
        }
        if (!mentorName.trim()) {
            setMentorNameError('*Mentor name is required.');
            valid = false;
        }
        if (!topicName.trim()) {
            setTopicNameError('*Topic name is required.');
            valid = false;
        }
        if (competencies.length === 0) {
            setCompetenciesError('*At least one competency is required.');
            valid = false;
        }

        if (!valid) return;

        const newSchedule = {
            type: type,
            datetime: `${formatDate(date)}, ${time} WIB - ${time1} WIB`,
            method: method,
            mentorName: capitalizeWords(mentorName),
            topicName: capitalizeWords(topicName),
            competencies: competencies.join(', '),
            status: 'Ongoing',
        };

        setSchedules([newSchedule, ...schedules]);
        handleOngoingButtonClicked();

        setDate(new Date());
        setTime('');
        setTime1('');
        setType(null);
        setMethod(null);
        setMentorName('');
        setTopicName('');
        setCompetencies([]);
    };

    const handleFormButtonClick = () => {

        const form = {
            type: type,
            method: method,
            date: `${formatDate(date)}`,
            time: `${time} WIB - ${time1} WIB`,  
            mentorName: capitalizeWords(mentorName),
            topicName: capitalizeWords(topicName),
            competencies: competencies.join(', '),
        };

        setForm([form]);

        handleSecond();
    }

    const renderPage = () => {
        switch(currentPage) {
            case 'main':
                return(
                    <div className="mentoring">
                        <div className="title">
                            <h><b>Mentoring</b></h>
                        </div>
                            <div className="button">
                                <div className={`addSchedule-button ${addScheduleButtonClicked ? 'active' : ''}`} onClick={handleAddScheduleButtonClick}>Add Schedule</div>
                                <div className={`ongoing-button ${ongoingButtonClicked ? 'active' : ''}`} onClick={handleOngoingButtonClicked}>Ongoing</div>
                                <div className={`closed-button ${closedButtonClicked ? 'active' : ''}`} onClick={handleClosedButtonClick}>Closed</div>
                            </div>     
                        <hr />
                            {showMentoringA && (
                                <div className="add">
                                    <div className="schedule-container">
                                        <p className='judul'>Date</p>
                                        <input
                                            type="date"
                                            className="dateInput"
                                            value={formatDate(date)}
                                            onChange={(e) => setDate(new Date(e.target.value))}
                                        />
                                        <div className="error">
                                            {dateError}
                                        </div>  
                                        <div className='time'>
                                            <div className='start1'>
                                                <p className='judultime'>Start</p>
                                                <input
                                                    type="time"
                                                    className="timeInput"
                                                    value={time}
                                                    onChange={handleChange}
                                                />
                                                <div className="error">
                                                    {timeError}
                                                </div>  
                                            </div>
                                            <div className='end1'>
                                                <p className='judultime'>End</p>
                                                <input
                                                    type="time"
                                                    className="timeInput1"
                                                    value={time1}
                                                    onChange={handleChangeEnd}
                                                />
                                                <div className="error">
                                                    {time1Error}
                                                </div>
                                            </div>                                  
                                        </div>
                                        <div>
                                            <p className='judul'>Method</p>
                                            <label className='checkbox1'>
                                                <input
                                                type="checkbox"
                                                checked={method === 'Offline'}
                                                onChange={() => handleCheckboxMethodChange('Offline')}
                                                />
                                                Offline
                                            </label>
            
                                            <label className='checkbox2'>
                                                <input
                                                type="checkbox"
                                                checked={method === 'Online'}
                                                onChange={() => handleCheckboxMethodChange('Online')}
                                                />
                                                Online
                                            </label>
                                            <div className="error">
                                                {methodError}   
                                            </div>
                                        </div>
                                        <div>
                                            <p className='judul'>Type</p>
                                            <label className='option1'>
                                                <input
                                                type="checkbox"
                                                checked={type === 'Mentoring'}
                                                onChange={() => handleCheckboxTypeChange('Mentoring')}
                                                />
                                                Mentoring
                                            </label>
            
                                            <label className='option1'>
                                                <input
                                                type="checkbox"
                                                checked={type === 'Coaching'}
                                                onChange={() => handleCheckboxTypeChange('Coaching')}
                                                />
                                                Coaching
                                            </label>
            
                                            <label>
                                                <input
                                                type="checkbox"
                                                checked={type === 'Review'}
                                                onChange={() => handleCheckboxTypeChange('Review')}
                                                />
                                                Review
                                            </label>
                                            <div className="error">
                                                {typeError}     
                                            </div> 
                                        </div>
                                        <div>
                                            <p className='judul'>Mentor</p>
                                            <label className='inputText'>
                                                <input
                                                type="text"
                                                className='inputan'
                                                value={mentorName}
                                                onChange={handleInputMentorChange}
                                                /> 
                                            </label>
                                            <div className="error">
                                                {mentorNameError}
                                            </div>
                                        </div>
                                        <div>
                                            <p className='judul'>Topic</p>
                                            <label className='inputText'>
                                                <input
                                                type="text"
                                                className='inputan'
                                                value={topicName}
                                                onChange={handleInputTopicChange}
                                                />
                                            </label>
                                            <div className="error">
                                                {topicNameError}
                                            </div>
                                        </div>
                                        <div className='competency'>
                                            <p className='judul'>Competencies</p>
                                            <label className='checkbox1'>
                                                <input
                                                    type="checkbox"
                                                    checked={competencies.includes('Behavior Competencies')}
                                                    onChange={() => handleCompetencyChange('Behavior Competencies')}
                                                />
                                                Behavior Competencies
                                            </label>
                                            <label className='checkbox1'>
                                                <input
                                                    type="checkbox"
                                                    checked={competencies.includes('Business Management Competencies')}
                                                    onChange={() => handleCompetencyChange('Business Management Competencies')}
                                                />
                                                Business Management Competencies
                                            </label>
                                            <label className='checkbox1'>
                                                <input
                                                    type="checkbox"
                                                    checked={competencies.includes('Technical Operation Competencies')}
                                                    onChange={() => handleCompetencyChange('Technical Operation Competencies')}
                                                />
                                                Technical Operation Competencies
                                            </label>
                                            <label className='checkbox1'>
                                                <input
                                                    type="checkbox"
                                                    checked={competencies.includes('English Literacy')}
                                                    onChange={() => handleCompetencyChange('English Literacy')}
                                                />
                                                English Literacy
                                            </label>
                                            <label className='checkbox1'>
                                                <input
                                                    type="checkbox"
                                                    checked={competencies.includes('Future Learning')}
                                                    onChange={() => handleCompetencyChange('Future Learning')}
                                                />
                                                Future Learning
                                            </label>
                                            <div className="error">
                                                {competenciesError}
                                            </div>
                                        </div>
                                        <div className="containerButton">
                                            <button className="addButton" onClick={handleAddButtonClick}>Add</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {showMentoringB && (
                                <div className="history">
                                    <div className="history-container">
                                        <table className="history-table">
                                            <thead>
                                                <tr>
                                                    <th>Type</th>
                                                    <th>Date & Time</th>
                                                    <th>Method</th>
                                                    <th>Mentor</th>
                                                    <th>Topic</th>
                                                    <th>Competencies</th>
                                                    <th>Result</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {schedules.map((schedule, index) => (
                                                    <tr key={index}>
                                                        <td>{schedule.type}</td>
                                                        <td>{schedule.datetime}</td> 
                                                        <td>{schedule.method}</td>
                                                        <td>{schedule.mentorName}</td>
                                                        <td>{schedule.topicName}</td>
                                                        <td>{schedule.competencies}</td>
                                                        <td><button className='formButton' onClick={handleFormButtonClick}>
                                                                Feedback Form
                                                            </button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table> 
            
                                    </div>
                                </div>
                            )}
                            {showMentoringC && (
                                <div className="history">
                                <div className="history-container">
                                    <table className="history-table">
                                        <thead>
                                            <tr>
                                                <th>Type</th>
                                                <th>Date & Time</th>
                                                <th>Method</th>
                                                <th>Mentor</th>
                                                <th>Topic</th>
                                                <th>Competencies</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {schedules.map((schedule, index) => (
                                                <tr key={index}>
                                                    <td>{schedule.type}</td>
                                                    <td>{schedule.datetime}</td> 
                                                    <td>{schedule.method}</td>
                                                    <td>{schedule.mentorName}</td>
                                                    <td>{schedule.topicName}</td>
                                                    <td>{schedule.competencies}</td>
                                                    <td className='status'>{schedule.status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>        
                                </div>
                            </div>
                            )}
                                    
                    </div>
                )
            case 'second' :
                return(
                    <div className="mentoring">
                        <div className="title2">
                            <img className="backbutton" onClick={handleMain} src="/src/files/icons/backbutton.png" />
                            <h><b>Feedback Form</b></h>
                        </div>
                        <hr />
                        
                        <div className="description">
                            <div className="form-container">
                                <div className='upper'>
                                    
                                        {form.map((schedule) => (
                                            <div>
                                                <div className='header'>
                                                    <div className='atas'>
                                                        <div className="bagian">
                                                            <p className='judul'>Type</p>   
                                                            <div className='value'>{schedule.type}</div>
                                                        </div>

                                                        <div className="bagian">
                                                            <p className='judul'>Date</p>
                                                            <div className='value'>{schedule.date}</div>
                                                        </div>

                                                        <div className="bagian">
                                                            <p className='judul'>Mentor</p>
                                                            <div className='value'>{schedule.mentorName}</div>
                                                        </div>
                                                    </div>
                                                    <div className='bawah'>
                                                        <div className="bagian">
                                                            <p className='judul'>Method</p>
                                                            <div className='value'>{schedule.method}</div>
                                                        </div>

                                                        <div className="bagian">
                                                            <p className='judul'>Time</p>
                                                            <div className='value'>{schedule.time}</div>
                                                        </div>

                                                        <div className="bagian">
                                                            <p className='judul'>Topic</p>
                                                            <div className='value'>{schedule.topicName}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <p className='judul-form'><strong>Kompetensi Yang Dievaluasi</strong></p>
                                                <div className="bagian"> 
                                                    <div className='value1'>{schedule.competencies}</div>
                                                </div>

                                                <p className='judul-form'><strong>Lesson Learned Competencies</strong></p>
                                                <div className="form-desc"> 
                                                    <p>Tuliskan dalam bentuk poin pembelajaran yang didapat selama Mentoring / Coaching</p>
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Your Answer"
                                                        value={lesson}
                                                        onChange={(e) => setLesson(e.target.value)}
                                                    />
                                                </div>
                                                <p className='judul-form'><strong>Catatan Mentor</strong></p>
                                                <div className="form-desc"> 
                                                    <p>Catatan terkait hal yang sudah improve dan area of development</p>
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Your Answer"
                                                        value={catatan}
                                                        onChange={(e) => setCatatan(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )
        }
    }
    return(
        <div className="App">
            {renderPage()}
        </div>
    )
}

export default Mentoring;
