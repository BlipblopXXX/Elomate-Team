import React, { useState } from 'react';
import axios from 'axios';
import './Participant.css';

const batches = [1, 2, 3, 4, 5, 6, 7, 8];

const profile = [
  { img: "/src/files/profile/Profile1.png" },
  { img: "/src/files/profile/Profile2.png" },
  { img: "/src/files/profile/Profile3.png" },
];

function Participant() {
  const [currentPage, setCurrentPage] = useState('main');
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMain = () => {
    setCurrentPage('main');
    setSelectedBatch(null);
    setParticipants([]);
  };

  const handleBatchClick = async (batchName) => {
    setSelectedBatch(batchName);
    setCurrentPage('second');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Anda belum login!');
        return;
      }

      const response = await axios.get(
        `http://localhost:3001/participants/${batchName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setParticipants(response.data.people);
    } catch (error) {
      console.error("Gagal mengambil data peserta:", error);
    } finally {
      setLoading(false);
    }
  };

  const BatchCard = ({ batchName, onClick }) => (
    <div className="batch-card" onClick={onClick}>
      <img className="batch-icon" src="/src/files/icons/Batch.svg" alt="Batch Icon" />
      <h3>Batch {batchName}</h3>
    </div>
  );

  const renderDesc = () => {
    if (!selectedBatch) return null;
    return (
      <div className="desc">
        <div className="batch-title">Batch</div>
        <div className="batch">: {selectedBatch}</div>
        <div className="total-title">Jumlah Peserta</div>
        <div className="total">: {participants.length} Peserta</div>
      </div>
    );
  };

  const renderPeople = () => {
    return participants.map((person, index) => {
      const randomIndex = Math.floor(Math.random() * profile.length);
      return (
        <div key={index} className="person">
          <div className="person-info">
            <div className="img">
              <img className="person-img" src={profile[randomIndex].img} alt="Profile" />
            </div>
            <div className="name">
              <div className="name-title">Nama:</div>
              <div className="person-name">{person.NAMA}</div>
            </div>
            <div className="position">
              <div className="position-title">Posisi:</div>
              <div className="person-position">{person.POSISI}</div>
            </div>
            <div className="uni">
              <div className="uni-title">Asal Universitas:</div>
              <div className="person-uni">{person.UNIVERSITY}</div>
            </div>
            <div className="major">
              <div className="major-title">Jurusan:</div>
              <div className="person-major">{person.MAJOR}</div>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        return (
          <div className="schedule">
            <div className="title">
              <h3><b>Participant Data</b></h3>
            </div>
            <div className="batch-list">
              {batches.map((batch) => (
                <BatchCard
                  key={batch}
                  batchName={batch}
                  onClick={() => handleBatchClick(batch)}
                />
              ))}
            </div>
          </div>
        );
      case 'second':
        return (
          <div className="participant">
            <div className="title">
              <h3><b>Participant Data</b></h3>
            </div>
            <img
              className="backbutton"
              onClick={handleMain}
              src="/src/files/icons/backbutton.png"
              alt="Back"
            />
            <hr />
            <div className="participant-desc">
              {renderDesc()}
            </div>
            <div className="participant-container">
              {loading ? <div className="loading">Memuat data...</div> : renderPeople()}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default Participant;
