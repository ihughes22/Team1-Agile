import { auth } from "../config/firebase";
import {
    createUserWithEmailAndPassword,
    signOut,
    } from "firebase/auth";
import { useState } from "react";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
          } catch (err) {
            console.error(err);
          }
    }; //I am currently watching https://www.youtube.com/watch?v=2hR-uWjBAgw&ab_channel=PedroTech
    //I am at 19:57
    
      const logout = async () => {
        try {
          await signOut(auth);
        } catch (err) {
          console.error(err);
        }
      };
    
      return (
        <div>
          <input
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password..."
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signIn}> Sign In</button>
    
          <button onClick={logout}> Logout </button>
        </div>
      );
    };
