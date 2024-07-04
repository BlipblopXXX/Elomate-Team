import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Mentoring.css";

function Mentoring() {
  const [currentPage, setCurrentPage] = useState("main");
  const [addScheduleButtonClicked, setAddScheduleButtonClicked] =
    useState(true);
  const [ongoingButtonClicked, setOngoingButtonClicked] = useState(false);
  const [closedButtonClicked, setClosedButtonClicked] = useState(false);
  const [showMentoringA, setShowMentoringA] = useState(true);
  const [showMentoringB, setShowMentoringB] = useState(false);
  const [showMentoringC, setShowMentoringC] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [ongoingSchedules, setOngoingSchedules] = useState([]);
  const [closedSchedules, setClosedSchedules] = useState([]);

  const handleMain = () => {
    setCurrentPage("main");
  };

  const handleSecond = () => {
    setCurrentPage("second");
  };

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleAddScheduleButtonClick = () => {
    setAddScheduleButtonClicked(true);
    setOngoingButtonClicked(false);
    setClosedButtonClicked(false);
    setShowMentoringA(true);
    setShowMentoringB(false);
    setShowMentoringC(false);
  };

  const handleOngoingButtonClicked = () => {
    setAddScheduleButtonClicked(false);
    setOngoingButtonClicked(true);
    setClosedButtonClicked(false);
    setShowMentoringA(false);
    setShowMentoringB(true);
    setShowMentoringC(false);
  };

  const handleClosedButtonClick = () => {
    setAddScheduleButtonClicked(false);
    setOngoingButtonClicked(false);
    setClosedButtonClicked(true);
    setShowMentoringA(false);
    setShowMentoringB(false);
    setShowMentoringC(true);
  };

  const [date, setDate] = useState(new Date());

  const formatDate = (date) => {
    let d = new Date(date),
      day = "" + d.getDate(),
      month = "" + (d.getMonth() + 1),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const [start_time, setTime] = useState();
  const [end_time, setTime1] = useState();

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  const handleChangeEnd = (event) => {
    setTime1(event.target.value);
  };

  const [type, setType] = useState(null);
  const handleCheckboxTypeChange = (option) => {
    setType(option);
  };

  const [method, setMethod] = useState(null);
  const handleCheckboxMethodChange = (option) => {
    setMethod(option);
  };

  const [mentor, setmentor] = useState("");
  const handleInputTopicChange = (event) => {
    settopic(capitalizeWords(event.target.value));
  };

  const [topic, settopic] = useState("");
  const handleInputMentorChange = (event) => {
    setmentor(capitalizeWords(event.target.value));
  };

  const [competencies, setCompetencies] = useState([]);
  const handleCompetencyChange = (option) => {
    if (competencies.includes(option)) {
      setCompetencies(competencies.filter((item) => item !== option));
    } else {
      setCompetencies([...competencies, option]);
    }
  };

  const fetchSchedulesType1 = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3001/mentoring?type=1",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSchedules(response.data.schedules);
      console.log("Type 1 schedules:", response.data.schedules);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      alert(error.message || "Failed to fetch schedules");
    }
  };

  const fetchSchedulesType2 = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3001/mentoring?type=2",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setClosedSchedules(response.data.schedules);
      console.log("Type 2 schedules:", response.data.schedules);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      alert(error.message || "Failed to fetch schedules");
    }
  };

  useEffect(() => {
    if (showMentoringA) {
      fetchSchedulesType1();
    } else if (showMentoringC) {
      fetchSchedulesType2();
    }
  }, [showMentoringA, showMentoringC]);

  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [time1Error, setTime1Error] = useState("");
  const [typeError, setTypeError] = useState("");
  const [methodError, setMethodError] = useState("");
  const [mentorError, setmentorError] = useState("");
  const [topicError, settopicError] = useState("");
  const [competenciesError, setCompetenciesError] = useState("");
  const [mentoringID, setMentoringID] = useState("");
  const [selectedMentoringID, setSelectedMentoringID] = useState(null);

  const handleAddButtonClick = async () => {
    setDateError("");
    setTimeError("");
    setTime1Error("");
    setTypeError("");
    setMethodError("");
    setmentorError("");
    settopicError("");
    setCompetenciesError("");

    let valid = true;
    if (!date) {
      setDateError("*Date is required.");
      valid = false;
    }
    if (!start_time) {
      setTimeError("*Start time is required.");
      valid = false;
    }
    if (!end_time) {
      setTime1Error("*End time is required.");
      valid = false;
    }
    if (!type) {
      setTypeError("*Type is required.");
      valid = false;
    }
    if (!method) {
      setMethodError("*Method is required.");
      valid = false;
    }
    if (!mentor.trim()) {
      setmentorError("*Mentor name is required.");
      valid = false;
    }
    if (!topic.trim()) {
      settopicError("*Topic name is required.");
      valid = false;
    }
    if (competencies.length === 0) {
      setCompetenciesError("*At least one competency is required.");
      valid = false;
    }

    if (!valid) return;

    const newSchedule = {
      type: type,
      datetime: `${formatDate(date)}, ${start_time} WIB - ${end_time} WIB`,
      method: method,
      mentor: capitalizeWords(mentor),
      topic: capitalizeWords(topic),
      competencies: competencies.join(", "),
      status: "Completed",
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3001/mentoring",
        {
          date: date,
          start_time: start_time,
          end_time: end_time,
          method: method,
          type: type,
          mentor: mentor,
          topic: topic,
          competencies: competencies,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update schedules state locally
      setSchedules([...schedules, newSchedule]);

      alert("Schedule added successfully!");
      handleOngoingButtonClicked();

      setDate(new Date());
      setTime("");
      setTime1("");
      setType(null);
      setMethod(null);
      setmentor("");
      settopic("");
      setCompetencies([]);
    } catch (error) {
      console.error("Error adding schedule:", error);
      alert(error.message || "Failed to add schedule");
    }
  };

  // const [status, setStatus] = useState("On Going");
  const [form, setForm] = useState({
    lesson: "",
    notes: "",
    file: null,

  });
  const [status, setStatus] = useState("");
  const [lesson, setLesson] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);

  const handleFormButtonClick = async (mentoringID) => {
    const token = localStorage.getItem("token");

    const form = {
      lesson_learned: lesson,
      mentor_notes: notes,
      // status: "Closed",
    };

    try {
        await axios.post(`http://localhost:3001/mentoring/${mentoringID}`, form, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        setForm({
            lesson: "",
            notes: "",
            file: null,
        });
        setCurrentPage("closed");
    } catch (error) {
        console.error("Error submitting feedback:", error);
    }

    setSelectedMentoringID(mentoringID);
    handleSecond();
};


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    fetchSchedulesType1(); // Load ongoing schedules initially
    fetchSchedulesType2(); // Load closed schedules initially
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      console.log("File selected:", file);
    }
  };

  const [lessonError, setLessonError] = useState("");
  const [notesError, setNotesError] = useState("");

  const handleSubmitFormButton = async () => {
    setLessonError("");
    setNotesError("");

    let valid = true;

    if (!lesson.trim()) {
      setLessonError("*Lesson learned is required.");
      valid = false;
    }

    if (!notes.trim()) {
      setNotesError("*Notes are required.");
      valid = false;
    }

    if (!valid) return;

    try {
      console.log("Submitting form with the following data:");
      console.log("Lesson learned:", lesson);
      console.log("Mentor notes:", notes);
      console.log("Selected mentoring ID:", selectedMentoringID);

      const token = localStorage.getItem("token");
      console.log("Using token:", token);

      await axios.post(
        `http://localhost:3001/mentoring/${selectedMentoringID}`,
        {
          lesson_learned: lesson,
          mentor_notes: notes,
          status: "Closed",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Submit Feedback Form successfully!");

      setLesson("");
      setNotes("");
      setFile(null);
      setStatus("");

      handleMain();
      handleClosedButtonClick();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.message || "Failed to submit");
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "main":
        return (
          <div className="mentoring">
            <div className="title">
              <h>
                <b>Mentoring</b>
              </h>
            </div>
            <div className="button">
              <div
                className={`addSchedule-button ${
                  addScheduleButtonClicked ? "active" : ""
                }`}
                onClick={handleAddScheduleButtonClick}
              >
                Add Schedule
              </div>
              <div
                className={`ongoing-button ${
                  ongoingButtonClicked ? "active" : ""
                }`}
                onClick={handleOngoingButtonClicked}
              >
                Ongoing
              </div>
              <div
                className={`closed-button ${
                  closedButtonClicked ? "active" : ""
                }`}
                onClick={handleClosedButtonClick}
              >
                Closed
              </div>
            </div>
            <hr />
            {showMentoringA && (
              <div className="add">
                <div className="schedule-container">
                  <p className="judul">Date</p>
                  <input
                    type="date"
                    className="dateInput"
                    value={formatDate(date)}
                    onChange={(e) => setDate(new Date(e.target.value))}
                  />
                  <div className="error">{dateError}</div>
                  <div className="time">
                    <div className="start1">
                      <p className="judultime">Start</p>
                      <input
                        type="time"
                        className="timeInput"
                        value={start_time}
                        onChange={handleChange}
                      />
                      <div className="error">{timeError}</div>
                    </div>
                    <div className="end1">
                      <p className="judultime">End</p>
                      <input
                        type="time"
                        className="timeInput1"
                        value={end_time}
                        onChange={handleChangeEnd}
                      />
                      <div className="error">{time1Error}</div>
                    </div>
                  </div>
                  <div>
                    <p className="judul">Method</p>
                    <label className="checkbox1">
                      <input
                        type="checkbox"
                        checked={method === "Offline"}
                        onChange={() => handleCheckboxMethodChange("Offline")}
                      />
                      Offline
                    </label>

                    <label className="checkbox2">
                      <input
                        type="checkbox"
                        checked={method === "Online"}
                        onChange={() => handleCheckboxMethodChange("Online")}
                      />
                      Online
                    </label>
                    <div className="error">{methodError}</div>
                  </div>
                  <div>
                    <p className="judul">Type</p>
                    <label className="option1">
                      <input
                        type="checkbox"
                        checked={type === "Mentoring"}
                        onChange={() => handleCheckboxTypeChange("Mentoring")}
                      />
                      Mentoring
                    </label>

                    <label className="option1">
                      <input
                        type="checkbox"
                        checked={type === "Coaching"}
                        onChange={() => handleCheckboxTypeChange("Coaching")}
                      />
                      Coaching
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        checked={type === "Review"}
                        onChange={() => handleCheckboxTypeChange("Review")}
                      />
                      Review
                    </label>
                    <div className="error">{typeError}</div>
                  </div>
                  <div>
                    <p className="judul">Mentor</p>
                    <label className="inputText">
                      <input
                        type="text"
                        className="inputan"
                        value={mentor}
                        onChange={handleInputMentorChange}
                      />
                    </label>
                    <div className="error">{mentorError}</div>
                  </div>
                  <div>
                    <p className="judul">Topic</p>
                    <label className="inputText">
                      <input
                        type="text"
                        className="inputan"
                        value={topic}
                        onChange={handleInputTopicChange}
                      />
                    </label>
                    <div className="error">{topicError}</div>
                  </div>
                  <div className="competency">
                    <p className="judul">Competencies</p>
                    <label className="checkbox1">
                      <input
                        type="checkbox"
                        checked={competencies.includes("Behavior Competencies")}
                        onChange={() =>
                          handleCompetencyChange("Behavior Competencies")
                        }
                      />
                      Behavior Competencies
                    </label>
                    <label className="checkbox1">
                      <input
                        type="checkbox"
                        checked={competencies.includes(
                          "Business Management Competencies"
                        )}
                        onChange={() =>
                          handleCompetencyChange(
                            "Business Management Competencies"
                          )
                        }
                      />
                      Business Management Competencies
                    </label>
                    <label className="checkbox1">
                      <input
                        type="checkbox"
                        checked={competencies.includes(
                          "Technical Operation Competencies"
                        )}
                        onChange={() =>
                          handleCompetencyChange(
                            "Technical Operation Competencies"
                          )
                        }
                      />
                      Technical Operation Competencies
                    </label>
                    <label className="checkbox1">
                      <input
                        type="checkbox"
                        checked={competencies.includes("English Literacy")}
                        onChange={() =>
                          handleCompetencyChange("English Literacy")
                        }
                      />
                      English Literacy
                    </label>
                    <label className="checkbox1">
                      <input
                        type="checkbox"
                        checked={competencies.includes("Future Learning")}
                        onChange={() =>
                          handleCompetencyChange("Future Learning")
                        }
                      />
                      Future Learning
                    </label>
                    <div className="error">{competenciesError}</div>
                  </div>
                  <div className="containerButton">
                    <button
                      className="addButton"
                      onClick={handleAddButtonClick}
                    >
                      Add
                    </button>
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
                      {schedules.map((schedule) => (
                        <tr key={schedule.MENTORINGID}>
                          <td>{schedule.TYPE}</td>
                          <td>
                            {schedule.DATE} / {schedule.START_TIME} WIB -{" "}
                            {schedule.END_TIME} WIB
                          </td>
                          <td>{schedule.METHOD}</td>
                          <td>{schedule.MENTOR}</td>
                          <td>{schedule.TOPIC}</td>
                          <td>{schedule.COMPETENCIES}</td>
                          <td>
                            <button
                              className="formButton"
                              onClick={() =>
                                handleFormButtonClick(schedule.MENTORINGID)
                              }
                            >
                              Feedback Form
                            </button>
                          </td>
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
                      {closedSchedules.map((schedule) => (
                        <tr key={schedule.MENTORINGID}>
                          <td>{schedule.TYPE}</td>
                          <td>
                            {schedule.DATE} / {schedule.START_TIME} WIB -{" "}
                            {schedule.END_TIME} WIB
                          </td>
                          <td>{schedule.METHOD}</td>
                          <td>{schedule.MENTOR}</td>
                          <td>{schedule.TOPIC}</td>
                          <td>{schedule.COMPETENCIES}</td>
                          <td className="status">{schedule.STATUS}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );
      case "second":
        const selectedMentoring = schedules.find(
          (schedule) => schedule.MENTORINGID === selectedMentoringID
        );
        console.log(selectedMentoring);
        return (
          <div className="mentoring">
            <div className="title2">
              <img
                className="backbutton"
                onClick={handleMain}
                src="/src/files/icons/backbutton.png"
              />
              <h>
                <b>Feedback Form</b>
              </h>
            </div>
            <hr />

            <div className="description">
              <div className="form-container">
                <div className="upper">
                  {selectedMentoring && (
                    <div key={selectedMentoring.MENTORINGID}>
                      <div className="header">
                        <div className="atas">
                          <div className="bagian">
                            <p className="judul">Type</p>
                            <div className="value">
                              {selectedMentoring.TYPE}
                            </div>
                          </div>

                          <div className="bagian">
                            <p className="judul">Date</p>
                            <div className="value">
                              {selectedMentoring.DATE}
                            </div>
                          </div>

                          <div className="bagian">
                            <p className="judul">Mentor</p>
                            <div className="value">
                              {selectedMentoring.MENTOR}
                            </div>
                          </div>
                        </div>
                        <div className="bawah">
                          <div className="bagian">
                            <p className="judul">Method</p>
                            <div className="value">
                              {selectedMentoring.METHOD}
                            </div>
                          </div>

                          <div className="bagian">
                            <p className="judul">Time</p>
                            <div className="value">
                              {selectedMentoring.START_TIME} WIB -{" "}
                              {selectedMentoring.END_TIME} WIB
                            </div>
                          </div>

                          <div className="bagian">
                            <p className="judul">Topic</p>
                            <div className="value">
                              {selectedMentoring.TOPIC}
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <p className="judul-form">
                        <strong>Kompetensi Yang Dievaluasi</strong>
                      </p>
                      <div className="bagian">
                        <div className="value1">
                          {selectedMentoring.COMPETENCIES}
                        </div>
                      </div>

                      <p className="judul-form1">
                        <strong>Lesson Learned Competencies</strong>
                      </p>
                      <div>
                        <p className="form-desc">
                          Tuliskan dalam bentuk poin pembelajaran yang didapat
                          selama Mentoring / Coaching
                        </p>
                      </div>
                      <div>
                        <input
                          className="answer"
                          type="text"
                          placeholder="Your Answer"
                          value={lesson}
                          onChange={(e) => setLesson(e.target.value)}
                        />
                        <div className="error">{lessonError}</div>
                      </div>
                      <p className="judul-form1">
                        <strong>notes Mentor</strong>
                      </p>
                      <div>
                        <p className="form-desc">
                          notes terkait hal yang sudah improve dan area of
                          development
                        </p>
                      </div>
                      <div>
                        <input
                          className="answer"
                          type="text"
                          placeholder="Your Answer"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                        <div className="error">{notesError}</div>
                      </div>
                      <p className="judul-form1">
                        <strong>Attachment</strong>
                      </p>
                      <div className="file">
                        <form onSubmit={handleSubmit}>
                          <input
                            className="file-input"
                            type="file"
                            onChange={handleFileChange}
                          />
                        </form>
                      </div>
                      <button
                        className="submitButton"
                        onClick={handleSubmitFormButton}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };
  return <div className="App">{renderPage()}</div>;
}

export default Mentoring;
