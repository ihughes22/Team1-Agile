import React from "react";
import "./App.css";
import Login from "./Login";
import Registration from "./Registration";
import DigitalTimeline from "./DigitalTimeline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TimelineUrl from "./TimelineUrl";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DigitalTimeline></DigitalTimeline>} />
        <Route path="/timeline" element={<TimelineUrl />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
