import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Participant.css";

const batchs = [{ batch: "1 November 2023" }];

const people = [
  {
    name: "Naufal Romiz",
    position: "Administration Departement Head",
    uni: "Universitas XXXX",
    major: "Management1",
  },
  {
    name: "Naufal Romiz",
    position: "Administration Departement Head",
    uni: "Universitas XYYY",
    major: "Management2",
  },
  {
    name: "Naufal Romiz",
    position: "Administration Departement Head",
    uni: "Universitas XXYY",
    major: "Management3",
  },
  {
    name: "Naufal Romiz",
    position: "Administration Departement Head",
    uni: "Universitas XXXY",
    major: "Management4",
  },
  {
    name: "Naufal Romiz",
    position: "Administration Departement Head",
    uni: "Universitas YXXX",
    major: "Management5",
  },
  {
    name: "Naufal Romiz",
    position: "Administration Departement Head",
    uni: "Universitas YYXX",
    major: "Management6",
  },
  {
    name: "Naufal Romiz",
    position: "Administration Departement Head",
    uni: "Universitas YYXX",
    major: "Management7",
  },
];

const profile = [
  { img: "/src/files/profile/Profile1.png" },
  { img: "/src/files/profile/Profile2.png" },
  { img: "/src/files/profile/Profile3.png" },
];

function Participant() {
  const [batch, setBatch] = useState("");
  const [people, setPeople] = useState([]);
  const [profiles, setProfiles] = useState([
    { img: "/src/files/profile/Profile1.png" },
    { img: "/src/files/profile/Profile2.png" },
    { img: "/src/files/profile/Profile3.png" },
  ]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/participants", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setPeople(response.data.people);
        console.log(response.data.people);
        setBatch(response.data.batch);
      } catch (error) {
        console.error("Error fetching participants data:", error);
      }
    };

    fetchParticipants();
  }, []);

  const renderDesc = () => {
    return batchs.map((batch, index) => (
      <div key={index}>
        <div className="desc">
          <div className="batch-title">Batch</div>
          <div className="batch">: {batch.batch}</div>
          <div className="total-title">Jumlah Peserta</div>
          <div className="total">: {people.length} Peserta</div>
        </div>
      </div>
    ));
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
              <div className="person-name">{person.NAMA}</div>
            </div>
            <div className="position">
              <div className="position-title">Posisi:</div>
              <div className="person-position">{person.POSISI}</div>
            </div>
            <div className="uni">
              <div className="uni-title">Asal Universitas:</div>
              <div className="person-uni">{person.UNIVERSITY}</div>
            </div>
            <div className="major">
              <div className="major-title">Jurusan:</div>
              <div className="person-major">{person.MAJOR}</div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="participant">
      <div className="title">
        <h>
          <b>Participant Data</b>
        </h>
      </div>
      <hr />
      <div className="participant-desc">{renderDesc()}</div>
      <div className="participant-container">{renderPeople()}</div>
    </div>
  );
}

export default Participant;
