import React, { useState, useEffect } from 'react';
import './Schedule.css';

const events = [
    { date: '2024-04-01', title: 'Nama Course',             class: 'Class Type', location: 'Ruang 310 Lt 3 TC Jakarta', time: '08.00 - 12.00 WIB'},
    { date: '2024-04-01', title: 'Nama Course',             class: 'Class Type', location: 'Ruang 201 Lt 2 CU Jakarta', time: '10.30 - 14.30 WIB'},
    { date: '2024-04-01', title: 'Nama Course',             class: 'Class Type', location: 'Ruang 100 Lt 1 CU Jakarta', time: '09.00 - 13.00 WIB'},
    { date: '2024-04-09', title: 'Nama Course',             class: 'Class Type', location: 'Ruang 312 Lt 3 BP Jakarta', time: '12.30 - 16.30 WIB'},
    { date: '2024-04-09', title: 'Nama Course',             class: 'Class Type', location: 'Ruang 203 Lt 2 BP Jakarta', time: '11.00 - 15.00 WIB'},
    { date: '2024-04-30', title: 'Reminder Case Deadline',  class: 'Deadline Assignment', location: 'Online',                    time: 'Due : 3 March 2024, 23.59 WIB'},
    { date: '2024-05-03', title: 'Nama Course',             class: 'Class Type', location: 'Ruang 310 Lt 3 TC Jakarta', time: '08.00 - 12.00 WIB'},
    { date: '2024-05-03', title: 'Nama Course',             class: 'Class Type', location: 'Ruang 201 Lt 2 CU Jakarta', time: '10.30 - 14.30 WIB'},
    { date: '2024-05-15', title: 'Nama Course',             class: 'Class Type', location: 'Ruang 100 Lt 1 CU Jakarta', time: '09.00 - 13.00 WIB'},
    { date: '2024-05-15', title: 'Nama Course',             class: 'Class Type', location: 'Ruang 312 Lt 3 BP Jakarta', time: '12.30 - 16.30 WIB'},
    { date: '2024-05-21', title: 'Nama Course',             class: 'Class Type', location: 'Ruang 203 Lt 2 BP Jakarta', time: '11.00 - 15.00 WIB'},
    { date: '2024-05-31', title: 'Reminder Case Deadline',  class: 'Deadline Assignment', location: 'Online',                    time: 'Due : 3 March 2024, 23.59 WIB'}
];

function Schedule() {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        setSelectedDate(new Date().getDate());
    }, []);

    const daysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const startOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const handleDateClick = (day) => {
        setSelectedDate(day);
    };

    const getFormattedDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const renderCalendar = () => {
        const days = [];
        const totalDays = daysInMonth(date);
        const startingDay = startOfMonth(date);

        for (let i = 0; i < startingDay; i++) {
            days.push(<div key={`empty-${i}`} className="empty"></div>);
        }

        for (let i = 1; i <= totalDays; i++) {
            const formattedDate = getFormattedDate(new Date(date.getFullYear(), date.getMonth(), i));
            const eventForDay = events.some(event => event.date === formattedDate);
            const hasDeadlineAssignment = events.some(event => event.date === formattedDate && event.class === 'Deadline Assignment');
            const className = `day ${selectedDate === i ? 'selected' : ''} ${eventForDay ? 'has-event' : ''}`;
            days.push(
                <div key={i} className={className} onClick={() => handleDateClick(i)}>
                    {i}
                    {eventForDay && <div className={`notification-dot ${hasDeadlineAssignment ? 'red-dot' : ''}`}></div>}
                </div>
            );
        }
    
        return days;
    };

    const prevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1));
    };

    const nextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1));
    };

    const getDayAndDateDescription = () => {
        if (selectedDate !== null) {
            const selectedDateObj = new Date(date.getFullYear(), date.getMonth(), selectedDate);
            const day = selectedDateObj.toLocaleDateString('default', { weekday: 'short' });
            const formattedDate = getFormattedDate(selectedDateObj);
            const eventsForDay = events.filter(event => event.date === formattedDate);
    
            return (
                <div className="description-container">
                    <div className="circle-container">
                        <div className="circle-description">
                            <div className="circle-top">
                                <div className="circle-day">{day}</div>
                            </div>
                            <div className="circle-bottom">
                                <div className="circle-date">{selectedDate}</div>
                            </div>
                        </div>
                    </div>
                    <div className="event-details">
                        {eventsForDay.map((event, index) => (
                            <div key={index} className={`event ${event.class === 'Deadline Assignment' ? 'deadline-event' : ''}`}>
                                <div className="event-title">{event.title}</div>
                                <div className="event-class"><img src="/src/files/icons/Class.png" alt="Class Icon" />{event.class}</div>
                                <div className="event-place"><img src="/src/files/icons/Location.png" alt="Location Icon" />{event.location}</div>
                                <div className="event-time"><img src="/src/files/icons/Time.png" alt="Time Icon" />{event.time}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return "";
    };

    return (
        <div className="schedule">
            <div className="title">
                <h><b>Schedule</b></h>
            </div>
            <hr />
            <div className="container">
                <div className="calendar">
                    <div className="header">
                        <img src="/src/files/icons/backbutton.png" onClick={prevMonth} />
                        <h2>{date.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h2>
                        <img src="/src/files/icons/nextbutton.png" onClick={nextMonth} />
                    </div>
                    <div className="days">
                        <div className="day">S</div>
                        <div className="day">M</div>
                        <div className="day">T</div>
                        <div className="day">W</div>
                        <div className="day">T</div>
                        <div className="day">F</div>
                        <div className="day">S</div>
                    </div>
                    <hr />
                    <div className="grid">
                        {renderCalendar()}
                    </div>
                </div>
                <div className="description">
                    {getDayAndDateDescription()}
                </div>
            </div>
        </div>
    );
}

export default Schedule;