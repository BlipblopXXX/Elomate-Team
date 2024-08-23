import React, { useState, useEffect } from "react";
import "./Assignment.css";
import axios from "axios";

function Assignment() {
  const [currentPage, setCurrentPage] = useState("main");
  const [selectedPhase, setSelectedPhase] = useState("option1");
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

  const handleOptionChange = (questionId, selectedAnswer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question) => {
      const correctAnswer = question.KUNCI_JAWABAN;
      const selectedAnswer = answers[question.SOAL_ID];
      if (selectedAnswer === correctAnswer) {
        score += 100 / questions.length;
      }
    });
    return Math.round(score);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3001/courses/${selectedTopic}/${
            selectedPhase === "option1" ? "Phase 10" : "Phase 20 + 70"
          }`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourses(response.data.courses);
        console.log("Name, and Phase", response.data.courses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    if (selectedTopic) {
      fetchCourses();
    }
  }, [selectedPhase, selectedTopic]);

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

  const fetchAssigns = async (courseId) => {
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
      console.log("Assignment", response.data.assigns);
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    }
  };

  const getRandomQuestions = (questions, numQuestions = 5) => {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
  };

  const fetchQuestions = async (courseId) => {
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
      console.log("Random Questions", randomQuestions);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };

  const fetchScoreId = async (courseId, testType) => {
    try {
      const token = localStorage.getItem("token");
      let url = `http://localhost:3001/score/${courseId}`;

      if (testType) {
        url += `?testType=${testType}`;
      }

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response Data:", response.data);
      setScoreId(response.data);
    } catch (error) {
      console.error("Failed to fetch Score:", error);
    }
  };

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

  const handleMain = () => {
    setCurrentPage("main");
    setSelectedAssign(null);
  };

  const handleSecond = () => {
    console.log("Handling second page for course ID:", selectedCourse);
    console.log("Handling second page for Program ID:", selectProgramId);

    setCurrentPage("second");

    fetchAssigns(selectedCourse);
    fetchScoreId(selectedCourse);
  };

  const handleStart = () => {
    setCurrentPage("fourth");
    fetchQuestions(selectedCourse);
  };

  const handleThird = async (assignId) => {
    console.log("Handling third page for assignment ID:", assignId);
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
      console.log("assign", assignment);
      console.log("courseId", assignment.COURSEID);
      console.log("setSelectedTest", assignment.AssignName);

      setSelectedAssignDetails([assignment]);
      setSelectedTest(assignment.ASSIGNID);
      setSelectedCourse(assignment.COURSEID);
      setSelectedAssign(assignment.AssignName);

      // Memanggil fetchScoreId dengan COURSEID dan setSelectedTest sebagai testType
      await fetchScoreId(assignment.COURSEID, assignment.AssignName);

      setCurrentPage("third");
    } catch (error) {
      console.error("Failed to fetch assignment details:", error);
    }
  };

  useEffect(() => {
    if (selectedPhase === "option1") {
      setSelectedTopic("General Development");
    } else if (selectedPhase === "option2") {
      setSelectedTopic("Project");
    }
  }, [selectedPhase]);

  const handlePhaseChange = (event) => {
    setSelectedPhase(event.target.value);
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course.COURSEID);
    setProgramId(course.PROGRAMID);
  };

  const handleStartClick = () => {
    if (
      window.confirm("Apakah Anda yakin ingin memulai mengerjakan soal ini?")
    ) {
      handleStart();
    }
  };

  const handleFinishClick = async () => {
    if (window.confirm("Apakah Anda yakin ingin menyelesaikan soal ini?")) {
      console.log("User confirmed, starting process...");
      try {
        const token = localStorage.getItem("token");

        console.log("Fetching correct answers...");
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

        console.log("Correct answers fetched:", correctAnswers);

        let correctCount = 0;
        questions.forEach((question) => {
          const selectedAnswer = answers[question.SOAL_ID];
          const correctAnswer = correctAnswers.find(
            (ans) => ans.SOAL_ID === question.SOAL_ID
          )?.KUNCI_JAWABAN;

          if (selectedAnswer === correctAnswer) {
            correctCount++;
          }
        });

        const score = Math.round((correctCount / questions.length) * 100);
        console.log("Score calculated:", score);

        // Log the progress state and selectedCourse for debugging
        console.log("Progress state:", progress);
        console.log("Selected course:", selectedCourse);
        console.log("Selected assign:", selectedAssign);

        console.log("Submitting score with programid:", selectProgramId);

        await axios.post(
          `http://localhost:3001/score`,
          {
            programid: selectProgramId,
            courseid: selectedCourse,
            type: selectedAssign,
            score: score,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Score submitted successfully");

        setAssign((prevAssign) =>
          prevAssign.map((item) =>
            item.COURSEID === selectedCourse ? { ...item, STATUS: "completed" } : item
          )
        );

        setSelectedAssignDetails((prevDetails) =>
          prevDetails.map((detail) => ({
            ...detail,
            SCORE: score,
          }))
        );

        handleSecond();
      } catch (error) {
        console.error("Gagal submit jawaban:", error);
      }
    }
  };

  const renderOptions = (question) => {
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
  };

  const handlePreviousClick = () => {
    setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextClick = () => {
    setCurrentQuestion((prev) =>
      prev < questions.length - 1 ? prev + 1 : prev
    );
  };

  const getDescription = () => {
    const filteredCourses = courses.filter(
      (course) => course.ProgramName === selectedTopic
    );

    return (
      <div className="course-container">
        {filteredCourses.map((course) => {
          const courseProgress = progress.find(
            (prog) => prog.name === course.CourseName
          );
          const progressValue = courseProgress ? courseProgress.value : 0;

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
                onClick={() => handleSecond(course.COURSEID, course.PROGRAMID)}
              >
                Click to View the activity
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderAssignSelected = () => {
    console.log("Selected Test:", selectedTest);

    return (
      <div>
        {selectedAssignDetails.map((assignDetail, index) => {
          let questionType = null;
          if (questions && questions.length > 0) {
            questionType = questions[0].TYPE;
            console.log("Question Type:", questionType);
          }

          console.log("Processing assignDetail:", assignDetail);

          console.log("Available scores:", scoreId.scores);

          scoreId.scores.forEach((score) => {
            console.log("Score Data:", score);
          });


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
                    {scoreId.scores.length > 0
                      ? scoreId.scores[scoreId.scores.length - 1].SCORE
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
                <div className="assign-button" onClick={handleStartClick}>
                  Start
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderSelected = () => {
    if (selectedCourse) {
      const selected = courses.find((item) => item.COURSEID === selectedCourse);
      const courseProgress = progress.find(
        (prog) => prog.COURSEID === selectedCourse
      );
      const progressValue = courseProgress ? courseProgress.value : 0;

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
  };

  const renderAssignDetails = () => {
    if (selectedCourse) {
      const assignDetails = assign.filter(
        (item) => item.COURSEID === selectedCourse
      );

      return assignDetails.map((item, index) => (
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
            <div className={`assign-status ${item.STATUS.toLowerCase()}`}>
            {item.STATUS === "completed" ? "Completed" : item.STATUS}
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
      ));
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

  const renderPage = () => {
    switch (currentPage) {
      case "main":
        const filteredPrograms = programs.filter(
          (program) =>
            program.PHASE ===
            (selectedPhase === "option1" ? "Phase 10" : "Phase 20 + 70")
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
            <div
              className="assign-details-container"
              style={assignDetailsStyle}
            >
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
              <div className="question">{questions[currentQuestion].NAMA}</div>
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
                  <button onClick={() => handleFinishClick()}>Finish</button>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default Assignment;
