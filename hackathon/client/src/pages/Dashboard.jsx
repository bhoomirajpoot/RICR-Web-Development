function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Resume Score</h3>
          <p className="text-2xl text-indigo-600">75%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Quiz Accuracy</h3>
          <p className="text-2xl text-green-600">68%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Assignments</h3>
          <p className="text-2xl text-red-600">5 Pending</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Readiness</h3>
          <p className="text-2xl text-purple-600">60%</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;