import React, { useState } from "react";

function Quiz() {
  const [selected, setSelected] = useState("");

  const handleSubmit = () => {
    if (selected === "B") {
      alert("Correct Answer 🎉");
    } else {
      alert("Wrong Answer ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Adaptive Quiz</h2>

      <p>1. What is React?</p>

      <div>
        <input type="radio" name="q1" onChange={() => setSelected("A")} /> A. Database
        <br />
        <input type="radio" name="q1" onChange={() => setSelected("B")} /> B. JavaScript Library
        <br />
        <input type="radio" name="q1" onChange={() => setSelected("C")} /> C. Operating System
      </div>

      <br />
      <button onClick={handleSubmit}>Submit Answer</button>
    </div>
  );
}

export default Quiz;