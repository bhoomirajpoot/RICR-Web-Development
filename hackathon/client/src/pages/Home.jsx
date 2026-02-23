import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-white/10 backdrop-blur-md">
        <h1 className="text-2xl font-bold">AI Study Planner</h1>
        <div className="space-x-4">
          <Link to="/login" className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-semibold">
            Login
          </Link>
          <Link to="/register" className="px-4 py-2 border border-white rounded-lg">
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-24 px-6">
        <h2 className="text-5xl font-bold mb-6">
          Smart Learning. Better Placement.
        </h2>

        <p className="text-lg max-w-2xl mb-8">
          Track your skills, analyze your resume, practice quizzes, and get AI-powered study plans to become job-ready.
        </p>

        <Link
          to="/register"
          className="px-8 py-4 bg-white text-indigo-600 rounded-xl text-lg font-semibold shadow-lg hover:scale-105 transition"
        >
          Get Started
        </Link>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 p-10 mt-20">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">📄 Resume Analysis</h3>
          <p>Get resume score and improvement suggestions.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">🧠 Adaptive Quiz</h3>
          <p>Practice smart quizzes based on your level.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">📊 Progress Tracking</h3>
          <p>Monitor performance and placement readiness.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;