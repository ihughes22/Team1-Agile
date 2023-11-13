import React from 'react';
import { useNavigate } from "react-router-dom";

const Home = ({ isAuth}) => {
  const pageStyles = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f4',
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

  const loginButtonStyles = {
    background: '#0073e6',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '20px',
    cursor: 'pointer',
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
          <button onClick = {handleClick2} style={loginButtonStyles}>Log In</button>
        ) :
        (
          <p style={subheadingStyles}>Glad you're here!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
