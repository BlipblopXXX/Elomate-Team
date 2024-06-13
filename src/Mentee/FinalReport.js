import React, { useState } from 'react';
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

const batchs = [
    { batch: '1 November 2023', name: 'Naufal Ramiz' }
];

const kirkpatrick = [
    { role: 'Self', assessment: 'SOLUTION Culture', serve: 4, organize: 4, leadership: 4, uniqueness: 4, totality: 4, innovative: 4, openmind: 4, networking: 5 },
    { role: 'Peer', assessment: 'SOLUTION Culture', serve: 4, organize: 4, leadership: 3, uniqueness: 4, totality: 4, innovative: 4, openmind: 5, networking: 5 },
    { role: 'Self', assessment: '8 Behaviour Competencies', vbs: 4, aj: 4, cf: 4, dc: 4, tw: 4, pda: 4, is: 4, lm: 4 },
    { role: 'Peer', assessment: '8 Behaviour Competencies', vbs: 3, aj: 4, cf: 4, dc: 4, tw: 4, pda: 3, is: 4, lm: 4 }
];

const courses = [
    { selectedValue: 'option1', course: 'General Development', score1: 85, score2: 85, status: 'Done' },
    { selectedValue: 'option1', course: 'Orientasi Divisi', score1: 88, score2: 85, status: 'Done' },
    { selectedValue: 'option1', course: 'BGMS', score1: 85, score2: 85, status: 'Done' },
    { selectedValue: 'option1', course: 'NEOP', score1: 85, score2: 85, status: 'Done' },
    { selectedValue: 'option2', course: 'Case Study', score1: 85, score2: 85, status: 'Done' },
    { selectedValue: 'option2', course: 'Hands on Activity', score1: 85, score2: 85, status: 'Done' },
    { selectedValue: 'option3', course: 'Orientasi cabang/site', score1: 85, score2: 85, status: 'Done' },
    { selectedValue: 'option3', course: 'Mempelajari Business Process Divisi/Cabang/Site', score1: 85, score2: 85, status: 'Done' },
    { selectedValue: 'option3', course: 'Melakukan proses kerja di Divisi/Cabang/Site sesuai dengan KPI', score1: 85, score2: 85, status: 'Done' },
    { selectedValue: 'option4', course: 'Improvement bisnis proses', score1: 85, score2: 85, status: 'Done' },
    { selectedValue: 'option4', course: 'Customer Solution Management (CSM)', score1: 85, score2: 85, status: 'Done' }
];

function FinalReport() {
    const [selectedValue, setselectedValue] = useState('option1');

    const handleChange = (event) => {
        setselectedValue(event.target.value);
    };

    const renderDesc = () => {
        return batchs.map((batch, index) => (
            <div key={index}>
                <div className="desc">
                    <div className="batch-title">Batch</div>
                    <div className="batch">: {batch.batch}</div>
                    <div className="batch-name">Nama Peserta</div>
                    <div className="name">: {batch.name}</div>
                </div>
            </div>
        ))
    };

    const renderCourses = () => {
        const totalScores = courses.reduce((accumulator, course) => {
            return course.score1 !== null ? accumulator + course.score1 : accumulator;
        }, 0);

        const validScoresCount = courses.reduce((count, course) => {
            return course.score1 !== null ? count + 1 : count;
        }, 0);

        const averageScore = validScoresCount > 0 ? totalScores / validScoresCount : 0;

        const totalScores2 = courses.reduce((accumulator, course) => {
            return course.score2 !== null ? accumulator + course.score2 : accumulator;
        }, 0);

        const validScoresCount2 = courses.reduce((count, course) => {
            return course.score2 !== null ? count + 1 : count;
        }, 0);

        const averageScore2 = validScoresCount2 > 0 ? totalScores2 / validScoresCount2 : 0;

        const coursex = courses.filter(course => course.selectedValue === selectedValue);

        return (
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Course</th>
                        <th>Pre-test</th>
                        <th>Post-test</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {coursex.map((course, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{course.course}</td>
                            <td>{course.score1 || "-"}</td>
                            <td>{course.score2 || "-"}</td>
                            <td>{course.status}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">Rata-rata</td>
                        <td>{averageScore.toFixed(2)}</td>
                        <td>{averageScore2.toFixed(2)}</td>
                        <td colSpan="2"></td>
                    </tr>
                </tfoot>
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
                    <span>Phase</span>
                    <select className="phaseselect" id="phaseDropdown" value={selectedValue} onChange={handleChange}>
                        <option value="option1">Phase 10</option>
                        <option value="option2">Phase 20 + 70 OJT 1</option>
                        <option value="option3">Phase 20 + 70 OJT 2</option>
                        <option value="option4">Phase 20 + 70 OJT 3</option>
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
