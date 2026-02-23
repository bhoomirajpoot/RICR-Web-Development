import React, { useState } from "react";

function Assignment() {
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    alert("Assignment Submitted (Demo)\nScore: 80/100");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Assignment Submission</h2>

      <textarea
        rows="10"
        cols="60"
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <br /><br />
      <button onClick={handleSubmit}>Submit Assignment</button>
    </div>
  );
}

export default Assignment;