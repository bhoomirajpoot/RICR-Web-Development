import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <h2 className="text-3xl text-white font-bold mb-6 text-center">
        📱 Mobile Quiz WiFi
      </h2>

      <p className="text-white/80 text-center mb-8">
        Play quiz with friends on same network
      </p>

      <div className="space-y-4">
        <button
          onClick={() => navigate("/join")}
          className="w-full py-3 bg-white text-purple-700 rounded-lg font-semibold hover:scale-105 transition"
        >
          Join Quiz
        </button>

        <button
          onClick={() => navigate("/host")}
          className="w-full py-3 bg-yellow-400 rounded-lg font-semibold hover:scale-105 transition"
        >
          Host Quiz
        </button>
      </div>
    </Layout>
  );
}

export default Home;