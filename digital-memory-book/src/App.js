import React from "react";
import './App.css';
import Login from './Login';
import Registration from "./Registration";
//import { BrowserRouter, Routes, Route, } from 'react-router-dom';

function App() {
  return (
    /* i ATTEMPTED to try and combine the login/registration pages here but failed... miserably
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Registration">
          <Registration/>
        </Route>
      </Routes>
    </BrowserRouter>*/
    <Login/>
  );
}

export default App;
