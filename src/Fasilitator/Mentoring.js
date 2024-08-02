import React from "react";
import "./Mentoring.css";

function Mentoring() {
  const renderPage = () => {
    return (
      <div className="mentoring1">
        <div className="title1">
          <h1><b>Mentoring</b></h1>
          <hr></hr>
        </div>
      </div>
    );
  };

  return (
    <div className="pre-activity-container">
      {renderPage()}
    </div>
  );
}

export default Mentoring;
