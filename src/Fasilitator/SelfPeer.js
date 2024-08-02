import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SelfPeer.css";

const baseURL = "http://localhost:3001"; // Pastikan back-end Anda berjalan pada port ini

  const assessmentList = [
    { nama: 'Naufal Romiz', statusSolution: 'Isi Penilaian', statusBehaviour: 'Isi Penilaian' },
    { nama: 'Ali Alban', statusSolution: 'Done', statusBehaviour: 'Done' },
    { nama: 'Emmanuela Evelyn', statusSolution: 'Done', statusBehaviour: 'Done' }
  ];
 
  // Daftar pertanyaan untuk topik "SOLUTION Culture" dan "8 Behaviour Competencies"
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

  const questionsData = {
    Solution: [
      { title2: "SOLUTION Culture", 
        question: "Memberikan pelayanan yang terbaik." 
      },
      { title2: "SOLUTION Culture", 
        question: "Mammpu menolong sesama rekan sekerja di situasi tidak terduga."
      },
      { title2: "SOLUTION Culture", 
        question: "Bekerja secara sistematis, memiliki perencanaan yang  jelas, menggunakan prinsip prioritas."
      },
      { title2: "SOLUTION Culture", 
        question: "Menunjukkan perilaku yang sistematis sesuai dengan PDCA (Plan, Do, Check, Action)." 
      },
      {
        title2: "SOLUTION Culture",
        question: "Menjadi yang terdepan.",
      },
      {
        title2: "SOLUTION Culture",
        question: "Mengambil inisiatif ketika dibutuhkan.",
      },
      {
        title2: "SOLUTION Culture",
        question:
          "Mampu menyajikan solusi yang sesuai dengan kepentingan.",
      },
      {
        title2: "SOLUTION Culture",
        question:
          "Mampu menyelesaikan permasalahan dengan cara yang cepat dna tepat.",
      },
      {
        title2: "SOLUTION Culture",
        question: "Melakukan tugas dengan tuntas, lengkap, dan menyeluruh.",
      },
      {
        title2: "SOLUTION Culture",
        question: "Antusias dan komitmen pennuh dalam rangka mengerjakan tugas dan tanggung jawabnya.",
      },
      {
        title2: "SOLUTION Culture",
        question:
          "Mengusulkan ide baru, mendorong munculnya ide",
      },
      { title2: "SOLUTION Culture", question: 
        "Menjadi pribadi yang kreatif untuk terus menmbuat perubahan." 
      },
      {
        title2: "SOLUTION Culture",
        question:
          "Memiliki kemauan untuk terus belajar.",
      },
      {
        title2: "SOLUTION Culture",
        question:
          "Mampu menerima gagasan, kritik, dan opini dari berbagai pihak.",
      },
      {
        title2: "SOLUTION Culture",
        question:
          "Mampu membangun hubungan sinergis.",
      },
      {
        title2: "SOLUTION Culture",
        question:
          "Mampu menjaga hubungan baik dan berbagi informasi dengan rekan kerja, atasan, dan customer.",
      }
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

  function SelfPeer() {
    const [currentPage, setCurrentPage] = useState("main");
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [assessmentListState, setAssessmentListState] = useState(assessmentList);
    const [selectedPhase, setSelectedPhase] = useState("option1");
  
    const handlePhaseChange = (event) => {
      setSelectedPhase(event.target.value);
    };
  
    const handleButtonClick = (taskType) => {
      const questions = taskType === "SOLUTION Culture" ? questionsData.Solution : questionsData.Behaviour;
      setSelectedQuestions(questions);
      setSelectedTask(taskType);
      setCurrentPage("second");
    };
  
    const handleMain = () => {
      setCurrentPage("main");
    };
  
    const renderQuestions = () => {
      const scale = selectedTask === "8 Behaviour Competencies" ? [1, 2, 3, 4, 5] : [1, 2, 3, 4];
      return selectedQuestions.map((question, index) => (
        <div key={index}>
          {index + 1}. {question.question}
          <div className="buttonPosition">
            {scale.map((value) => (
              <button
                key={value}
                className={`btnGhost ${answers[index] === value ? "selected" : ""}`}
                onClick={() => handleAnswerClick(index, value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ));
    };
  
    const handleAnswerClick = (questionIndex, value) => {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionIndex]: value
      }));
    };
  
    const handleSubmit = () => {
      for (let i = 0; i < selectedQuestions.length; i++) {
        if (!answers.hasOwnProperty(i)) {
          alert("Ada pertanyaan yang belum diisi");
          return;
        }
      }
  
      // Update the assessmentList to mark the task as "Done"
      setAssessmentListState(prevList =>
        prevList.map(person => ({
          ...person,
          [selectedTask === "SOLUTION Culture" ? "statusSolution" : "statusBehaviour"]: "Done"
        }))
      );
  
      handleMain();
      alert("Penilaian anda disimpan!");
    };
  
    const renderPage = () => {
      const filteredCards = cards.filter(card => card.selectedphase === selectedPhase);
      const solutionTitle = filteredCards.find(card => card.title === "SOLUTION Culture")?.title || "";
      const behaviourTitle = filteredCards.find(card => card.title === "8 Behaviour Competencies")?.title || "";
  
      switch (currentPage) {
        case "main":
          return (
            <div className="selfpeer1">
              <div className="judul1">
                <h1><b>Assessment</b></h1>
              </div>
              <div className="dropdown">
                <div className="phasetitle">
                  <label>Phase</label>
                  <select className="phaseselect" onChange={handlePhaseChange} value={selectedPhase}>
                    <option value="option1">Phase 10</option>
                    <option value="option2">Phase 20+70 OJT1</option>
                    <option value="option3">Phase 20+70 OJT2</option>
                    <option value="option4">Phase 20+70 OJT3</option>
                  </select>
                </div>
              </div>
              <hr />
              <div className="table-assessment">
                <div className="table-header">
                  <div>No</div>
                  <div>Name</div>
                  <div>{solutionTitle}</div>
                  <div>{behaviourTitle}</div>
                </div>
                <div className="list-assessment">
                  {assessmentListState.map((person, index) => (
                    <div key={index} className="assessment-row">
                      <div className="table-no">{index + 1}</div>
                      <div className="table-name">{person.nama}</div>
                      <div className="table-card">
                        <button
                          className={person.statusSolution === 'Done' ? 'done' : ''}
                          onClick={() => person.statusSolution !== 'Done' && handleButtonClick("SOLUTION Culture")}
                        >
                          {person.statusSolution}
                        </button>
                      </div>
                      <div className="table-card">
                        <button
                          className={person.statusBehaviour === 'Done' ? 'done' : ''}
                          onClick={() => person.statusBehaviour !== 'Done' && handleButtonClick("8 Behaviour Competencies")}
                        >
                          {person.statusBehaviour}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        case "second":
          return (
            <div className="selfpeer2">
              <div className="judul2">
                <img
                  className="backbutton"
                  onClick={handleMain}
                  src="/src/files/icons/backbutton.png"
                  alt="Back Button"
                />
                <h1>
                  <b>{selectedTask}</b>
                </h1>
              </div>
              <hr />
              <div className="question-wrapper">
                <div className="question-container">
                  {renderQuestions()}
                  <div className="submitButton">
                    <button className="submit" onClick={handleSubmit}>
                      <b>Submit</b>
                    </button>
                  </div>
                </div>

                <div className="question-container-scale">
                  <h>
                    <b>Skala Penilaian</b>
                  </h>
                  <p className="numberOne">1 &nbsp;&nbsp; Sangat Tidak Sesuai </p>
                  <p className="numberTwo">2 &nbsp;&nbsp; Tidak Sesuai </p>
                  {selectedTask === "8 Behaviour Competencies" ? (
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
            </div>
          );
        default:
          return null;
      }
    };
  
    return (
      <div className="pre-activity-container">
        {renderPage()}
      </div>
    );
  }
  
  export default SelfPeer;
