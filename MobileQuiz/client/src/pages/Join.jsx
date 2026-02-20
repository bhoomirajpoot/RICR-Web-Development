import { useState } from "react";
import Layout from "../components/Layout";
import socket from "../socket";

function Join() {
  const [name, setName] = useState("");

  const handleJoin = () => {
    if (!name) return;
    socket.emit("join", name);
    alert("Joined as " + name);
  };

  return (
    <Layout>
      <h2 className="text-2xl text-white font-bold mb-6 text-center">
        Join Quiz
      </h2>

      <input
        type="text"
        placeholder="Enter your name"
        className="w-full p-3 rounded-lg mb-4 outline-none"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={handleJoin}
        className="w-full py-3 bg-yellow-400 rounded-lg font-semibold hover:scale-105 transition"
      >
        Join Now
      </button>
    </Layout>
  );
}

export default Join;