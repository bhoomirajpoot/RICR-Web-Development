import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-white/10 backdrop-blur-md p-4 flex justify-between items-center text-white">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Mobile Quiz
      </h1>

      <div className="space-x-4">
        <button onClick={() => navigate("/join")}>Join</button>
        <button onClick={() => navigate("/host")}>Host</button>
      </div>
    </div>
  );
}

export default Navbar;