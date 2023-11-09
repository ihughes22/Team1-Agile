import React, { useState } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
//import {Auth} from "./Backend/components/auth"
import { auth } from "./Backend/config/firebase";
import {
  createUserWithEmailAndPassword,
    } from "firebase/auth";



function Registration() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationError, setRegistrationError] = useState("");

  const handleRegister = async () => {
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

    try {
      // Use the createUserWithEmailAndPassword function from auth.js to handle registration
      await createUserWithEmailAndPassword(auth, email, password);
      setIsRegistered(true);
    } catch (error) {
      setRegistrationError(error.message);
    }

    // Here you would typically send the registration data to your backend for processing.
    setTimeout(() => {
      setIsRegistered(true);
      setUsername(username);
    }, 1000);


  };

  const validatePassword = (password) => {
    const letterCount = password.replace(/[^a-zA-Z]/g, "").length;
    if (letterCount < 8) {
      return "Password must contain at least 8 letters.";
    }
    if (!/\d/.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "Password must contain a special character (!@#$%^&*).";
    }
    return "valid";
  };

  const isValidEmail = (email) => {
    // You can implement your own email validation logic here.
    // For a basic check, you can use regular expressions.
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
    navigate("/login");
  };

  return (
    <div className="RegistrationPage">
      {isRegistered ? (
        <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout}>Logout</button>

        </div>
      ) : (
        <div>
          <h2>Register</h2>
          <p>{registrationError}</p>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <button onClick={handleRegister}>Register</button>
          {/* <button onClick={Auth().signIn()}>Register</button> */}

        </div>
      )}
    </div>
  );
}

export default Registration;



