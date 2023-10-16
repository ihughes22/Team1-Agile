import React from "react";
import './App.css';
import Login from './Login';
import Registration from "./Registration";
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
)};

export default App;
