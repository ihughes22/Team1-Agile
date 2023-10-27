import React from "react";
import "./App.css";
import Login from "./Login";
import Registration from "./Registration";
import Home from "./Home";
import NavbarTop from "./NavbarTop";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PostUploader from "./PostUploader";
import About from "./About";

function App() {
  return (
    <BrowserRouter>
      <NavbarTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/upload" element={<PostUploader />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
