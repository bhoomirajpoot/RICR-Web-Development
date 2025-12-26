import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      {/* <h1 id="head"> <i className="bi bi-x-octagon-fill"></i> Hello World</h1> */}

      <div className="d-flex justify-content-between p-2 align-items-center bg-primary text-black">
        <h1>My Website</h1>
        <div className="d-flex gap-3">
          {/* <span>Home</span>
        <span>About</span>
        <span>Product</span>
        <span>Contect</span> */}

          <Link to={"/"} className="text-decoration-none text-light">Home</Link>
          <Link to={"/about"} className="text-decoration-none text-light">About</Link>
          <Link to={"/product"} className="text-decoration-none text-light">Product</Link>
          <Link to={"/contect"} className="text-decoration-none text-light">Contect</Link>
        </div>
      </div>
    </>
  );
};

export default Header;