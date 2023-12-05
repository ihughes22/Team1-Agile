import React from 'react';
import backgroundImage from './Photos/triangle-mosaic.png'

const OurMission = () => {
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

  const memberStyles = {
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: '#fff',
    background: '#FFFFFF', 
    border: '1px gray solid', 
    borderRadius: '75px', 
    margin: '50px auto', 
    maxWidth: '800px', 
    position: 'relative',
  };

  return (
    <div style={pageStyles}>
      <div >
        <h1 style={headingStyles}>Our Mission</h1>
        <p style={memberStyles}>
          Our mission was to create a collaborative platform for families to build a digital timeline of memories with their loved ones in their final chapter of life. A slideshow of all the memories can be viewed at any time by all family membres. When a loved one closes their final chapter, the memories family members added can be turned into a book to celebrate their life at a funeral or memorial.
        </p>
      </div>
    </div>
  );
};

export default OurMission;
