import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
        <span className="navbar-brand fw-bold">My Website</span>

        <div className="ms-auto d-flex gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-warning text-decoration-none fw-bold"
                : "text-light text-decoration-none"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-warning text-decoration-none fw-bold"
                : "text-light text-decoration-none"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-warning text-decoration-none fw-bold"
                : "text-light text-decoration-none"
            }
          >
            Contact
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Header;
