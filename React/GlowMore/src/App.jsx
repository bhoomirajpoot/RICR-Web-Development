import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
  
      <nav className="bg-pink-500 text-shadow-amber-50 px-4 py-3 flex justify-between">
        <h1 className="font-bold text-lg">GlowMore</h1>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div className="h-[90vh] flex flex-col justify-center items-center bg-pink-200">
      <h2 className="text-3xl font-bold mb-2">Welcome to GlowMore</h2>
      <p>Discover beauty with confidence 💖</p>
    </div>
  );
}

function About() {
  return (
    <div className="h-[90vh] flex flex-col justify-center items-center bg-pink-200">
      <h2 className="text-2xl font-bold mb-2 ">About Us</h2>
      <p className="text-center max-w-sm h-[15vh]  bg-purple-200">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
        repudiandae animi fuga ipsam, non, odit quidem.
      </p>
    </div>
  );
}

function Login() {
  return (
    <div className="h-[90vh] flex justify-center items-center bg-pink-100">
      <form className="bg-white p-5 rounded shadow w-72">
        <h2 className="text-xl font-bold mb-3 text-center">Login</h2>
        <input 
        type="name" 
        className="w-full mb-2 p-2 border rounded" 
        placeholder="Name" 
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
        />
        <button className="w-full  bg-pink-500 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

function Signup() {
  return (
    <div className="h-[90vh] flex justify-center items-center bg-purple-100">
      <form className="bg-white p-5 rounded shadow w-72">
        <h2 className="text-xl font-bold mb-3 text-center">Signup</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
        />
        <button className="w-full bg-purple-500 text-white py-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
}

export default App;
