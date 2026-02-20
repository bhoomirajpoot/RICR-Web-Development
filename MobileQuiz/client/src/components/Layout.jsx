import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;