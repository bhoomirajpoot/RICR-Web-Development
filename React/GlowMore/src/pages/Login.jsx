import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", email, password);
    alert("Login Successful (demo)");
  };

  return (
    <div className="container my-5">
      <h2 className="text-primary mb-4">Login</h2>

      <form className="col-md-6 shadow p-4 rounded" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>


        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="form-label"></label>
        </div>

        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
