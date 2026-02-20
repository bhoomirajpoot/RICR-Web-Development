import { useState } from "react";
import socket from "../socket";

function Join() {
  const [name, setName] = useState("");

  const handleJoin = () => {
    if (!name) return;
    socket.emit("join", name);
    alert("Joined as " + name);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Join Quiz</h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "8px" }}
      />

      <br /><br />

      <button onClick={handleJoin} style={{ padding: "10px 20px" }}>
        Join
      </button>
    </div>
  );
}

export default Join;