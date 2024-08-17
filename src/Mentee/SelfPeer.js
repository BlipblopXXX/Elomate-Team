import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SelfPeer.css";

const baseURL = "http://localhost:3001"; 

const SelfPeer = () => {
  const [currentPage, setCurrentPage] = useState("main");
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [peerList, setPeerList] = useState([]);
  const [selfProgress, setSelfProgress] = useState(0);
  const [peerProgress, setPeerProgress] = useState(0);
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [phase, setPhase] = useState("option1"); // Default phase

  const cards = [
    { title: "SOLUTION Culture", selectedphase: "option1", no: "Batch " },
    {
      title: "8 Behaviour Competencies",
      selectedphase: "option1",
      no: "Batch ",
    },
    { title: "SOLUTION Culture", selectedphase: "option2", no: "Batch " },
    {
      title: "8 Behaviour Competencies",
      selectedphase: "option2",
      no: "Batch ",
    },
    { title: "SOLUTION Culture", selectedphase: "option3", no: "Batch " },
    {
      title: "8 Behaviour Competencies",
      selectedphase: "option3",
      no: "Batch ",
    },
    { title: "SOLUTION Culture", selectedphase: "option4", no: "Batch " },
    {
      title: "8 Behaviour Competencies",
      selectedphase: "option4",
      no: "Batch ",
    },
  ];

  // Daftar pertanyaan untuk topik "SOLUTION Culture" dan "8 Behaviour Competencies"
  const questionsData = {
    Solution: [
      { title2: "Solution", question: "Bersikap dengan sopan dan ramah" },
      { title2: "Solution", question: "Menunda-nunda pekerjaan" },
      { title2: "Solution", question: "Mematuhi semua peraturan yang berlaku" },
      { title2: "Solution", question: "Mengelola waktu secara efisien" },
      {
        title2: "Solution",
        question: "Memiliki semangat juang dan pantang menyerah",
      },
      {
        title2: "Solution",
        question: "Berani mengambil peran positif untuk menyelesaikan masalah",
      },
      {
        title2: "Solution",
        question:
          "Menolak keceriaan di lingkungan kerja (terlalu kaku & formal)",
      },
      {
        title2: "Solution",
        question:
          "Mampu memotivasi diri sendiri untuk berpikir & bertindak berbeda dari biasanya",
      },
      {
        title2: "Solution",
        question: "Menunjukkan kesesuaian kata dan perbuatan",
      },
      {
        title2: "Solution",
        question: "Merupakan pribadi yang penuh rasa ingin tahu",
      },
      {
        title2: "Solution",
        question:
          "Melihat tantangan sebagai peluang untuk melakukan perbaikan atau inovasi",
      },
      { title2: "Solution", question: "Pribadi yang mudah beradaptasi" },
      {
        title2: "Solution",
        question:
          "Menjaga hubungan internal atau eksternal yang terbentuk secara efektif",
      },
      {
        title2: "Solution",
        question:
          "Menerima masukkan, kritik, dan saran untuk mengembangkan kualitas diri",
      },
    ],
    Behaviour: [
      {
        title2: "8 Behaviour Competencies",
        question:
          "Memahami arah bisnis perusahaan di masa datang dan menerjemahkan pemahaman tersebut ke dalam strategi jangka pendek & jangka panjang",
      },
      {
        title2: "8 Behaviour Competencies",
        question: "Mampu merumuskan strategi secara jelas dan terukur",
      },
      {
        title2: "8 Behaviour Competencies",
        question:
          "Memiliki keterampilan membangun hubungan yang konstruktif dan efektif",
      },
      {
        title2: "8 Behaviour Competencies",
        question:
          "Mampu menyampaikan pandangan atau ide secara jelas dan percaya diri",
      },
      {
        title2: "8 Behaviour Competencies",
        question: "Terbuka pada feed back (umpan balik)",
      },
      {
        title2: "8 Behaviour Competencies",
        question:
          "Melakukan layanan pelanggan yang unggul (customer delight) di unit kerjanya",
      },
      {
        title2: "8 Behaviour Competencies",
        question:
          "Mampu mengidentifikasi akar suatu permasalahan dengan mengumpulkan dan menganalisa data yang tersedia",
      },
      {
        title2: "8 Behaviour Competencies",
        question:
          "Mampu berpikir kreatif dan mengusulkan alternatif solusi dari suatu permasalahan",
      },
      {
        title2: "8 Behaviour Competencies",
        question:
          "Fokus pada tujuan organisasi dengan menurunkannya ke dalam obyektif dan rencana kerja",
      },
      {
        title2: "8 Behaviour Competencies",
        question: "Menerapkan PDCA dalam pekerjaan",
      },
      {
        title2: "8 Behaviour Competencies",
        question:
          "Mampu memimpin tim dengan mengarahkan dan mendelegasikan tugas berdasarkan tuntutan pekerjaan yang sesuai dengan kemampuan dan kepribadiannya",
      },
      {
        title2: "8 Behaviour Competencies",
        question:
          "Berperilaku sesuai SOLUTION dalam kapasitasnya sebagai pemimpin",
      },
      {
        title2: "8 Behaviour Competencies",
        question:
          "Menyelesaikan tugas secara antusias dan optimis, dengan target kualitas yang tinggi",
      },
      {
        title2: "8 Behaviour Competencies",
        question:
          "Memiliki kemauan dan usaha untuk mempelajari pengetahuan, keterampilan dan budaya baru",
      },
      {
        title2: "8 Behaviour Competencies",
        question:
          "Membina kerja sama yang efektif dengan berbagai pihak dalam rangka penyelesaian tugas",
      },
      {
        title2: "8 Behaviour Competencies",
        question:
          "Mempertimbangkan perbedaan individu, menghormati perbedaan yang ada, dan memanfaatkan secara positif keragaman yang ada",
      },
    ],
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const phaseMap = {
          option1: 0,
          option2: 1,
          option3: 2,
          option4: 3,
        };

        const topicMap = {
          "SOLUTION Culture": 1,
          "8 Behaviour Competencies": 2,
        };

        const response = await axios.get(`${baseURL}/progress`, {
          params: {
            phase: phaseMap[phase],
            topic: selectedTask ? topicMap[selectedTask.title] : null,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setSelfProgress(response.data.selfProgress);
        setPeerProgress(response.data.peerProgress);
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, [phase, selectedTask]);
  
  useEffect(() => {
    const fetchPeers = async () => {
      try {
        const phaseMap = {
          option1: 0,
          option2: 1,
          option3: 2,
          option4: 3,
        };

        const topicMap = {
          "SOLUTION Culture": 1,
          "8 Behaviour Competencies": 2,
        };

        const response = await axios.get(`${baseURL}/assessment`, {
          params: {
            phase: phaseMap[phase],
            topic: selectedTask ? topicMap[selectedTask.title] : null,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPeerList(response.data.people);
        console.log(response.data.people);
      } catch (error) {
        console.error("Error fetching peers:", error);
      }
    };
    if (selectedTask) {
      fetchPeers();
    }
  }, [phase, selectedTask]);

  const handleMain = () => {
    setCurrentPage("main");
    setSelectedTask(null);
    setSelectedQuestion(null);
    setSelectedPeer(null);
    setAnswers({});
  };

  const handleSecond = (task, role) => {
    setSelectedTask(task);
    if (role === "Self") {
      setCurrentPage("second");
      setSelectedQuestion(
        task.title === "SOLUTION Culture"
          ? "Solution"
          : "8 Behaviour Competencies"
      );
    } else if (role === "Peer") {
      setCurrentPage("peerList");
    }
  };

  const handlePeerSelected = (person) => {
    if (person.STATUS === "Not Yet") {
      setSelectedPeer(person);
      setCurrentPage("second");
      setSelectedQuestion(
        selectedTask.title === "SOLUTION Culture"
          ? "Solution"
          : "8 Behaviour Competencies"
      );
    }
  };

  const handleAnswerClick = (questionIndex, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: value,
    }));
  };

  const handleSubmit = async () => {
    const questions =
      selectedTask.title === "SOLUTION Culture"
        ? questionsData.Solution
        : questionsData.Behaviour;

    for (let i = 0; i < questions.length; i++) {
      if (!answers.hasOwnProperty(i)) {
        alert("Ada pertanyaan yang belum diisi");
        return;
      }
    }

    const phaseMap = {
      option1: "10",
      option2: "20+70 OJT1",
      option3: "20+70 OJT2",
      option4: "20+70 OJT3",
    };

    const assessmentData = {
      phase: phaseMap[phase],
      assessmentTopic: selectedTask.title,
      peerID: selectedPeer ? selectedPeer.ACCOUNTID : undefined,
      answer: JSON.stringify(Object.values(answers)), // Convert answers to JSON string
    };

    console.log("Sending assessment data:", assessmentData);

    try {
      const response = await axios.post(
        `${baseURL}/assessment`,
        assessmentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(response.data.message);
      handleMain();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("An assessment with the same parameters already exists");
      } else {
        console.error("Error submitting assessment:", error);
        alert("Failed to send your feedback");
      }
    }
  };

  // Menghitung nilai rata-rata dari selfProgress dan peerProgress
  const averageProgress = (selfProgress + peerProgress) / 2;
  const renderCard = () => {
  const filteredPhase = cards.filter((card) => card.selectedphase === phase);
    return (
      <div className="selfpeer-container">
        {filteredPhase.map((selfpeer, index) => (
          <div key={index} className="selfpeer-wrapper">
            <div className="selfpeer-item">
              <div className="description">
                <div className="selfpeer-text">
                  <div className="selfpeer-title">
                    <b>{selfpeer.title}</b>
                  </div>
                  <div className="selfpeer-batch">{selfpeer.no}</div>
                </div>
                <div className="progress-circle" style={{ background: `conic-gradient(#006aff ${averageProgress * 3.6}deg, #e0e0e0 0deg)` }}>
                  <div className="progress-value">{averageProgress}%</div>
                </div>
              </div>

              <div className="TwinButton">
                <div className="self-card">
                  <div className="self-button">
                    <span className="left">Self</span>
                    <span className="right" onClick={() => handleSecond(selfpeer, "Self")}>Take the assessment</span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${selfProgress}%` }}>
                      <span className="progress-text">{selfProgress}%</span>
                    </div>
                  </div>
                </div>

                <div className="peer-card">
                  <div className="peer-button">
                    <span className="left">Peer</span>
                    <span className="right" onClick={() => handleSecond(selfpeer, "Peer")}>Take the assessment</span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${peerProgress}%` }}>
                      <span className="progress-text">{peerProgress}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
};

  const renderQuestion = () => {
    const questions =
      selectedTask.title === "SOLUTION Culture"
        ? questionsData.Solution
        : questionsData.Behaviour;

    const scale =
      selectedTask.title === "8 Behaviour Competencies"
        ? [1, 2, 3, 4, 5]
        : [1, 2, 3, 4];

    return questions.map((question, index) => (
      <div key={index}>
        {index + 1}. {question.question}
        <div className="buttonPosition">
          {scale.map((value) => (
            <button
              key={value}
              className={`btnGhost ${
                answers[index] === value ? "selected" : ""
              }`}
              onClick={() => handleAnswerClick(index, value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    ));
  };

  const renderPage = () => {
    switch (currentPage) {
      case "main":
        return (
          <div className="selfpeer">
            <div className="title1">
              <h>
                <b>Assessment</b>
              </h>
            </div>
            <div className="Dropdown">
              <div className="phasetitle">
                <a>Phase</a>
                <select
                  className="phaseselect"
                  value={phase}
                  onChange={(e) => setPhase(e.target.value)}
                >
                  <option value="option1">Phase 10</option>
                  <option value="option2">Phase 20+70 OJT1</option>
                  <option value="option3">Phase 20+70 OJT2</option>
                  <option value="option4">Phase 20+70 OJT3</option>
                </select>
              </div>
            </div>
            <hr />
            <div className="selfpeer-rc">{renderCard()}</div>
          </div>
        );
      case "second":
        return (
          <div className="selfpeer">
            <div className="back-header">
              <img
                className="backbutton"
                onClick={handleMain}
                src="/src/files/icons/backbutton.png"
                alt="Back Button"
              />
              <h>
                <b>{selectedQuestion}</b>
              </h>
            </div>
            <hr />
            <div className="question-container">
              {renderQuestion()}
              <div className="submitButton">
                <button className="submit" onClick={handleSubmit}>
                  {" "}
                  <b>Submit</b>{" "}
                </button>
              </div>
            </div>
            <div className="question-container-scale">
              <h>
                <b>Skala Penilaian</b>
              </h>
              <p className="numberOne">1 &nbsp;&nbsp; Sangat Tidak Sesuai </p>
              <p className="numberTwo">2 &nbsp;&nbsp; Tidak Sesuai </p>
              {selectedTask.title === "8 Behaviour Competencies" ? (
                <>
                  <p className="numberThree">3 &nbsp;&nbsp; Cukup Sesuai </p>
                  <p className="numberFour">4 &nbsp;&nbsp; Sesuai </p>
                  <p className="numberFive">5 &nbsp;&nbsp; Sangat Sesuai </p>
                </>
              ) : (
                <>
                  <p className="numberThree">3 &nbsp;&nbsp; Sesuai </p>
                  <p className="numberFour">4 &nbsp;&nbsp; Sangat Sesuai </p>
                </>
              )}
            </div>
          </div>
        );
      case "peerList":
        return (
          <div className="selfpeer">
            <div className="back-header">
              <img
                className="backbutton"
                src="/src/files/icons/backbutton.png"
                onClick={handleMain}
                alt="Back Button"
              />
              <h>
                <b>Peer Assessment - Daftar Nama</b>
              </h>
            </div>
            <hr />
            <div className="table-PL">
              <div className="table-header">
                <div className="peer-no">No</div>
                <div className="peer-name">Nama</div>
                <div className="peer-status">Status</div>
              </div>
              <div className="peer-list">
                {peerList.map((person, index) => (
                  <div
                  key={index}
                  className={`peer-item ${
                    person.STATUS === "Not Yet" ? "clickable" : ""
                  }`}
                  onClick={() => handlePeerSelected(person)}
                    >
                  <div className="peer-no">{index + 1}</div>
                  <div className="peer-name">{person.NAMA}</div>
                  <div className="peer-status">
                    {person.STATUS}
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderPage()}</div>;
};

export default SelfPeer;
