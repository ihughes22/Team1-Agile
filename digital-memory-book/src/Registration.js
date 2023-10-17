import React, { useState } from "react";
import './Registration.css';
import { useNavigate } from "react-router-dom";

function Registration() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationError, setRegistrationError] = useState("");

  const handleRegister = () => {
    // Check if the email is valid.
    if (!isValidEmail(email)) {
      setRegistrationError("Invalid email address.");
      return;
    }

	  // Check if the username is empty.
	  if (!username) {
		setRegistrationError("Please enter a username.");
		return;
	  }

    // Check if the password and password confirmation match.
    if (password !== passwordConfirmation) {
      setRegistrationError("Passwords do not match.");
      return;
    }

      // Check the password requirements.
  const passwordValidationResult = validatePassword(password);
  if (passwordValidationResult !== "valid") {
    setRegistrationError(passwordValidationResult);
    return;
  }

  setIsRegistered(true);
  setUsername(username);
  };


const validatePassword = (password) => {
	const letterCount = password.replace(/[^a-zA-Z]/g, "").length;
	if (letterCount < 8) {
	  return "Password must contain at least 8 letters.";
	}
	if (!/\d/.test(password)) {
	  return "Password must contain at least one number.";
	}
	if (!/[!@#$%^*]/.test(password)) {
	  return "Password must contain a special character.";
	}
	return "valid";
  };  

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsRegistered(false);
    setEmail("");
    setUsername("");
    setPassword("");
    setPasswordConfirmation("");
    setRegistrationError("");
    navigate("/");
  };

  return (
    <div className="RegistrationPage">
      {isRegistered ? (
        <div>
          <h2 data-testid="welcome" >Welcome, {username}!</h2>
          <button data-testid="logoutb" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Register</h2>
          <p data-testid="error" >{registrationError}</p>
          <div>
            <input
              type="email"
              placeholder="Email"
              data-testid="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              data-testid="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              data-testid="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              data-testid="cpassword"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <button data-testid="registerb" onClick={handleRegister}>Register</button>
        </div>
      )}
    </div>
  );
}

export default Registration;