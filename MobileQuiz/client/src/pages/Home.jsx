import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Mobile Quiz WiFi</h1>

      <button
        onClick={() => navigate("/join")}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Join Quiz
      </button>

      <button
        onClick={() => navigate("/host")}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Host Quiz
      </button>
    </div>
  );
}

export default Home;