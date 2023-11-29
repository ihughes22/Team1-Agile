import React, { useState, useEffect } from "react";
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
import FamilyView from "./FamilyView";
import PhotoBook from "./PhotoBook";
import PostUploaderV2 from "./PostUploaderV2";
import Post from "./Post";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import "./Interactable.css";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [webName, setWebName] = useState(localStorage.getItem("webName"));

  const handleHomeClick = () => {
    if (isAuth) {
      window.location.pathname = "/timeline";
    } else {
      window.location.pathname = "/";
    }
  };

  const handleLoginClick = () => {
    window.location.pathname = "/login";
  };

  useEffect(() => {
    setWebName(localStorage.getItem("webName"));
  }, []);

  const handleSignOutClick = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setIsAuth(false);
        window.location.pathname = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <BrowserRouter>
      <Navbar
        style={{
          margin: "5px",
          justifyContent: "flex-end",
          fontFamily: "DM Sans",
        }}
        expand="lg"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand onClick={handleHomeClick}>
            {isAuth ? webName : "Digital Memory Book"}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={handleHomeClick}>Home</Nav.Link>
              <NavDropdown title="Resources">
                <NavDropdown.Item href="/ourmission">
                  Our Mission
                </NavDropdown.Item>
                <NavDropdown.Item href="/meetus">
                  Meet the Creators
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/contactus">Contact</Nav.Link>
              {isAuth ? (
                <Button variant="outline-danger" onClick={handleSignOutClick}>
                  Sign Out
                </Button>
              ) : (
                <Button
                  style={{
                    display: "inline-block",
                    padding: "10px 10spx",
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    textDecoration: "none",
                    fontFamily: "DM Sans, sans-serif",
                    borderRadius: "25px",
                    backgroundColor: "#434DA1",
                    color: "#ffffff",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    marginRight: "10px",
                  }}
                  onClick={handleLoginClick}
                >
                  Get Started
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/ourmission" element={<OurMission />} />
        <Route path="/meetus" element={<MeetTheCreators />} />
        <Route
          path="/timelinecreation"
          element={<DigitalTimeline isAuth={isAuth} />}
        />
        <Route path="/timeline" element={<Post isAuth={isAuth} />} />
        <Route path="/addpost" element={<PostUploaderV2 isAuth={isAuth} />} />
        <Route path="/family" element={<FamilyView isAuth={isAuth} />} />
        <Route path="/photobook" element={<PhotoBook isAuth={isAuth} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
