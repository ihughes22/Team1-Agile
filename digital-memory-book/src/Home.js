import React from "react";
import { useNavigate } from "react-router-dom";
import "./Interactable.css";
import "./Home.css";
import backgroundImage from "./Photos/triangle-mosaic.png";

const Home = ({ isAuth }) => {
  const navigate = useNavigate();

  const handleClick2 = () => {
    navigate("/login");
  };

  return (
    <div
      className="page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div>
        <h1 className="heading">Welcome to My Memory Book Software</h1>
        <p className="subheading">
          Capture and relive your memories with ease.
        </p>
        {!isAuth ? (
          <button onClick={handleClick2} className="login-button">
            Log In
          </button>
        ) : (
          <p className="subheading">Glad you're here!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
