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
    { batch: '1', count: '7' }
];

const data = [
    {
        id: 1,
        nama: 'Naufal Romiz',
        generalDevelopment: { status: 'Done', nilai: 90 },
        orientasiDivisi: { status: 'Done', nilai: 90 },
        bgms: { status: 'Done', nilai: 85 },
        neop: { status: 'Done', nilai: 88 },
    },
    {
        id: 2,
        nama: 'Aiana Deborah',
        generalDevelopment: { status: 'Not yet', nilai: '-' },
        orientasiDivisi: { status: 'Done', nilai: 86 },
        bgms: { status: 'Not yet', nilai: '-' },
        neop: { status: 'Not yet', nilai: '-' },
    },
    {
        id: 3,
        nama: 'Rizki Alden',
        generalDevelopment: { status: 'Done', nilai: 92 },
        orientasiDivisi: { status: 'Done', nilai: 88 },
        bgms: { status: 'Done', nilai: 90 },
        neop: { status: 'Not yet', nilai: '-' },
    },
    {
        id: 4,
        nama: 'Sari Lestari',
        generalDevelopment: { status: 'Not yet', nilai: '-' },
        orientasiDivisi: { status: 'Not yet', nilai: '-' },
        bgms: { status: 'Done', nilai: 80 },
        neop: { status: 'Done', nilai: 82 },
    },
    {
        id: 5,
        nama: 'Doni Setiawan',
        generalDevelopment: { status: 'Done', nilai: 87 },
        orientasiDivisi: { status: 'Done', nilai: 85 },
        bgms: { status: 'Done', nilai: 84 },
        neop: { status: 'Done', nilai: 89 },
    },
    {
        id: 6,
        nama: 'Lina Maulida',
        generalDevelopment: { status: 'Not yet', nilai: '-' },
        orientasiDivisi: { status: 'Done', nilai: 91 },
        bgms: { status: 'Not yet', nilai: '-' },
        neop: { status: 'Done', nilai: 90 },
    },
];

const kirkpatrick = [
    { role: 'Self', assessment: 'SOLUTION Culture', serve: 4, organize: 4, leadership: 4, uniqueness: 4, totality: 4, innovative: 4, openmind: 4, networking: 5 },
    { role: 'Peer', assessment: 'SOLUTION Culture', serve: 4, organize: 4, leadership: 3, uniqueness: 4, totality: 4, innovative: 4, openmind: 5, networking: 5 },
    { role: 'Mentor', assessment: 'SOLUTION Culture', serve: 4, organize: 5, leadership: 5, uniqueness: 4, totality: 5, innovative: 5, openmind: 5, networking: 5 },
    { role: 'Self', assessment: '8 Behaviour Competencies', vbs: 4, aj: 4, cf: 4, dc: 4, tw: 4, pda: 4, is: 4, lm: 4 },
    { role: 'Peer', assessment: '8 Behaviour Competencies', vbs: 3, aj: 4, cf: 4, dc: 4, tw: 4, pda: 3, is: 4, lm: 4 },
    { role: 'Mentor', assessment: '8 Behaviour Competencies', vbs: 4, aj: 5, cf: 5, dc: 4, tw: 5, pda: 5, is: 5, lm: 5 }
];

