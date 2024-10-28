import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./Assignment.css";
import axios from "axios";

function Assignment() {
  const [currentPage, setCurrentPage] = useState("main");
  const [selectedPhase, setSelectedPhase] = useState("Phase 10");
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
  const [timeLeft, setTimeLeft] = useState(60);

  const handleOptionChange = useCallback(
    (questionId, selectedAnswer) => {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: selectedAnswer,
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
  }, []);

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

  const getRandomQuestions = (questions, numQuestions = 5) => {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
  };

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
  }, [selectedCourse]);

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

  const handleMain = useCallback(() => {
    setCurrentPage("main");
    setSelectedAssign(null);
  }, []);

  const handleSecond = useCallback(() => {
    setCurrentPage("second");
    if (selectedCourse) {
      fetchAssigns(selectedCourse);
      fetchScoreId(selectedCourse);
    }
  }, [selectedCourse, fetchAssigns, fetchScoreId]);

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

        setCurrentPage("third");
      } catch (error) {
        console.error("Failed to fetch assignment details:", error);
      }
    },
    [fetchScoreId]
  );

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

  const handleCourseClick = useCallback((course) => {
    setSelectedCourse(course.COURSEID);
    setProgramId(course.PROGRAMID);
  }, []);

  const handleStartClick = useCallback(async () => {
    if (
      window.confirm("Apakah Anda yakin ingin memulai mengerjakan soal ini?")
    ) {
      try {
        setTimeLeft(60);
        setCurrentPage("fourth");
        if (selectedCourse) {
          await fetchQuestions(selectedCourse);
        }
      } catch (error) {
        console.error("Failed to start assignment:", error);
      }
    }
  }, [selectedCourse, fetchQuestions]);

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
            STATUS: "Completed", // Add STATUS field
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
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
            type="radio"
            id={`option${question.SOAL_ID}-${index}`}
            name={`question${question.SOAL_ID}`}
            value={option}
            onChange={() => handleOptionChange(question.SOAL_ID, option)}
            checked={answers[question.SOAL_ID] === option}
          />
          <label htmlFor={`option${question.SOAL_ID}-${index}`}>{option}</label>
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

  useEffect(() => {
    if (currentPage === "fourth") {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timerId);
            handleFinishClick();
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [currentPage, handleFinishClick]);


  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

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
              <div className="timer">
                <span>Time Left: {formatTime(timeLeft)}</span>
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
        default:
          return null;
    }
  }, [
    assign,
    currentPage,
    currentQuestion,
    formatTime,
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
    timeLeft,
  ]);

  return <div className="App">{renderPage()}</div>;
}

export default Assignment;
