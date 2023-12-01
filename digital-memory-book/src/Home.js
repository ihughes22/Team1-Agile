import React from 'react';
import { useNavigate } from "react-router-dom";
import "./Interactable.css"
import backgroundImage from './Photos/triangle-mosaic.png'

const Home = ({ isAuth}) => {
  const pageStyles = {
    textAlign: 'center',
    padding: '20px',
    backgroundImage: `url(${backgroundImage})`,  // Add this line
    backgroundSize: '500px 500px',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    height: '100vh',
  };

  const headingStyles = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  };

  const subheadingStyles = {
    fontSize: '18px',
    color: '#666',
    marginBottom: '30px',
  };


  const navigate = useNavigate();

  const handleClick2 = () => {
    navigate('/login')
  };

  return (
    <div style={pageStyles}>
      <div>
        <h1 style={headingStyles}>Welcome to My Memory Book Software</h1>
        <p style={subheadingStyles}>Capture and relive your memories with ease.</p>
        {!isAuth ? (
          <button onClick = {handleClick2} className="login-button">Log In</button>
        ) :
        (
          <p style={subheadingStyles}>Glad you're here!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
