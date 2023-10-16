import React, { useState } from 'react';
import './Login.css';
//import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [loginText, setLoginText] = useState(""); 
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    /*
    const navigate = useNavigate();

    const handleClick = () =>{
        navigate("/Registration");
    }*/

    const handleLogin = () => {
      // Simulate a login by checking the username and password.
      if (username === "yourUsername" && password === "yourPassword") {
        setIsLoggedIn(true);
      }
      else{
          setLoginText("The username/password you entered is invalid or does not exist.");
      }
    };
  
    const handleLogout = () => {
      setIsLoggedIn(false);
      setUsername("");
      setPassword("");
      setLoginText("");
    };
  
    return (
      <div className="Login">
        <div className="login-box">
          {isLoggedIn ? (
            <div>
              <h2>Welcome, {username}!</h2>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div>
              <h2>Login</h2>
              <p>{loginText}</p>
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
              <button onClick={handleLogin}>Login</button>
              <button /*onClick={handleClick}*/>Register</button>
            </div>
          )}
        </div>
      </div>
    );
}

export default Login;