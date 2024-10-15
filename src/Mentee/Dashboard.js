import './Dashboard.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Schedule from './Schedule';
import Announcement from './Announcement';

function Dashboard() {
    const [progressData, setProgressData] = useState([]);
    const [currentScreen, setCurrentScreen] = useState('dashboard');
    const [activities, setActivities] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [courses, setCourses] = useState([]);
    const [scores, setScores] = useState([]);
    const [programProgress, setProgramProgress] = useState([]);

    const handleSchedule = () => {
        setCurrentScreen('schedule');
    };

    const handleAnnouncement = () => {
        setCurrentScreen('announcement');
    }

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
              setProgressData(response.data.programs);
              console.log(response.data.programs);
            } catch (error) {
              console.error("Error fetching forum data:", error);
            }
          };

          const fetchActivities = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error('Token not found');
                    return;
                }
    
                const today = new Date();
                const startOfMonth = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-01`;
                const endOfMonth = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()}`;
    
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
    
                setActivities(response.data.activities);
            } catch (error) {
                console.error('Failed to fetch activities', error.response ? error.response.data : error.message);
            }
        };
      
          fetchProgress();
          fetchActivities();
    }, []);

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
          } catch (error) {
            console.error("Failed to fetch programs:", error);
          }
        };
      
        const fetchCourses = async () => {
          try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3001/courses", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            setCourses(response.data.courses);
          } catch (error) {
            console.error("Failed to fetch courses:", error);
          }
        };
      
        const fetchScores = async () => {
          try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3001/score", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            setScores(response.data.scores);
          } catch (error) {
            console.error("Failed to fetch scores:", error);
          }
        };
      
        fetchPrograms();
        fetchCourses();
        fetchScores();
      }, []);  
      
    
      useEffect(() => {
        if (programs.length > 0 && courses.length > 0 && scores.length > 0) {
          calculateProgressPerProgram();
        }
      }, [programs, courses, scores]);
      
      const calculateProgressPerProgram = () => {
        // Group courses by program
        const coursesByProgram = courses.reduce((acc, course) => {
          if (!acc[course.PROGRAMID]) {
            acc[course.PROGRAMID] = [];
          }
          acc[course.PROGRAMID].push(course);
          return acc;
        }, {});
      
        // Calculate progress for each program
        const programProgressData = programs.map((program) => {
          const programCourses = coursesByProgram[program.PROGRAMID] || [];
          let totalProgress = 0;
          let numCourses = programCourses.length;
      
          if (numCourses === 0) {
            return {
              phase: program.PHASE,
              programId: program.PROGRAMID,
              programName: program.NAMA,
              progress: 0,
            };
          }
      
          programCourses.forEach((course) => {
            const preTestScore = scores.find(
              (score) =>
                score.COURSEID === course.COURSEID && score.TYPE === "Pre-Test"
            );
            const postTestScore = scores.find(
              (score) =>
                score.COURSEID === course.COURSEID && score.TYPE === "Post-Test"
            );
      
            let progressValue = 0;
            if (preTestScore) progressValue += 50;
            if (postTestScore) progressValue += 50;
      
            totalProgress += progressValue;
          });
      
          const averageProgress = totalProgress / numCourses;
      
          return {
            phase: program.PHASE,
            programId: program.PROGRAMID,
            programName: program.NAMA,
            progress: averageProgress,
          };
        });
      
        setProgramProgress(programProgressData);
      };
      

    const getDayName = (date) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    };

    const today = new Date();
    const dayName = getDayName(today);
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();

    const formattedDay = `${dayName}`;
    const formattedDate = `${day} ${month} ${year}`;

    const ProgressBar = ({ percentage }) => {
        return (
            <div className="progress-bar">
                <div
                    className="progresss"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        );
    };

            const todo = [
              { id: 1, title: 'Tugas 1 general development on boarding', date: '27-04-2024' },
              { id: 2, title: 'Tugas 2', date: '12-05-2024' },
              { id: 3, title: 'Tugas 3', date: '21-05-2024' },
            ];

              const notif = [
                { Title: 'Pengumuman Deadline Tugas', date: '27 Juli 2024' },
                { Title: 'Pengumuman pengumpulan tugas', date: '01 Agustus 2024' },
                { Title: 'Kegiatan UT Spirit', date: '05 Agustus 2024' },
              ];

    const groupedPrograms = progressData.reduce((acc, program) => {
        if (!acc[program.PHASE]) {
            acc[program.PHASE] = [];
        }
        acc[program.PHASE].push(program);
        return acc;
    }, {});

    // Filter activities for today
    const todayActivities = activities.filter(activity => {
        const activityDate = new Date(activity.DATE);
        return (
            activityDate.getDate() === today.getDate() &&
            activityDate.getMonth() === today.getMonth() &&
            activityDate.getFullYear() === today.getFullYear()
        );
    });

    const renderScreen = () => {
        switch(currentScreen){
            case 'dashboard':
                const programsByPhase = programProgress.reduce((acc, program) => {
                    if (!acc[program.phase]) {
                      acc[program.phase] = [];
                    }
                    acc[program.phase].push(program);
                    return acc;
                  }, {});

                return(
                    <div className="dashboard">
                        <div className="title">
                            <h><b>Dashboard</b></h>
                        </div>
                        <hr />
                        <div className="divider-d">
                        <div className="progress">
                          <div className="progress-up">
                              <div className="progress-title">
                                  Progress
                              </div>
                          </div>
                          <div className="progress-down">
                              <div>
                                  {Object.keys(groupedPrograms).map((phase, index) => (
                                      <div key={index}>
                                          <div className="phase-title">
                                              <h2>{phase}</h2>
                                          </div>
                                          {groupedPrograms[phase].map((program, idx) => (
                                              <div key={idx} className="program-item">
                                                  <p>{program.NAMA}</p>
                                                  <div className='bar'>
                                                      <div className='bar1'>
                                                          <ProgressBar percentage={program.SCORE} />
                                                      </div>
                                                      <div className='bar2'>{program.SCORE}%</div>
                                                  </div>
                                              </div>
                                          ))}
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                            <div className="todolist">
                                <div className="todolist-up">
                                    <div className="todolist-title">
                                        To do List
                                    </div>
                                </div>
                                <div className="todolist-down">
                                <table className="list-table">
                                    <thead>
                                        <tr>
                                        <th className='th1'>No.</th>
                                        <th className='th2'>Title</th>
                                        <th className='th3'>Due Date</th>
                                        <th className='th4'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {todo.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className='th1'>{index + 1}</td>
                                            <td className='th2'>{item.title}</td>
                                            <td className='th3'>{item.date}</td>
                                            <td className='th4'><img src="/src/files/icons/Action.svg" alt="Action" className="action-icon" /></td>
                                        </tr>
                                        ))}
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="agenda-announcement-container">
                                <div className="agenda">
                                    <div className="agenda-up">
                                        <div className="agenda-title">
                                            Schedule
                                        </div>
                                        <div className='view' onClick={handleSchedule}>View All ⇨</div>
                                    </div>
                                    <div className="agenda-down">
                                    <div className="upcoming-activities">
                                        
                                            <div className="day-activities">
                                                <div className='day-date'>
                                                    <div className="day">{formattedDay}</div>
                                                    <div className="agenda-date">{formattedDate}</div>
                                                </div>
                                                <div className="activities">
                                                    {todayActivities.length > 0 ? (
                                                        todayActivities.map((activity, index) => {                                                       
                                                            const startTime = activity.STARTTIME.substring(0, 5);
                                                            const endTime = activity.ENDTIME.substring(0, 5);
                                                            return (
                                                                <div key={index} className="activity">
                                                                    <div className="activity-details">
                                                                        <div className="class-name">{activity.NAMA}</div>
                                                                        <div className="room">{activity.LOCATION}</div>
                                                                    </div>
                                                                    <div className="time">{`${startTime} - ${endTime} WIB`}</div>
                                                                </div>
                                                            );
                                                        })
                                                    ) : (
                                                        <div className="no-activities">
                                                            No activities scheduled for today.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="announcement">
                                    <div className="announcement-up">
                                        <div className="announcement-title">announcement</div>
                                        <div className='view' onClick={handleAnnouncement}>View All ⇨</div>
                                    </div>
                                    <div className="announcement-content">
                                        {notif.map((item, index) => (
                                            <div key={index} className="announcement-details">
                                                <div>
                                                    <div className="notif-title">{item.Title}</div>
                                                    <div className="notif-date">Posted: {item.date}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'schedule':
                return <Schedule />;
            case 'announcement':
                return <Announcement />;
            default:
                return <Dashboard />;
        }
    }

    return(
        <div>
            {renderScreen()}
        </div>
    );
}

export default Dashboard;
