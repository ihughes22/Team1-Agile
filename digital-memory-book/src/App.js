import React from "react";
import "./App.css";
import Login from "./Login";
import Registration from "./Registration";
import Home from "./Home";
import NavbarTop from "./NavbarTop";
import ContactUs from "./ContactUs";
import OurMission from "./OurMission";
import MeetTheCreators from "./MeetTheCreators";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DigitalTimeline from "./DigitalTimeline";
import PostUploader from "./PostUploader";
import FamilyView from "./FamilyView";

function App() {
  return (
    <BrowserRouter>
      <NavbarTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/ourmission" element={<OurMission />} />
        <Route path="/meetus" element={<MeetTheCreators />} />
        <Route path="/timelinecreation" element={<DigitalTimeline/>} />
        <Route path="/timeline" element={<PostUploader/>} />
        <Route path="/family" element={<FamilyView/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
