import React, { useState, useEffect } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import {createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";


function Registration() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  const postsCollectionRef = collection(db, "users/");

  const code = "";

  const handleRegister = async () => {
    // Check if the email is valid.
    if (!isValidEmail(email)) {
      setRegistrationError("Invalid email address.");
      return;
    }

    if (username == "") {
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
      await createUserWithEmailAndPassword(auth, email, password)
      .then(data => {  
        addUser(data.user.uid);
      })
      .catch(error => {
         console.log(error);
      });

      handleLogout();
    } 
    catch (error) {
      setRegistrationError(error.message);
    }
  };

  const addUser = async (uid) => {
    await addDoc(postsCollectionRef, {
      email,
      username, 
      uid,
      code,
    });

    localStorage.setItem("uid", uid);
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
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setPasswordConfirmation("");
    setRegistrationError("");
    navigate("/login");
  };

  return (
    <div className="RegistrationPage">
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
              type="username"
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
        </div>
    </div>
  );
}

export default Registration;
