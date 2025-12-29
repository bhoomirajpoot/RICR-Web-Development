import React from "react";

const Signup = () => {
  return (
    <div className="container my-5">
      <h2 className="text-primary text-center mb-4">Signup</h2>

      <form className="col-md-5 mx-auto shadow p-4 rounded">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Create password"
          />
        </div>

        <button className="btn btn-success w-100">Signup</button>

        <p className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
