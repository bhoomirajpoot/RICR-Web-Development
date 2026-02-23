import React, { useState } from "react";

function ResumeUpload() {
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }
    alert("Resume Uploaded Successfully (Demo)");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Resume Intelligence</h2>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br /><br />
        <button type="submit">Upload Resume</button>
      </form>

      <hr />

      <h3>Resume Strength Score: 75%</h3>
      <p>Missing Skills: React Advanced, System Design</p>
      <p>Improvement Tip: Add more project details and quantified achievements.</p>
    </div>
  );
}

export default ResumeUpload;