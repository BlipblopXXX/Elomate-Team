import React, { useState, useEffect } from 'react';
import './Participant.css';

const batchs = [
    { batch: '1 November 2023'}
];

const people = [
    { name: 'Naufal Romiz', position: 'Administration Departement Head', uni: 'Universitas XXXX', major: 'Management1'},
    { name: 'Naufal Romiz', position: 'Administration Departement Head', uni: 'Universitas XYYY', major: 'Management2'},
    { name: 'Naufal Romiz', position: 'Administration Departement Head', uni: 'Universitas XXYY', major: 'Management3'},
    { name: 'Naufal Romiz', position: 'Administration Departement Head', uni: 'Universitas XXXY', major: 'Management4'},
    { name: 'Naufal Romiz', position: 'Administration Departement Head', uni: 'Universitas YXXX', major: 'Management5'},
    { name: 'Naufal Romiz', position: 'Administration Departement Head', uni: 'Universitas YYXX', major: 'Management6'},
    { name: 'Naufal Romiz', position: 'Administration Departement Head', uni: 'Universitas YYXX', major: 'Management7'}
];

const profile = [
    {img: "/src/files/profile/Profile1.png"},
    {img: "/src/files/profile/Profile2.png"},
    {img: "/src/files/profile/Profile3.png"},
]

function Participant() {
    const [currentPage, setCurrentPage] = useState('main');
    const [selectedBatch, setSelectedBatch] = useState(null);
    const batches = [1, 2, 3, 4, 5, 6, 7, 8];

    const handleMain = () => {
        setCurrentPage('main');
        setSelectedBatch(null);
    };

    const handleBatchClick = (batchName) => {
        console.log(`Clicked on ${batchName}`);
        setSelectedBatch(batchName);
        setCurrentPage('second');
    };

    const BatchCard = ({ batchName, onClick }) => (
        <div className="batch-card" onClick={onClick}>
            <img className="batch-icon" src="/src/files/icons/Batch.png"/>
            <h3>Batch {batchName}</h3>
        </div>
    );

    const renderDesc = () => {
        if (!selectedBatch) return null;
        return (
            <div className="desc">
                <div className="batch-title">Batch</div>
                <div className="batch">: {selectedBatch}</div>
                <div className="total-title">Jumlah Peserta</div>
                <div className="total">: {people.length} Peserta</div>
            </div>
        );
    };

    const renderPeople = () => {
        return people.map((person, index) => {
            const randomIndex = Math.floor(Math.random() * profile.length);
            return (
                <div key={index} className="person">
                    <div className="person-info">
                        <div className="img">
                            <img className="person-img" src={profile[randomIndex].img} />
                        </div>
                        <div className="name">
                            <div className="name-title">Nama:</div>
                            <div className="person-name">{person.name}</div>
                        </div>
                        <div className="position">
                            <div className="position-title">Posisi:</div>
                            <div className="person-position">{person.position}</div>
                        </div>
                        <div className="uni">
                            <div className="uni-title">Asal Universitas:</div>
                            <div className="person-uni">{person.uni}</div>
                        </div>
                        <div className="major">
                            <div className="major-title">Jurusan:</div>
                            <div className="person-major">{person.major}</div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'main':
                return (
                    <div className="schedule">
                        <div className="title">
                            <h3><b>Participant Data</b></h3>
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
                );
            case 'second':
                return (
                    <div className="participant">
                        <div className="title">
                            <h><b>Participant Data</b></h>
                        </div>
                        <img className="backbutton" onClick={handleMain} src="/src/files/icons/backbutton.png" alt="Back" />
                        <hr />
                        <div className="participant-desc">
                            {renderDesc()}
                        </div>
                        <div className="participant-container">
                            {renderPeople()}
                        </div>
                    </div>
                );
        }
    }

    return (
        <div className="App">
            {renderPage()}
        </div>
    );
}

export default Participant;
