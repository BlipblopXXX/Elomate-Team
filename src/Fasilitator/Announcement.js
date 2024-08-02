import React, { useState } from 'react';
import './Announcement.css'

const notifications = [
    { title: 'A Notif', posted: 'Senin, 11 Maret 2024', due: 'Kamis, 14 Mar 2024'},
    { title: 'B Notif', posted: 'Selasa, 12 Maret 2024', due: 'Jumat, 15 Mar 2024'},
    { title: 'C Notif', posted: 'Rabu, 13 Maret 2024', due: 'Sabtu, 16 Mar 2024'}
];

function Announcement() {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredNotifications = notifications.filter(notification =>
        notification.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
        <div className="announcement">
            <div className="title">
                <h><b>Announcement</b></h>
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
                {filteredNotifications.map((notification, index) => (
                    <div className="notification" key={index}>
                        <div className="notification-header">
                            <h2>{notification.title}</h2>
                            <p className="due"><strong>Due:</strong> {notification.due}</p>
                        </div>
                        <p><strong>Posted:</strong> {notification.posted}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Announcement;