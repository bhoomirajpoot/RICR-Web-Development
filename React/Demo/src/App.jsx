import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Contect from "./pages/Contect";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (

    <>
      {/* <Header />
      <Home />
      <Contect />
      <Footer /> */}

      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/contect" element={<Contect />} />
        </Routes>


        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;