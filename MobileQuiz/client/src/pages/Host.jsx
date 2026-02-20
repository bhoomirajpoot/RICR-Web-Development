import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import socket from "../socket";
import PlayerList from "../components/PlayerList";

function Host() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on("player-list", (data) => {
      setPlayers(data);
    });
  }, []);

  const startQuiz = () => {
    socket.emit("start-quiz");
  };

  return (
    <Layout>
      <h2 className="text-2xl text-white font-bold mb-4 text-center">
        Host Dashboard
      </h2>

      <button
        onClick={startQuiz}
        className="w-full py-3 bg-green-400 rounded-lg font-semibold mb-4"
      >
        Start Quiz
      </button>

      <PlayerList players={players} />
    </Layout>
  );
}

export default Host;