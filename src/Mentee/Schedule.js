import React, { useState, useEffect } from 'react';
import './Schedule.css';
import axios from 'axios';

function Schedule() {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        fetchActivities();
    }, [date]);

    const fetchActivities = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error('Token not found');
                return;
            }

            const startOfMonth = getFormattedDate(new Date(date.getFullYear(), date.getMonth(), 1));
            const endOfMonth = getFormattedDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
            console.log('Fetching activities for date range:', startOfMonth, 'to', endOfMonth);

            const response = await axios.get("http://localhost:3001/activity", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                params: {
                    startDate: startOfMonth,
                    endDate: endOfMonth
                }
            });

            console.log('Activities fetched:', response.data.activities);
            setActivities(response.data.activities);
        } catch (error) {
            console.error('Failed to fetch activities', error.response ? error.response.data : error.message);
        }
    };

    const daysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const startOfMonthDay = (date) => { // Ganti nama fungsi untuk menghindari konflik dengan variabel startOfMonth
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

    const getDateWithoutTime = (date) => {
        // Pastikan format tanggal adalah 'YYYY-MM-DD'
        return date;
    };

    const renderCalendar = () => {
        const days = [];
        const totalDays = daysInMonth(date);
        const startingDay = startOfMonthDay(date);

        for (let i = 0; i < startingDay; i++) {
            days.push(<div key={`empty-${i}`} className="empty"></div>);
        }

        for (let i = 1; i <= totalDays; i++) {
            const formattedDate = getFormattedDate(new Date(date.getFullYear(), date.getMonth(), i));
            const eventForDay = activities.some(activity => getDateWithoutTime(activity.DATE) === formattedDate);
            const hasDeadlineAssignment = activities.some(activity => getDateWithoutTime(activity.DATE) === formattedDate && activity.TYPE === 'Deadline Assignment');
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
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    };

    const getDayAndDateDescription = () => {
        if (selectedDate !== null) {
            const selectedDateObj = new Date(date.getFullYear(), date.getMonth(), selectedDate);
            const day = selectedDateObj.toLocaleDateString('default', { weekday: 'short' });
            const formattedDate = getFormattedDate(selectedDateObj);
            const activitiesForDay = activities.filter(activity => getDateWithoutTime(activity.DATE) === formattedDate);

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
                    <div className="activity-details">
                        {activitiesForDay.length > 0 ? (
                            activitiesForDay.map((activity, index) => (
                                <div key={index} className={`activity ${activity.TYPE === 'Deadline Assignment' ? 'deadline-activity' : ''}`}>
                                    <div className="activity-nama">{activity.NAMA}</div>
                                    <div className="activity-type">
                                        <img src="/src/files/icons/Class.png" alt="Class Icon" />{activity.TYPE}
                                    </div>
                                    <div className="activity-location">
                                        <img src="/src/files/icons/Location.png" alt="Location Icon" />{activity.LOCATION}
                                    </div>
                                    <div className="activity-time">
                                        <img src="/src/files/icons/Time.png" alt="Time Icon" />{activity.STARTTIME} - {activity.ENDTIME}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-activities">No activities for this day.</div>
                        )}
                    </div>
                </div>
            );
        }
        return "";
    };

    return (
        <div className="schedule">
            <div className="title">
                <h1><b>Schedule</b></h1> {/* Perbaikan tag HTML */}
            </div>
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
    );
}

export default Schedule;
