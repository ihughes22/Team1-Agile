import React from "react";
import './App.css';
import Login from './Login';
import Registration from "./Registration";
import Home from "./Home";
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
)};

export default App;
