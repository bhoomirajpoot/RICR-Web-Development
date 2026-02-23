import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#282c34" }}>
      <Link to="/" style={{ color: "white", margin: "10px" }}>Home</Link>
      <Link to="/login" style={{ color: "white", margin: "10px" }}>Login</Link>
      <Link to="/register" style={{ color: "white", margin: "10px" }}>Register</Link>
      <Link to="/dashboard" style={{ color: "white", margin: "10px" }}>Dashboard</Link>
    </nav>
  );
}

export default Navbar;