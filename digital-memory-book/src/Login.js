
import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login({ setIsAuth, setUsernamee }) {
  const [username, setUsername] = useState("");
  const [loginText, setLoginText] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/registration");
  };

  const handleLogin = () => {
    // Simulate a login by checking the username and password.
    signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in 
      navigate("/timelinecreation");
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
    })
    .catch(() => {
      setLoginText(
        "The email/password you entered is invalid or does not exist.",
      );
    });
  };

  const handleLogout = () => {
    setUsername("");
    setPassword("");
    setLoginText("");
  };

  return (
    <div className="Login">
      <div className="login-box">
          <div>
            <h2>Login</h2>
            <p>{loginText}</p>
            <div>
              <input
                type="text"
                placeholder="Email"
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
            <br></br>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleClick}>Register</button>
          </div>
      </div>
    </div>
  );
}

export default Login;

