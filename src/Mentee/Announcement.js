import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Announcement.css';

function Announcement() {
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Redirect to login if token is not available
          window.location.href = '/login';
          return;
        }
  
        const response = await axios.get('http://localhost:3001/announcement', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        console.log('Fetched announcements:', response.data);
        setAnnouncements(response.data.announcements);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.href = '/login';
        } else {
          console.error('Error fetching announcements:', error);
        }
      }
    };

    fetchAnnouncements();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.TITLE.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAnnouncementClick = async (announcementId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const response = await axios.get(`http://localhost:3001/announcement/${announcementId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    setSelectedAnnouncement(response.data.announcement);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    } else {
      console.error('Error fetching announcement:', error);
    }
  }
};


  const handleBackClick = () => {
    setSelectedAnnouncement(null);
  };

  // Helper functions to format date and datetime
  function formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function formatDateTime(dateTimeString) {
    if (!dateTimeString) return '';
    const options = {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  }

  if (selectedAnnouncement) {
    // Render the selected announcement's details
    return (
      <div className="announcement-detail">
        <img
          className="backbutton"
          onClick={handleBackClick}
          src="/src/files/icons/backbutton.png"
          alt="Back"
        />
        <h1>{selectedAnnouncement.TITLE}</h1>
        <div className="announcement-detail-header">
          <p><strong>Posted:</strong> {formatDateTime(selectedAnnouncement.CREATED_AT)}</p>
          <p className="due"><strong>Due:</strong> {formatDate(selectedAnnouncement.DUE_DATE)}</p>
        </div>
        <div className="content">
          <p>{selectedAnnouncement.CONTENT}</p>
        </div>
      </div>
    );
  }

  // Render the list of announcements
  return (
    <div className="announcement">
      <div className="title">
        <h1><b>Announcement</b></h1>
      </div>
      <hr />

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="notification-list">
        {filteredAnnouncements.map((announcement) => (
          <div
            className="notification"
            key={announcement.ANNOUNCEMENT_ID}
            onClick={() => handleAnnouncementClick(announcement.ANNOUNCEMENT_ID)}
          >
            <div className="notification-header">
              <h2>{announcement.TITLE}</h2>
              <p className="due"><strong>Due:</strong> {formatDate(announcement.DUE_DATE)}</p>
            </div>
            <p><strong>Posted:</strong> {formatDateTime(announcement.CREATED_AT)}</p>
            {/* Add the truncated content preview */}
            <p className="content-preview">{announcement.CONTENT}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Announcement;