function FinalReport() {
    const [currentPage, setCurrentPage] = useState('main');
    const batches = [1, 2, 3, 4, 5, 6, 7, 8];

    const handleMain = () => {
        setCurrentPage('main');
    };

    const handleBatchClick = () => {
        setCurrentPage('second');
    };

    const BatchCard = ({ batchName, onClick }) => (
        <div className="batch-card" onClick={onClick}>
            <img className="batch-icon" src="/src/files/icons/Batch.png"/>
            <h3>Batch {batchName}</h3>
        </div>
    );

    const renderBatchTable = () => (
        <table>
            <thead>
                <tr>
                    <th>Batch</th>
                    <th>Jumlah Peserta</th>
                </tr>
            </thead>
            <tbody>
                {batchs.map((batch, index) => (
                    <tr key={index}>
                        <td>{batch.batch}</td>
                        <td>{batch.count}</td>
                    </tr>
                ))}</tbody>
        </table>
    );

    const renderParticipantsTable = () => (
        <table>
            <thead>
                <tr>
                    <th rowSpan={2}>No</th>
                    <th rowSpan={2}>Nama</th>
                    <th colSpan={2}>General Development</th>
                    <th colSpan={2}>Orientasi Divisi</th>
                    <th colSpan={2}>BGMS</th>
                    <th colSpan={2}>NEOP</th>
                </tr>
                <tr>
                    <th>Status</th>
                    <th>Nilai</th>
                    <th>Status</th>
                    <th>Nilai</th>
                    <th>Status</th>
                    <th>Nilai</th>
                    <th>Status</th>
                    <th>Nilai</th>
                </tr>
            </thead>
            <tbody>
                {data.map((participant, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{participant.nama}</td>
                        <td className={participant.generalDevelopment.status === 'Done' ? 'status-done' : 'status-not-yet'}>
                            {participant.generalDevelopment.status}
                        </td>
                        <td>{participant.generalDevelopment.nilai}</td>
                        <td className={participant.orientasiDivisi.status === 'Done' ? 'status-done' : 'status-not-yet'}>
                            {participant.orientasiDivisi.status}
                        </td>
                        <td>{participant.orientasiDivisi.nilai}</td>
                        <td className={participant.bgms.status === 'Done' ? 'status-done' : 'status-not-yet'}>
                            {participant.bgms.status}
                        </td>
                        <td>{participant.bgms.nilai}</td>
                        <td className={participant.neop.status === 'Done' ? 'status-done' : 'status-not-yet'}>
                            {participant.neop.status}
                        </td>
                        <td>{participant.neop.nilai}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
    
    const getSolutionCultureData = () => {
        const filteredData = kirkpatrick.filter(entry => entry.assessment === 'SOLUTION Culture');
        return {
            labels: ['Serve', 'Organize', 'Leadership', 'Uniqueness', 'Totality', 'Innovative', 'Openmind', 'Networking'],
            datasets: filteredData.map((entry) => {
                let backgroundColor, borderColor;
                switch (entry.role) {
                    case 'Self':
                        backgroundColor = 'rgba(255, 99, 132, 0.2)';
                        borderColor = 'rgba(255, 99, 132, 1)';
                        break;
                    case 'Peer':
                        backgroundColor = 'rgba(54, 162, 235, 0.2)';
                        borderColor = 'rgba(54, 162, 235, 1)';
                        break;
                    case 'Mentor':
                        backgroundColor = 'rgba(75, 192, 192, 0.2)';
                        borderColor = 'rgba(75, 192, 192, 1)';
                        break;
                    default:
                        backgroundColor = `rgba(${Math.random() * 255}, 99, 132, 0.2)`; 
                        borderColor = `rgba(${Math.random() * 255}, 99, 132, 1)`;
                }
                return {
                    label: entry.role,
                    data: [entry.serve, entry.organize, entry.leadership, entry.uniqueness, entry.totality, entry.innovative, entry.openmind, entry.networking],
                    backgroundColor,
                    borderColor,
                    borderWidth: 1,
                };
            }),
        };
    };
    
    const getBehaviourCompetenciesData = () => {
        const filteredData = kirkpatrick.filter(entry => entry.assessment === '8 Behaviour Competencies');
        return {
            labels: ['VBS', 'AJ', 'CF', 'DC', 'TW', 'PDA', 'IS', 'LM'],
            datasets: filteredData.map((entry) => {
                let backgroundColor, borderColor;
                switch (entry.role) {
                    case 'Self':
                        backgroundColor = 'rgba(255, 99, 132, 0.2)';
                        borderColor = 'rgba(255, 99, 132, 1)';
                        break;
                    case 'Peer':
                        backgroundColor = 'rgba(54, 162, 235, 0.2)';
                        borderColor = 'rgba(54, 162, 235, 1)';
                        break;
                    case 'Mentor':
                        backgroundColor = 'rgba(75, 192, 192, 0.2)';
                        borderColor = 'rgba(75, 192, 192, 1)';
                        break;
                    default:
                        backgroundColor = `rgba(${Math.random() * 255}, 206, 86, 0.2)`;
                        borderColor = `rgba(${Math.random() * 255}, 206, 86, 1)`;
                }
                return {
                    label: entry.role,
                    data: [entry.vbs, entry.aj, entry.cf, entry.dc, entry.tw, entry.pda, entry.is, entry.lm],
                    backgroundColor,
                    borderColor,
                    borderWidth: 1,
                };
            }),
        };
    };

    const renderKirkpatrickCharts = () => (
        <div className="kirkpatrick-charts">
            <div className="chart-container">
                <h4>SOLUTION Culture</h4>
                <Radar data={getSolutionCultureData()} />
            </div>
            <div className="chart-container">
                <h4>8 Behaviour Competencies</h4>
                <Radar data={getBehaviourCompetenciesData()} />
            </div>
        </div>
    );

    const renderPage = () => {
        switch (currentPage) {
            case 'main':
                return(
                    <div className="finalreport">
                        <div className="title">
                            <h3><b>Final Report</b></h3>
                        </div>
                        <div className="batch-list">
                            {batches.map((batch, index) => (
                            <BatchCard
                                key={index}
                                batchName={batch}
                                onClick={() => handleBatchClick(batch)}
                            />
                            ))}</div>
                    </div>
                );
            case 'second':
                return (
                    <div className="finalreport">
                        <h3><b>Final Report</b></h3>
                        <img className="backbutton" onClick={handleMain} src="/src/files/icons/backbutton.png" alt="Back" />
                        <h4>Batch Info</h4>
                        {renderBatchTable()}
                        <h4>Participants</h4>
                        {renderParticipantsTable()}
                        <h4>Kirkpatrick Assessments</h4>
                        {renderKirkpatrickCharts()}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="App">
            {renderPage()}
        </div>
    );
}

export default FinalReport;
