function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 to-purple-600">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl text-white w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 rounded bg-white/20 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-2 rounded bg-white/20 outline-none"
        />

        <button className="w-full bg-white text-indigo-600 py-2 rounded font-semibold">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;