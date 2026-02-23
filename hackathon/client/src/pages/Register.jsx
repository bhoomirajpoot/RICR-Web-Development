function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-600 to-pink-500">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl text-white w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input placeholder="Full Name" className="w-full mb-3 p-2 rounded bg-white/20" />
        <input placeholder="Email" className="w-full mb-3 p-2 rounded bg-white/20" />
        <input placeholder="Password" type="password" className="w-full mb-6 p-2 rounded bg-white/20" />

        <button className="w-full bg-white text-purple-600 py-2 rounded font-semibold">
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Register;