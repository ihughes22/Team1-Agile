
import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [loginText, setLoginText] = useState("");
  const [password, setPassword] = useState("");

  //used for navigation to different pages in App.js browser router
  const navigate = useNavigate();

  //goes to registration page
  const navigateToRegistration = () => {
    navigate("/registration");
  };

  //check if the user sucessfully logged in (to be updated with database)
  const checkSuccessfulLogin = () => {
    // Simulate a login by checking the username and password.
    if (username === "yourUsername" && password === "yourPassword") {
      //if sucessful, empty the text fields
      clearDataFields();
      navigate("/timelinecreation");
    } else {
      //tell user the login was wrong
      setLoginText(
        "The username/password you entered is invalid or does not exist.",
      );
    }
  };

  //empty all data fields
  const clearDataFields = () => {
    setUsername("");
    setPassword("");
    setLoginText("");
  };

  return (
    <div className="Login">
      <div className="login-box">
          <div>
            <h2 data-testid="login" >Login</h2>
            <p data-testid="error">{loginText}</p>
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
            <br></br>
            <button  data-testid="loginb" onClick={checkSuccessfulLogin}>Login</button>
            <button onClick = {navigateToRegistration}>Register</button>
          </div>
      </div>
    </div>
  );
}

export default Login;

