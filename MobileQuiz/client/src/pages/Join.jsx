import { useState } from "react";
import Layout from "../components/Layout";

function Join() {
  const [name, setName] = useState("");

  const handleJoin = () => {
    if (!name) return;
    alert("Joined as " + name);
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold text-white mb-6">
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