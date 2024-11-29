import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';
import './FinalReport.css';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const kirkpatrick = [
    { role: 'Self', assessment: 'SOLUTION Culture', serve: 4, organize: 4, leadership: 4, uniqueness: 4, totality: 4, innovative: 4, openmind: 4, networking: 5 },
    { role: 'Peer', assessment: 'SOLUTION Culture', serve: 4, organize: 4, leadership: 3, uniqueness: 4, totality: 4, innovative: 4, openmind: 5, networking: 5 },
    { role: 'Self', assessment: '8 Behaviour Competencies', vbs: 4, aj: 4, cf: 4, dc: 4, tw: 4, pda: 4, is: 4, lm: 4 },
    { role: 'Peer', assessment: '8 Behaviour Competencies', vbs: 3, aj: 4, cf: 4, dc: 4, tw: 4, pda: 3, is: 4, lm: 4 }
];

function FinalReport() {
    const [selectedPhase, setSelectedPhase] = useState('Phase 10');
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [programs, setPrograms] = useState([]);
    const [courses, setCourses] = useState([]);
    const [scores, setScores] = useState([]);
    const [programData, setProgramData] = useState([]);

    const handlePhaseChange = (event) => {
      setSelectedPhase(event.target.value);
    };

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
    
      fetchPrograms();
    }, []);
    
    // Fetch user profile on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No token found");
                }

                const response = await axios.get('http://localhost:3001/profile', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProfile(response.data.user);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem("token");
            const headers = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            };
      
            // Fetch profile
            const profileResponse = await axios.get('http://localhost:3001/profile', { headers });
            const profileData = profileResponse.data.user;
            setProfile(profileData);
      
            // Fetch programs
            const programsResponse = await axios.get('http://localhost:3001/program', { headers });
            setPrograms(programsResponse.data.programs);
      
            // Fetch courses
            const coursesResponse = await axios.get('http://localhost:3001/course/all', { headers });
            setCourses(coursesResponse.data.courses);
      
            // Fetch scores
            const scoresResponse = await axios.get('http://localhost:3001/score', { headers });
            setScores(scoresResponse.data.scores);
          } catch (err) {
            setError(err.response?.data?.message || err.message);
          } finally {
            setLoading(false);
          }
        };
      
        fetchData();
      }, []);

      useEffect(() => {
        if (!profile || !programs.length || !courses.length || !scores.length) {
          return;
        }
      
        let filteredPrograms = programs.filter(
          (program) => program.PHASE === selectedPhase
        );
      
        const data = filteredPrograms.map(program => {
          const programCourses = courses.filter(course => course.PROGRAMID === program.PROGRAMID);
          const totalCourses = programCourses.length;
      
          let completedCourses = 0;
          let totalPreTestScore = 0;
          let totalPostTestScore = 0;
          let preTestCount = 0;
          let postTestCount = 0;
      
          programCourses.forEach(course => {
            const preTestScoreEntry = scores.find(score => 
              score.COURSEID === course.COURSEID && 
              score.TYPE === 'Pre-Test' && 
              score.ACCOUNTID === profile.ACCOUNTID &&
              score.STATUS === 'Completed'
            );
            const postTestScoreEntry = scores.find(score => 
              score.COURSEID === course.COURSEID && 
              score.TYPE === 'Post-Test' && 
              score.ACCOUNTID === profile.ACCOUNTID &&
              score.STATUS === 'Completed'
            );
      
            if (preTestScoreEntry) {
              totalPreTestScore += preTestScoreEntry.SCORE;
              preTestCount++;
            }
      
            if (postTestScoreEntry) {
              totalPostTestScore += postTestScoreEntry.SCORE;
              postTestCount++;
            }
      
            if (preTestScoreEntry && postTestScoreEntry) {
              completedCourses++;
            }
          });
      
          const programCompleted = completedCourses === totalCourses;
          const averagePreTestScore = preTestCount > 0 ? totalPreTestScore / preTestCount : 0;
          const averagePostTestScore = postTestCount > 0 ? totalPostTestScore / postTestCount : 0;
      
          return {
            program,
            status: programCompleted ? 'Completed' : 'Incomplete',
            averagePreTestScore,
            averagePostTestScore,
          };
        });
      
        setProgramData(data);
      }, [profile, programs, courses, scores, selectedPhase]);
      

    const renderDesc = () => {
        if (loading) {
            return <div>Loading profile...</div>;
        }

        if (error) {
            return <div className="error">Error: {error}</div>;
        }

        if (!profile) {
            return <div>No profile data available.</div>;
        }

        return (
            <div className="desc">
                <div className="batch-title">Batch</div>
                <div className="batch">: {profile.BATCH}</div>
                <div className="batch-name">Nama Peserta</div>
                <div className="name">: {profile.NAMA}</div>
            </div>
        );
    };

    const renderCourses = () => {
        if (loading) {
          return <div>Loading...</div>;
        }
      
        if (error) {
          return <div className="error">Error: {error}</div>;
        }
      
        if (!programData.length) {
          return <div>No data available.</div>;
        }
      
        return (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Program</th>
                <th className="gold-header">Pre-test Average</th>
                <th className="gold-header">Post-test Average</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {programData.map((data, index) => (
                <tr key={data.program.PROGRAMID}>
                  <td>{index + 1}</td>
                  <td>{data.program.NAMA}</td>
                  <td>{data.averagePreTestScore.toFixed(2)}</td>
                  <td>{data.averagePostTestScore.toFixed(2)}</td>
                  <td className={data.status === 'Completed' ? 'status-completed' : ''}>
                    {data.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      };

    const renderKirkpatrickChart = (assessmentType) => {
        const filteredData = kirkpatrick.filter(item => item.assessment === assessmentType);
    
        let competencyLabels = [];
        let datasets = [];
    
        if (assessmentType === 'SOLUTION Culture') {
            competencyLabels = ["Serve", "Organize", "Leadership", "Uniqueness", "Totality", "Innovative", "OpenMind", "Networking"];
        } else if (assessmentType === '8 Behaviour Competencies') {
            competencyLabels = ["VBS", "AJ", "CF", "DC", "TW", "PDA", "IS", "LM"];
        }
    
        const selfData = filteredData.find(item => item.role === 'Self');
        const peerData = filteredData.find(item => item.role === 'Peer');
    
        if (selfData && peerData) {
            const selfDataset = {
                label: 'Self',
                data: competencyLabels.map(label => selfData[label.toLowerCase()]),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            };
    
            const peerDataset = {
                label: 'Peer',
                data: competencyLabels.map(label => peerData[label.toLowerCase()]),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            };
    
            datasets = [selfDataset, peerDataset];
        }
    
        const data = {
            labels: competencyLabels,
            datasets: datasets,
        };
    
        const options = {
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 5
                }
            }
        };
    
        return (
            <div className="kirkpatrick-chart">
                <Radar data={data} options={options} />
            </div>
        );
    };

    return (
        <div className="finalreport">
            <div className="title">
                <div><b>Final Report</b></div>
            </div>
            <hr />
            <div className="final-desc">
                {renderDesc()}
            </div>
            <div className="selecttile">
                <div className="phase">
                  <label htmlFor="phaseDropdown">Phase</label>
                  <select
                    className="phaseselect"
                    id="phaseDropdown"
                    value={selectedPhase}
                    onChange={handlePhaseChange}
                  >
                    <option value="Phase 10">Phase 10</option>
                    <option value="Phase 20 + 70">Phase 20 + 70</option>
                  </select>
                </div>
            </div>
            <div className="final-container">
                {renderCourses()}
            </div>
            <div className="graphic-title">
                <div><b>Assessment</b></div>
            </div>
            <hr />
            <div className="graphic-divider">
                <div className="graphic-solution">
                    <div className="solution-title">
                        <b>SOLUTION Culture</b>
                    </div>
                    <div>
                        {renderKirkpatrickChart('SOLUTION Culture')}
                    </div>
                </div>
                <div className="graphic-8bc">
                    <div className="bc-title">
                        <b>8 Behaviour Competencies</b>
                    </div>
                    <div>
                        {renderKirkpatrickChart('8 Behaviour Competencies')}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FinalReport;
