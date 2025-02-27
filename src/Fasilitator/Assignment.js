import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./Assignment.css";
import axios from "axios";

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

function Assignment({assignmentId, onBack}) {
  const [currentPage, setCurrentPage] = useState("first");
  const [selectedPhase, setSelectedPhase] = useState("Phase 10");
  const [selectedAssignment, setSelectedAssignment] = useState('On Boarding');
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectProgramId, setProgramId] = useState(null);
  const [selectedAssign, setSelectedAssign] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedAssignDetails, setSelectedAssignDetails] = useState(null);
  const [userAccountId, setUserAccountId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [assign, setAssign] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [scoreId, setScoreId] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [savedAnswers, setSavedAnswers] = useState({});
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [due, setDue] = useState('');
  const [status, setStatus] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('');
  const [qcount, setQcount] = useState('');
  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const [editableDetails, setEditableDetails] = useState({});

  const handleOptionChange = useCallback(
    (questionId, optionIndex, selectedAnswer) => {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: {
          ...prevAnswers[questionId],
          [optionIndex]: selectedAnswer,
        },
      }));
    },
    [setAnswers]
  );

  const fetchCourses = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3001/courses/${selectedTopic}/${selectedPhase}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  }, [selectedTopic, selectedPhase]);

  useEffect(() => {
    if (selectedTopic) { 
      fetchCourses();
    }
  }, [fetchCourses]);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3001/program", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPrograms(response.data.programs);
                console.log("Program", response.data.programs);
            } catch (error) {
                console.error("Failed to fetch programs:", error);
            }
        };

        fetchPrograms();
    }, [selectedTopic]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const userAccountId = response.data.user.ACCOUNTID;
        setUserAccountId(userAccountId);
        console.log("Fetched userAccountId:", userAccountId);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const fetchAssigns = useCallback(async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3001/assigns/Course/${courseId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAssign(response.data.assigns);
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    }
  }, []);

    const getRandomQuestions = useCallback((questions, numQuestions = 5) => {
        const shuffled = questions.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, numQuestions);
    }, []);

  const fetchQuestions = useCallback(
    async (courseId) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3001/soal/${courseId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const allQuestions = response.data.soal;
        const randomQuestions = getRandomQuestions(allQuestions);
        setQuestions(randomQuestions);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    },
    [getRandomQuestions]
  );

  const fetchScoreId = useCallback(async (courseId, testType) => {
    try {
        const token = localStorage.getItem("token");
        let url = `http://localhost:3001/score`;
    
        if (courseId) {
            url += `/${courseId}`;
            if (testType) {
                url += `?testType=${testType}`;
            }
        }
    
        const response = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        setScoreId(response.data);
    } catch (error) {
        console.error("Failed to fetch Score:", error);
    }
}, []);

  useEffect(() => {
    fetchScoreId();
  }, [fetchScoreId]);

    useEffect(() => {
        if (selectedCourse) {
            fetchAssigns(selectedCourse);
            fetchQuestions(selectedCourse);
            fetchScoreId(selectedCourse);
        }
    }, [selectedCourse, fetchAssigns, fetchQuestions, fetchScoreId]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/program", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const transformedProgress = response.data.programs.map((program) => ({
          selectedTopic: program.PROGRAMID,
          selectProgramId: program.PROGRAMID,
          order: program.PROGRAMID,
          name: program.NAMA,
          value: program.SCORE,
        }));
        setProgress(transformedProgress);
        console.log("transformedProgress", transformedProgress);
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      }
    };

    fetchProgress();
  }, []);

    const handleFirst = useCallback(() =>{
        setCurrentPage('first');
    }, []);

  const handleMain = useCallback(() => {
    setCurrentPage("main");
    setSelectedAssign(null);
  }, []);    
  
    const handleMain2 = useCallback(() => {
        setCurrentPage('main2');
        setSelectedAssign(null);
        setSelectedTest(null);
    }, []);

  const handleSecond = useCallback(() => {
    setCurrentPage("second");
    if (selectedCourse) {
      fetchAssigns(selectedCourse);
      fetchScoreId(selectedCourse);
    }
  }, [selectedCourse, fetchAssigns, fetchScoreId]);

    const handleSecond2 = () => {
        setCurrentPage('second2');
    };

  const handleThird = useCallback(
    async (assignId) => {

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3001/assigns/${assignId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data || !response.data.assign) {
          throw new Error("Invalid response data");
        }

        const assignment = response.data.assign;

        setSelectedAssignDetails([assignment]);
        setSelectedTest(assignment.ASSIGNID);
        setSelectedCourse(assignment.COURSEID);
        setSelectedAssign(assignment.AssignName);

        await fetchScoreId(assignment.COURSEID, assignment.AssignName);
        await fetchQuestions(assignment.COURSEID);
        setCurrentPage("third");
      } catch (error) {
        console.error("Failed to fetch assignment details:", error);
      }
    },
    [fetchScoreId, fetchQuestions]
  );

    useEffect(() => {
        if (assignmentId) {
            handleThird(assignmentId);
        }
    }, [assignmentId, handleThird]);

    const handleThird2 = (assign) => {
        setCurrentPage('third2');
        setSelectedAssign(assign.name);
        setSelectedTest(assign.title);
    };

  useEffect(() => {
    if (selectedPhase === "Phase 10") {
      setSelectedTopic("General Development");
    } else if (selectedPhase === "Phase 20 + 70") {
      setSelectedTopic("Project");
    }
  }, [selectedPhase]);

  const handlePhaseChange = (event) => {
    setSelectedPhase(event.target.value);
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleAssignmentChange = (e) => {
    setSelectedAssignment(e.target.value);
};

  const handleCourseClick = useCallback((course) => {
    setSelectedCourse(course.COURSEID);
    setProgramId(course.PROGRAMID);
  }, []);

  const handleStartClick = useCallback(async () => {
    if (
      window.confirm("Apakah Anda yakin ingin memulai mengerjakan soal ini?")
    ) {
      try {
        setCurrentPage("fourth");
        if (selectedCourse) {
          await fetchQuestions(selectedCourse);
        }
      } catch (error) {
        console.error("Failed to start assignment:", error);
      }
    }
  }, [selectedCourse, fetchQuestions]);

    const handleAddAll= () => {
        setCurrentPage('six0')
    }

    const handleAddAll2= () => {
        setCurrentPage('six1')
    }

    const handleAddAll3= () => {
        setCurrentPage('six2')
    }

    const handleAddAll4= () => {
        setCurrentPage('six3')
    }

    const handleAddFinishClick = () => {
        handleAddAll4();    
    };

  const handleFinishClick = useCallback(async () => {
    if (window.confirm("Apakah Anda yakin ingin menyelesaikan soal ini?")) {
      try {
        const token = localStorage.getItem("token");
  
        // Fetch correct answers
        const soalResponse = await axios.get(
          `http://localhost:3001/soal/${selectedCourse}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const correctAnswers = soalResponse.data.soal.map((soal) => ({
          SOAL_ID: soal.SOAL_ID,
          KUNCI_JAWABAN: soal.KUNCI_JAWABAN,
        }));
  
        let correctCount = 0;
        const allQuestionData = questions.map((question) => {
          const selectedAnswer = answers[question.SOAL_ID];
          const correctAnswer = correctAnswers.find(
            (ans) => ans.SOAL_ID === question.SOAL_ID
          )?.KUNCI_JAWABAN;
  
          if (selectedAnswer === correctAnswer) {
            correctCount++;
          }
  
          return {
            SOAL_ID: question.SOAL_ID,
            NAMA: question.NAMA,
            PILIHAN: question.PILIHAN,
            KUNCI_JAWABAN: correctAnswer,
            JAWABAN_USER: selectedAnswer,
          };
        });
  
        const score = Math.round((correctCount / questions.length) * 100);

        await axios.post(
          `http://localhost:3001/score`,
          {
            programid: selectProgramId,
            courseid: selectedCourse,
            type: selectedAssign,
            score: score,
            savedAnswers: allQuestionData,
            STATUS: "Completed",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        // Dispatch event to notify score update
        const event = new Event('scoresUpdated');
        window.dispatchEvent(event);
        
        // Proceed with the rest of your code
  
        setSelectedAssignDetails((prevDetails) =>
          prevDetails.map((detail) => ({
            ...detail,
            SCORE: score,
          }))
        );
        
        localStorage.setItem('scoresUpdated', Date.now());
        setIsAnswered(true);
        handleSecond();
      } catch (error) {
        console.error("Gagal submit jawaban:", error);
      }
    }
  }, [
    answers,
    handleSecond,
    questions,
    selectProgramId,
    selectedAssign,
    selectedCourse,
  ]);

  const handleViewClick = useCallback(
    async (courseId, type) => {
      try {
        const token = localStorage.getItem("token");

        const answersResponse = await axios.get(
          `http://localhost:3001/score/${courseId}/${type}/view`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSavedAnswers(answersResponse.data.savedAnswers);
        setIsAnswered(true);
        setCurrentPage("fifth");
      } catch (error) {
        console.error("Error fetching saved answers:", error);
      }
    },
    []
  );

  const renderOptions = useCallback(
    (question) => {
      return question.PILIHAN.split(";;").map((option, index) => (
        <div key={index} className="option">
          <input
            type="text"
            id={`option${question.SOAL_ID}-${index}`}
            name={`question${question.SOAL_ID}`}
            value={answers[question.SOAL_ID]?.[index] || option}
            onChange={(e) =>
              handleOptionChange(question.SOAL_ID, index, e.target.value)
            }
            placeholder={`Option ${String.fromCharCode(65 + index)}`}
          />
        </div>
      ));
    },
    [answers, handleOptionChange]
  );

  const handlePreviousClick = useCallback(() => {
    setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNextClick = useCallback(() => {
    setCurrentQuestion((prev) =>
      prev < questions.length - 1 ? prev + 1 : prev
    );
  }, [questions.length]);

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
    setCurrentPage('six1');
};

const handleConfirm = () => {
    setCurrentPage('six2');
};

const handleQuestionChange = (index, value) => {
    setQuestions((prevQuestions) =>
        prevQuestions.map((question, i) =>
            i === index ? { ...question, question: value } : question
        )
    );
};

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => course.ProgramName === selectedTopic);
  }, [courses, selectedTopic]);

  const getDescription = useCallback(() => {
    return (
      <div className="course-container">
        {filteredCourses.map((course) => {
          const preTestScore =
            scoreId && Array.isArray(scoreId.scores)
              ? scoreId.scores.find(
                  (score) =>
                    score.COURSEID === course.COURSEID &&
                    score.TYPE === "Pre-Test"
                )
              : null;
          const postTestScore =
            scoreId && Array.isArray(scoreId.scores)
              ? scoreId.scores.find(
                  (score) =>
                    score.COURSEID === course.COURSEID &&
                    score.TYPE === "Post-Test"
                )
              : null;

          let progressValue = 0;

          if (preTestScore) {
            progressValue += 50;
          }

          if (postTestScore) {
            progressValue += 50;
          }

          return (
            <div
              key={course.CourseName}
              className="course"
              onClick={() => handleCourseClick(course)}
            >
              <div className="description">
                <img
                  className="courseimg"
                  src="/src/files/icons/CourseImg.png"
                  alt="Course"
                />
                <div className="course-text">
                  <div className="course-name">{course.CourseName}</div>
                  <div className="course-no-batch">{course.no}</div>
                </div>
                <div
                  className="progress-circle"
                  style={{
                    background: `conic-gradient(#4caf50 ${
                      progressValue * 3.6
                    }deg, #e0e0e0 0deg)`,
                  }}
                >
                  <div className="progress-value">{progressValue}%</div>
                </div>
              </div>
              <hr />
              <div
                className="course-button"
                onClick={() =>
                  handleSecond(course.COURSEID, course.PROGRAMID)
                }
              >
                Click to View the activity
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [filteredCourses, handleCourseClick, handleSecond, scoreId]);

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

  const renderAssignSelected = useCallback(() => {
    return (
      <div>
        {selectedAssignDetails.map((assignDetail, index) => {
          let questionType = null;
          if (questions && questions.length > 0) {
            questionType = questions[0].TYPE;
          }

          const currentAssignmentScore = scoreId.scores.find(
            (score) =>
              score.COURSEID === selectedCourse && score.TYPE === selectedAssign
          );

          const isAnswered = !!currentAssignmentScore;

          return (
            <div key={index} className="assign-selected-details">
              <div className="assign-title">
                <span className="assign-detail-value">
                  {assignDetail.NAMA} Course
                </span>
              </div>
              <hr />
              <div className="assign-top">
                <div className="assign-detail">
                  <span className="assign-detail-label">Start: </span>
                  <span className="assign-detail-value">
                    {assignDetail.START}
                  </span>
                </div>
                <div className="assign-detail-due">
                  <span className="assign-detail-label">Due: </span>
                  <span className="assign-detail-value">
                    {new Date(assignDetail.DUE).toLocaleDateString()}
                  </span>
                </div>
                <div className="assign-detail">
                  <span className="assign-detail-label">Score: </span>
                  <span className="assign-detail-value">
                    {currentAssignmentScore
                      ? currentAssignmentScore.SCORE
                      : "No Score"}{" "}
                    / 100
                  </span>
                </div>
              </div>
              <div className="assign-bottom">
                <div className="assign-detail">
                  <span className="assign-detail-label">Type: </span>
                  <span className="assign-detail-value">
                    {questionType ? questionType : assignDetail.TYPE}
                  </span>
                </div>
                <div className="assign-detail">
                  <span className="assign-detail-label">Question Count: </span>
                  <span className="assign-detail-value">
                    {assignDetail.COUNT}
                  </span>
                </div>
                <div
                  className="assign-button"
                  onClick={
                    isAnswered
                      ? () => handleViewClick(selectedCourse, selectedAssign)
                      : handleStartClick
                  }
                >
                  {isAnswered ? "View" : "Start"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [
    handleStartClick,
    handleViewClick,
    questions,
    scoreId.scores,
    selectedAssign,
    selectedAssignDetails,
    selectedCourse,
  ]);

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

  const renderSelected = useCallback(() => {
    if (selectedCourse) {
        const selected = courses.find((item) => item.COURSEID === selectedCourse);
        const preTestScore =
            scoreId && Array.isArray(scoreId.scores)
                ? scoreId.scores.find(
                    (score) =>
                        score.COURSEID === selectedCourse &&
                        score.TYPE === "Pre-Test"
                )
                : null;
        const postTestScore =
            scoreId && Array.isArray(scoreId.scores)
                ? scoreId.scores.find(
                    (score) =>
                        score.COURSEID === selectedCourse &&
                        score.TYPE === "Post-Test"
                )
                : null;

      let progressValue = 0;

      if (preTestScore && preTestScore.STATUS === 'Completed') {
        progressValue += 50;
      }
      
      if (postTestScore && postTestScore.STATUS === 'Completed') {
        progressValue += 50;
      }

      if (selected) {
        return (
          <div className="selected-details">
            <div className="selected-name">{selected.CourseName}</div>
            <div className="selected-no">{selected.no}</div>
            <div className="progress-divider">
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${progressValue}%` }}
                ></div>
              </div>
              <div className="progress-text">{progressValue}%</div>
            </div>
          </div>
        );
      }
    }
    return null;
  }, [courses, scoreId, selectedCourse]);

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

  const renderAssignDetails = useCallback(() => {
    if (selectedCourse) {
      const assignDetails = assign.filter(
        (item) => item.COURSEID === selectedCourse
      );

      return assignDetails.map((item, index) => {
        const preTestScore =
          scoreId && Array.isArray(scoreId.scores)
            ? scoreId.scores.find(
                (score) =>
                  score.COURSEID === item.COURSEID && score.TYPE === "Pre-Test"
              )
            : null;
        const postTestScore =
          scoreId && Array.isArray(scoreId.scores)
            ? scoreId.scores.find(
                (score) =>
                  score.COURSEID === item.COURSEID && score.TYPE === "Post-Test"
              )
            : null;

        let status = "Incomplete";

        if (item.AssignName === "Pre-Test") {
          status = (preTestScore && preTestScore.STATUS === 'Completed') ? "Completed" : "Incomplete";
        } else if (item.AssignName === "Post-Test") {
          status = (postTestScore && postTestScore.STATUS === 'Completed') ? "Completed" : "Incomplete";
        }

        return (
          <div key={index} className="assign-details">
            <div className="assign-desc1">
              <img
                className="assign-img"
                src="/src/files/icons/CourseImg.png"
                alt="Assignment"
              />
              <div className="assign-description">
                <div className="assign-title">{item.AssignName}</div>
                <div className="assign-no">Course Name: {item.CourseName}</div>
              </div>
            </div>
            <div className="assign-desc2">
              <div className="assign-duedet">Due</div>
              <div className="assign-due">
                {new Date(item.DUE).toLocaleDateString()}
              </div>
              <div className="assign-statusdet">Status</div>
              <div className={`assign-status ${status.toLowerCase()}`}>
                {status}
              </div>
              <hr />
              <div
                className="course-button"
                onClick={() => handleThird(item.ASSIGNID, item.AssignName)}
              >
                Click to View the activity
              </div>
            </div>
          </div>
        );
      });
    }
    return null;
  }, [assign, handleThird, scoreId, selectedCourse]);

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

  const assignDetailsStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  };

  if (
    selectedCourse &&
    assign.filter((item) => item.COURSEID === selectedCourse).length % 3 === 0
  ) {
    assignDetailsStyle.flexDirection = "column";
  }

  const renderSavedOptions = useCallback(
    (question) => {
      const userAnswer = question.JAWABAN_USER;
      const correctAnswer = question.KUNCI_JAWABAN;

      return question.PILIHAN.split(";;").map((option, index) => {
        let optionStyle = "";
        if (userAnswer === option && userAnswer === correctAnswer) {
          optionStyle = "correct-answer";
        } else if (userAnswer === option && userAnswer !== correctAnswer) {
          optionStyle = "wrong-answer";
        } else if (correctAnswer === option) {
          optionStyle = "correct-answer";
        }

        return (
          <div key={index} className={`option ${optionStyle}`}>
            <input
              type="radio"
              id={`saved-option${question.SOAL_ID}-${index}`}
              name={`question${question.SOAL_ID}`}
              value={option}
              checked={userAnswer === option}
              disabled
            />
            <label htmlFor={`saved-option${question.SOAL_ID}-${index}`}>
              {option}
            </label>
          </div>
        );
      });
    },
    []
  );

  const renderPage = useCallback(() => {
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
      case "main":
        const filteredPrograms = programs.filter(
          (program) => program.PHASE === selectedPhase
        );
        return (
          <div className="assignment1">
            <div className="title">
              <h>
                <b>Assignment</b>
              </h>
            </div>
            <img
              className="backbutton"
              onClick={handleFirst}
              src="/src/files/icons/backbutton.png"
              alt="Back"
            />
            <div className="selecttile">
              <div className="phase">
                <label htmlFor="phaseDropdown">Phase</label>
                <select
                  className="phaseselect"
                  id="phaseDropdown"
                  value={selectedPhase}
                  onChange={handlePhaseChange}
                >
                  <option value="Phase 10">Phase 10</option>
                  <option value="Phase 20 + 70">Phase 20 + 70</option>
                </select>
              </div>
              <div className="topic">
                <label htmlFor="topicDropdown">Topic</label>
                <select
                  className="topicselect"
                  id="topicDropdown"
                  value={selectedTopic}
                  onChange={handleTopicChange}
                >
                  {filteredPrograms.map((program) => (
                    <option key={program.PROGRAMID} value={program.NAMA}>
                      {program.NAMA}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <hr />
            <div className="class">{getDescription()}</div>
          </div>
        );
      case "second":
        return (
          <div className="assignment2">
            <div className="title2">
              <h>
                <b>Assignment</b>
              </h>
            </div>
            <hr />
            <img
              className="backbutton"
              onClick={handleMain}
              src="/src/files/icons/backbutton.png"
              alt="Back"
            />
            <div className="assign-selected">{renderSelected()}</div>
            <hr />
            <div className="assign-details-container">
              {renderAssignDetails()}
            </div>
          </div>
        );
      case "third":
        if (!selectedAssignDetails || selectedAssignDetails.length === 0) {
          return <div>Loading...</div>;
        }
        return (
          <div className="assignment3">
            <div className="title3">
              <h>
                <b>Assignment</b>
              </h>
            </div>
            <hr />
            <img
              className="backbutton"
              onClick={handleSecond}
              src="/src/files/icons/backbutton.png"
              alt="Back"
            />
            <div className="description">
              <div className="course-text">
                {selectedCourse && assign.length > 0 && (
                  <>
                    <div className="course-name">
                      {
                        assign.find((item) => item.COURSEID === selectedCourse)
                          ?.CourseName
                      }
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="assign-selected-container">
              {renderAssignSelected()}
            </div>
          </div>
        );
      case "fourth":
        return (
          <div className="assignment4">
            <div className="title4">
              <div className="backbutton">
                <img
                  className="back"
                  onClick={handleSecond}
                  src="/src/files/icons/backbutton.png"
                  alt="Back"
                />
              </div>
              <div className="title">
                <b>Assignment</b>
              </div>
            </div>
            <hr />
            <div className="question-navigation">
              {questions.map((_, index) => (
                <button
                  key={index}
                  className={`question-number ${
                    currentQuestion === index ? "active" : ""
                  }`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="question-container">
              <div className="question">
                {questions[currentQuestion]?.NAMA}
              </div>
              <hr />
              <div className="options">
                {renderOptions(questions[currentQuestion])}
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
        );
        case "fifth":
          return (
            <div className="assignment5">
              <div className="title5">
                <div className="backbutton">
                  <img
                    className="back"
                    onClick={() => setCurrentPage("second")}
                    src="/src/files/icons/backbutton.png"
                    alt="Back"
                  />
                </div>
                <div className="title">
                  <b>View Saved Answers</b>
                </div>
              </div>
              <hr />
              <div className="question-navigation">
                {savedAnswers.map((_, index) => (
                  <button
                    key={index}
                    className={`question-number ${
                      currentQuestion === index ? "active" : ""
                    }`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="question-container">
                <div className="question">
                  <strong>No. {currentQuestion + 1}:</strong>{" "}
                  {savedAnswers[currentQuestion].NAMA}
                </div>
                <hr />
                <div className="options">
                  {renderSavedOptions(savedAnswers[currentQuestion])}
                </div>
                <div className="navigation-buttons">
                  {currentQuestion > 0 && (
                    <button onClick={handlePreviousClick}>Previous</button>
                  )}
                  {currentQuestion < savedAnswers.length - 1 && (
                    <button onClick={handleNextClick}>Next</button>
                  )}
                </div>
              </div>
            </div>
          );
          case 'six0':
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
        case 'six1':
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
        case 'six2':
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
                                    type="text"
                                    value={answers[currentQuestion]?.[index] || option} // Use the answer if it exists, else fallback to the option
                                    onChange={(e) => handleOptionChange(currentQuestion, index, e.target.value)} // Update the answer for the current option
                                    placeholder={`Option ${String.fromCharCode(65 + index)}`} // Display Option A, B, C, D
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
            case 'six3':
                return (
                    <div className="assignment5">
                        <div className="title5">
                            <h><b>Submitted Questions</b></h>
                        </div>
                        <hr />
                        <img className="backbutton" onClick={handleAddAll3} src="/src/files/icons/backbutton.png" alt="Back" />
                        <div className="questions-list">
                            {questions.length > 0 ? (
                                questions.map((question, index) => (
                                <div key={index} className="question-item">
                                    <h4>Question {index + 1}:</h4>
                                    <p>{question.question}</p>
                                    <h5>Options:</h5>
                                    <div className="options-container">
                                    {question.options.map((option, optIndex) => (
                                        <div key={optIndex} className="option-item">
                                        <input
                                            type="radio"
                                            id={`option${question.SOAL_ID}-${optIndex}`}
                                            name={`question${question.SOAL_ID}`}
                                            value={option}
                                            onChange={() => handleOptionChange(question.SOAL_ID, option)}  // Handle option change
                                            checked={answers[question.SOAL_ID] === option}  // Check if this option is selected
                                        />
                                        <label htmlFor={`option${question.SOAL_ID}-${optIndex}`}>
                                            {String.fromCharCode(65 + optIndex)}. {option}
                                        </label>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                                ))
                            ) : (
                                <p>No questions submitted yet.</p>
                            )}
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
  }, [
    assign,
    currentPage,
    currentQuestion,
    getDescription,
    handleFinishClick,
    handleMain,
    handleNextClick,
    handlePhaseChange,
    handlePreviousClick,
    handleSecond,
    handleTopicChange,
    questions,
    renderAssignDetails,
    renderAssignSelected,
    renderOptions,
    renderSavedOptions,
    savedAnswers,
    selectedCourse,
    selectedPhase,
    selectedTopic,
  ]);

  return <div className="App">{renderPage()}</div>;
}

export default Assignment;
