import React, { useState, useEffect } from 'react';
import './Schedule.css';
import axios from 'axios';

function Schedule() {
    const [currentPage, setCurrentPage] = useState('main'); // 'main' for batch selection, 'second' for schedule
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [activities, setActivities] = useState([]);
    const batches = [1, 2, 3, 4, 5, 6, 7, 8];

    // Handle returning to main page
    const handleMain = () => {
        setCurrentPage('main');
        setSelectedBatch(null);
        setActivities([]);
    };

    // Handle batch selection
    const handleBatchClick = (batchName) => {
        console.log(`Clicked on Batch ${batchName}`);
        setSelectedBatch(batchName);
        setCurrentPage('second');
    };

    // Batch Card Component
    const BatchCard = ({ batchName, onClick }) => (
        <div className="batch-card" onClick={onClick}>
            <img className="batch-icon" src="/src/files/icons/Batch.svg" alt={`Batch ${batchName}`} />
            <h3>Batch {batchName}</h3>
        </div>
    );

    // Calculate number of days in the current month
    const daysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    // Determine the starting day of the month
    const startOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    // Handle date click in the calendar
    const handleDateClick = (day) => {
        setSelectedDate(day);
    };

    // Format date to 'YYYY-MM-DD'
    const getFormattedDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Fetch activities from the backend based on selected batch and current month
    const fetchActivities = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error('Token not found');
                alert('You are not authenticated. Please log in.');
                return;
            }

            // Calculate start and end of the current month
            const startOfMonthDate = new Date(date.getFullYear(), date.getMonth(), 1);
            const endOfMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            const startOfMonthFormatted = getFormattedDate(startOfMonthDate);
            const endOfMonthFormatted = getFormattedDate(endOfMonthDate);

            console.log('Fetching activities for Batch:', selectedBatch);
            console.log('Date range:', startOfMonthFormatted, 'to', endOfMonthFormatted);

            const response = await axios.get("http://localhost:3001/activity/batch", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                params: {
                    startDate: startOfMonthFormatted,
                    endDate: endOfMonthFormatted,
                    batch: selectedBatch // Pass selected batch as query parameter
                }
            });

            console.log('Activities fetched:', response.data.activities);
            setActivities(response.data.activities);
        } catch (error) {
            console.error('Failed to fetch activities', error.response ? error.response.data : error.message);
            if (error.response && error.response.data && error.response.data.message) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert(`Error: ${error.message}`);
            }
        }
    };

    // Fetch activities when 'second' page is rendered or date/batch changes
    useEffect(() => {
        if (currentPage === 'second' && selectedBatch !== null) {
            fetchActivities();
        }
        
    }, [currentPage, selectedBatch, date]);

    const renderCalendar = () => {
        const days = [];
        const totalDays = daysInMonth(date);
        const startingDay = startOfMonth(date);

        // Fill empty slots for days before the first of the month
        for (let i = 0; i < startingDay; i++) {
            days.push(<div key={`empty-${i}`} className="empty"></div>);
        }

        // Populate days with events
        for (let i = 1; i <= totalDays; i++) {
            const formattedDate = getFormattedDate(new Date(date.getFullYear(), date.getMonth(), i));
            const eventForDay = activities.some(event => event.DATE === formattedDate);
            const hasDeadlineAssignment = activities.some(event => event.DATE === formattedDate && event.TYPE === 'Deadline Assignment');
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

    // Navigate to previous month
    const prevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    };

    // Navigate to next month
    const nextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    };

    // Display events and details for the selected date
    const getDayAndDateDescription = () => {
        if (selectedDate !== null) {
            const selectedDateObj = new Date(date.getFullYear(), date.getMonth(), selectedDate);
            const day = selectedDateObj.toLocaleDateString('default', { weekday: 'short' });
            const formattedDate = getFormattedDate(selectedDateObj);
            const eventsForDay = activities.filter(event => event.DATE === formattedDate);

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
                        {eventsForDay.length > 0 ? (
                            eventsForDay.map((event, index) => (
                                <div key={index} className={`event ${event.TYPE === 'Deadline Assignment' ? 'deadline-event' : ''}`}>
                                    <div className="event-title">{event.NAMA}</div>
                                    <div className="event-class">
                                        <img src="/src/files/icons/Class.png" alt="Class Icon" />{event.TYPE}
                                    </div>
                                    <div className="event-place">
                                        <img src="/src/files/icons/Location.png" alt="Location Icon" />{event.LOCATION}
                                    </div>
                                    <div className="event-time">
                                        <img src="/src/files/icons/Time.png" alt="Time Icon" />{event.STARTTIME} - {event.ENDTIME}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-events">No events for this day.</div>
                        )}
                    </div>
                </div>
            );
        }
        return "";
    };

    // Render different pages based on currentPage state
    const renderPage = () => {
        switch (currentPage) {
            case 'main':
                return (
                    <div className="schedule">
                        <div className="title">
                            <h3><b>Schedule</b></h3>
                        </div>
                        <div className="batch-list">
                            {batches.map((batch, index) => (
                                <BatchCard
                                    key={index}
                                    batchName={batch}
                                    onClick={() => handleBatchClick(batch)}
                                />
                            ))}
                        </div>
                    </div>
                )
            case 'second':
                return (
                    <div className="schedule">
                        <div className="title">
                            <h3><b>Schedule</b></h3>
                        </div>
                        <img className="backbutton" onClick={handleMain} src="/src/files/icons/backbutton.png" alt="Back" />
                        <hr />
                        <div className="container">
                            <div className="calendar">
                                <div className="header">
                                    <img src="/src/files/icons/backbutton.png" onClick={prevMonth} alt="Previous Month" />
                                    <h2>{date.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h2>
                                    <img src="/src/files/icons/nextbutton.png" onClick={nextMonth} alt="Next Month" />
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
                )
            default:
                return null;
        }
    }

    return (
        <div className="App">
            {renderPage()}
        </div>
    );
}

export default Schedule;
