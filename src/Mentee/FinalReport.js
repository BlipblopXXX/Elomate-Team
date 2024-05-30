import React, { useState } from 'react';
import './FinalReport.css';

const batchs = [
    {  batch: '1 November 2023', name: 'Naufal Ramiz' }
];

const courses = [
    { selectedValue: 'option1', course: 'General Development', score1: 85,  score2: 85, status: 'Done' },
    { selectedValue: 'option1', course: 'Orientasi Divisi', score1: 88, score2: 85, status: 'Done' },
    { selectedValue: 'option1', course: 'BGMS', score1: 85, score2: 85, status: 'Done' },
    { selectedValue: 'option1', course: 'NEOP', score1: 85, score2: 85, status: 'Done' },
    { selectedValue: 'option2', course: 'Case Study', score1: 85, score2: 85, status: 'Done' },
    { selectedValue: 'option2', course: 'Hands on Activity', score1: 85, score2: 85, status: 'Done' },
    { selectedValue: 'option3', course: 'Orientasi cabang/site', score1: 85, score2: 85, status: 'Done' },
    { selectedValue: 'option3', course: 'Mempelajari Business Process Divisi/Cabang/Site', score1: 85, score2: 85, status: 'Done' },
    { selectedValue: 'option3', course: 'Melakukan proses  kerja di Divisi/Cabang/Site sesuai dengan KPI', score1: 85, score2: 85, status: 'Done' },
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
        
        const coursex = courses.filter (course => course.selectedValue === selectedValue);

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
                        <td>{averageScore.toFixed(2)}</td>
                        <td colSpan="2"></td>
                    </tr>
                </tfoot>
            </table>
        );
    };

    return (
        <div className="finalreport">
            <div className="title">
                <h><b>Final Report</b></h>
            </div>
            <hr />
            <div className="final-desc">
                {renderDesc()}
            </div>
            <div className="selecttile">
                            <div className="phase">
                                <a>Phase</a>
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
                <h><b>Kirkpatrick Report</b></h>
            </div>
            <hr />
        </div>
    );
}

export default FinalReport;
