import React from 'react';

const ContactUs = () => {
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

  const contactFormStyles = {
    width: '50%',
    margin: '0 auto',
    textAlign: 'left',
  };

  const inputStyles = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
  };

  const submitButtonStyles = {
    padding: '5px 10px',
    margin: '3px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
    color: 'black',
  };

  return (
    <div style={pageStyles}>
      <div>
        <h1 style={headingStyles}>Contact Us</h1>
        <p style={subheadingStyles}>We'd love to hear from you!</p>
        <form style={contactFormStyles}>
          <input
            type="text"
            placeholder="Your Name"
            style={inputStyles}
          />
          <input
            type="email"
            placeholder="Your Email"
            style={inputStyles}
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            style={inputStyles}
          />
          <button style={submitButtonStyles}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
