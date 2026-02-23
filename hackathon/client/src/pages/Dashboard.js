import React from "react";

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Dashboard</h2>
      <p>Resume Score: 70%</p>
      <p>Readiness Score: 65%</p>

      <h3>Sections</h3>
      <ul>
        <li>Resume Intelligence</li>
        <li>Adaptive Quiz</li>
        <li>Assignments</li>
        <li>Progress Tracking</li>
      </ul>
    </div>
  );
}

export default Dashboard;