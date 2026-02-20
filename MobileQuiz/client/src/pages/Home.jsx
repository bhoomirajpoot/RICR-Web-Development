import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-white mb-6">
        📱 Mobile Quiz WiFi
      </h1>

      <p className="text-white/80 mb-8">
        Play quiz with friends on same WiFi
      </p>

      <div className="space-y-4">
        <button
          onClick={() => navigate("/join")}
          className="w-full py-3 bg-white text-purple-700 font-semibold rounded-lg shadow hover:scale-105 transition"
        >
          Join Quiz
        </button>

        <button
          onClick={() => navigate("/host")}
          className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:scale-105 transition"
        >
          Host Quiz
        </button>
      </div>
    </Layout>
  );
}

export default Home;