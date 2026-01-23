import React from "react";
import tranparentLogo from "../assets/transparentLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, isLogin } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-(--color-primary) px-4 py-2 flex justify-between items-center">

      {/* Logo */}
      <Link to="/">
        <img
          src={tranparentLogo}
          alt="Cravings Logo"
          className="h-12 w-20 object-cover invert-100"
        />
      </Link>

      {/* Nav Links */}
      <div className="flex gap-4">
        <Link to="/" className="text-white hover:text-(--color-accent)">
          Home
        </Link>
        <Link to="/about" className="text-white hover:text-(--color-accent)">
          About
        </Link>
        <Link to="/contact" className="text-white hover:text-(--color-accent)">
          Contact
        </Link>
      </div>

      {/* Auth Section */}
      <div className="flex gap-4 items-center">
        {isLogin ? (
          <div
            className="text-white cursor-pointer font-semibold hover:text-(--color-accent)"
            onClick={() =>
              navigate("/user-dashboard", { state: { openTab: "profile" } })
            }
          >
            {user?.fullName}
          </div>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-(--color-secondary) py-2 px-4 font-bold hover:bg-(--color-secondary-hover) hover:text-white rounded"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-(--color-secondary) py-2 px-4 font-bold hover:bg-(--color-secondary-hover) hover:text-white rounded"
            >
              Register
            </button>
          </>
        )}
      </div>

    </div>
  );
};

export default Header;
