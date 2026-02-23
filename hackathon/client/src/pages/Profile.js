import React from "react";

function Profile() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Profile</h2>

      <p>Name: Bhoomi</p>
      <p>Email: student@example.com</p>
      <p>Target Role: Full Stack Developer</p>

      <button>Change Password</button>
      <button style={{ marginLeft: "10px" }}>Logout</button>
    </div>
  );
}

export default Profile;