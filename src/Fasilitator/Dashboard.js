import './Dashboard.css';
import React, {useState} from "react";

function Dashboard() {

    const today = new Date();

    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    const [progress, setProgress] = useState(0);
    const [progress2, setProgress2] = useState(0);

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

    // Simulate progress increase over time
    setTimeout(() => {
        if (progress < 100) {
          setProgress(progress + 10);
        }
        }, 1000);
        // Simulate progress increase over time
    setTimeout(() => {
        if (progress2 < 100) {
          setProgress2(progress2 + 20);
        }
        }, 1000);

            const todo = [
              { id: 1, title: 'Tugas 1', date: '27-04-2024' },
              { id: 2, title: 'Tugas 2', date: '12-05-2024' },
              { id: 3, title: 'Tugas 3', date: '21-05-2024' },
            ];

            const agenda = [
                {
                  day: 'Monday',
                  activities: [
                    { className: 'Class', room: 'Room 101', startTime: '08.00', endTime: '10.00'},
                    { className: 'Class', room: 'Room 102', startTime: '11.00', endTime: '13.00' },
                    { className: 'Class', room: 'Room 103', startTime: '14.00', endTime: '15.30' }
                  ]
                }
              ];

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
                        <p>Nama Program       
                            <div className='bar'>
                                <div className='bar1'>
                                    <ProgressBar percentage={progress}/>
                                </div>
                                <div className='bar2'>{progress}%</div>
                            </div>          
                        </p>
                        <p>Nama Program
                        <div className='bar'>
                                <div className='bar1'>
                                    <ProgressBar percentage={progress2}/>
                                </div>
                                <div className='bar2'>{progress2}%</div>
                            </div>
                        </p>
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
                            <th>Title</th>
                            <th className='th2'>Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todo.map((item, index) => (
                            <tr key={item.id}>
                                <td className='th1'>{index + 1}</td>
                                <td>{item.title}</td>
                                <td className='th2'>{item.date}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>
                <div className="agenda">
                    <div className="agenda-up">
                        <div className="agenda-title">
                            Agenda
                        </div>
                        <div className="agenda-date">
                            {formattedDate}
                        </div>
                    </div>
                    <div className="agenda-down">
                    <div className="upcoming-activities">
                        {agenda.map((item) => (
                            <div key={item.day} className="day-activities">
                                <div className="day">{item.day}</div>
                                <div className="activities">
                                    {item.activities.map((activity, index) => (
                                    <div key={index} className="activity">
                                        <div className="activity-details">
                                        <div className="class-name">{activity.className}</div>
                                        <div className="room">{activity.room}</div>
                                        </div>
                                        <div className="time">{activity.startTime} - {activity.endTime} WIB</div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
