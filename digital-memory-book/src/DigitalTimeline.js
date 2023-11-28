import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from './firebase';
import {collection, query, where, getDocs, doc, setDoc, addDoc, updateDoc} from "firebase/firestore";

const DigitalTimeline = ({ isAuth }) => {
  const [isCreatingNewFamily, setIsCreatingNewFamily] = useState(false);
  const [enteredName, setEnteredName] = useState("");
  const [familyCode, setFamilyCode] = useState("");
  const [familyE, setFamilyE] = useState(false);
  const [message, setMessage] = useState("");
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const navigate = useNavigate();

  const handleCreateNewFamily = () => {
    setIsCreatingNewFamily(true);
  };

  const handleEnterFamilyCode = () => {
    setIsCreatingNewFamily(false);
  };

  const handleNameChange = (event) => {
    setEnteredName(event.target.value);
  };

  const handleFamilyCodeChange = (event) => {
    setFamilyCode(event.target.value);
  };

  const userRef = collection(db, 'families');

  const saveNewFamily = async () => {
    const userRef2 = collection(db, 'users');
    const q2 = query(userRef2, where("uid", "==", uid));

    await getUsers2(q2);

    await addDoc(userRef, {
      code: uid, 
      name: enteredName,
    });

    localStorage.setItem("code", uid);
    localStorage.setItem("webName", enteredName);

    navigate("/timeline");
  };

  const joinFamily = () => {
    // Perform actions with familyCode for joining an existing family
    const q = query(userRef, where("code", "==", familyCode));

    getFamilies(q);

    if(familyE){
      const userRef1 = collection(db, 'users');
      const q1 = query(userRef1, where("uid", "==", uid));

      getUsers1(q1);

      localStorage.setItem("code", familyCode);

      navigate("/timeline");
    }
  };

  const getUsers1 = async (qe) => {
    const querySnapshot3 = await getDocs(qe);
    querySnapshot3.forEach(async (user) => {
      const getUser = doc(db, 'users', user.id);
      await updateDoc(getUser, {
       code: familyCode,
      });
     });
  };

  const getUsers2 = async (qe) => {
    const querySnapshot3 = await getDocs(qe);
    querySnapshot3.forEach(async (user) => {
      const getUser = doc(db, 'users', user.id);
      await updateDoc(getUser, {
       code: uid,
      });
     });
  };

  const getFamilies = async (q) => {
    const querySnapshot = await getDocs(q);
    if(querySnapshot.size == 0){
      setMessage("That family doesn't exist");
    }else{
      querySnapshot.forEach(async (user) => {
        const dddata = user.data();
        console.log(dddata.name);
        localStorage.setItem("webName", dddata.name);
     });
     setFamilyE(true);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  const centeredContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh',
  };
  
  const buttonContainer = {
    textAlign: 'center',
  };

  const button2 = {
    padding: '5px 10px',
    margin: '3px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={centeredContainer}>
      <div style={buttonContainer}>
        {isCreatingNewFamily ? (
          <>
            <p>Enter the name of your new family!</p>
            <input
              type="text"
              placeholder="Family Name"
              value={enteredName}
              onChange={handleNameChange}
            />
            <button style = {button2} onClick={saveNewFamily}>Save</button>
            <button style = {button2} onClick={handleEnterFamilyCode}>Back</button>
          </>
        ) : (
          <>
            <p>Enter the family code to join!</p>
            <p style = {{color: 'red'}}>{message}</p>
            <input
              type="text"
              placeholder="Family Code"
              value={familyCode}
              onChange={handleFamilyCodeChange}
            />
            <button style = {button2} onClick={joinFamily}>Join</button>
            <button style = {button2} onClick={handleCreateNewFamily}>Create New Family</button>
          </>
        )}
      </div>
    </div>
  );
};

export default DigitalTimeline;
