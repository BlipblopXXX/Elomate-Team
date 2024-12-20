// Mentoring.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Mentoring.css";

function Mentoring() {
  const [schedules, setSchedules] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fungsi untuk mengambil data mentoring berdasarkan type
  const fetchSchedulesByType = async (type) => {
    try {
      const token = localStorage.getItem("token");
      console.log(`Fetching schedules with type=${type}`);
      const response = await axios.get(`http://localhost:3001/mentoring?type=${type}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`Schedules for type=${type}:`, response.data.schedules);
      return response.data.schedules;
    } catch (error) {
      console.error(`Error fetching schedules with type=${type}:`, error);
      throw error;
    }
  };

  // Fungsi untuk mengambil semua jadwal mentoring (type=1 dan type=2)
  const fetchFacilitatorSchedules = async () => {
    try {
      setLoading(true);
      setError("");
      const ongoingSchedules = await fetchSchedulesByType(1); // On Going
      const closedSchedules = await fetchSchedulesByType(2); // Closed
      const allSchedules = [...ongoingSchedules, ...closedSchedules];
      setSchedules(allSchedules);
      console.log("All facilitator schedules:", allSchedules);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch mentoring schedules");
      console.error("Error fetching facilitator schedules:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilitatorSchedules();
  }, []);

  // Fungsi untuk menangani klik tombol Feedback Form
  const handleFeedbackFormClick = (schedule) => {
    if (schedule.STATUS === "Completed") {
      setSelectedFeedback(schedule);
      setIsModalOpen(true);
    } else {
      alert("The user has not submitted a feedback form");
    }
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeedback(null);
  };

  return (
    <div className="mentoring-facilitator">
      {/* Judul */}
      <div className="title">
        <h2><b>Mentoring - Facilitator</b></h2>
      </div>
      <hr />

      {/* Tabel Mentoring */}
      <div className="table-container">
        {loading ? (
          <p>Loading mentoring schedules...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <table className="mentoring-table">
            <thead>
              <tr>
                <th>Nama (User)</th>
                <th>Date & Time</th>
                <th>Batch</th>
                <th>Method</th>
                <th>Type</th>
                <th>Topic</th>
                <th>Competencies</th>
                <th>Feedback Form</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {schedules.length === 0 ? (
                <tr>
                  <td colSpan="9" className="no-data">No mentoring schedules available.</td>
                </tr>
              ) : (
                schedules.map((schedule) => (
                  <tr key={schedule.MENTORINGID}>
                    <td>{schedule.USERNAME}</td>
                    <td>
                      {schedule.DATE} / {schedule.START_TIME} WIB - {schedule.END_TIME} WIB
                    </td>
                    <td>{schedule.BATCH}</td>
                    <td>{schedule.METHOD}</td>
                    <td>{schedule.TYPE}</td>
                    <td>{schedule.TOPIC}</td>
                    <td>{schedule.COMPETENCIES}</td>
                    <td>
                      <button
                        className="feedback-button"
                        onClick={() => handleFeedbackFormClick(schedule)}
                      >
                        Feedback Form
                      </button>
                    </td>
                    <td className={schedule.STATUS === "Completed" ? "status-completed" : "status-incompleted"}>
                      {schedule.STATUS === "Completed" ? "Completed" : "Incompleted"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Feedback Form */}
      {isModalOpen && selectedFeedback && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h3>Feedback Form</h3>
            <div className="feedback-details">
              <p><strong>Lesson Learned:</strong> {selectedFeedback.LESSON_LEARNED || "N/A"}</p>
              <p><strong>Mentor Notes:</strong> {selectedFeedback.MENTOR_NOTES || "N/A"}</p>
              {/* Tambahkan detail lain jika diperlukan */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mentoring;
