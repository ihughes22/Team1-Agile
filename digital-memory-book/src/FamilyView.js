import React, { useState, useEffect } from 'react';
import Unknown from './Photos/unknown2.jpg';
import TrashCanIcon from './Photos/trashcan.png';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import backgroundImage from './Photos/triangle-mosaic.png'
import {
  setDoc,
  getDocs,
  updateDoc,
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore, 
  query, 
  where,
} from 'firebase/firestore';

const FamilyView = ({ isAuth }) => {
  const pageStyles = {
    textAlign: 'center',
    padding: '20px',
    backgroundImage: `url(${backgroundImage})`,  // Add this line
    backgroundSize: '500px 500px',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    height: '100vh',
  };

  Modal.setAppElement('#root'); 

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [inviteModalIsOpen, setInviteModalIsOpen] = useState(false);
  const [inviteValue, setInviteValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const [code, setCode] = useState(localStorage.getItem("code"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');

  const showPasswordChangeFields = () => {
    setShowPasswordChange(true);
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setPasswordChangeError('');
  };

  const changeFamilyPassword = async () => {

    const userRef3 = collection(db, 'families');
    const famz = await getDocs(userRef3);
    
    var password = "";
    
    famz.forEach((doc) => {
      const ddata = doc.data();
      
      if(ddata.code === code){
        password = ddata.password;
      }
    });

    // Check if old password matches the current password
    if (oldPassword !== password) {
      setPasswordChangeError('Old password is incorrect');
      return;
    }

    // Check if new password matches confirm password
    if (newPassword !== confirmNewPassword) {
      setPasswordChangeError('New passwords do not match');
      return;
    }
    
    famz.forEach(async (docz) => {
      const ddata = docz.data();

      if(ddata.code === code){
        const getUser = doc(db, 'families', docz.id);
        await updateDoc(getUser, {
          password: newPassword,
        });
      }
    });

    alert('Password changed successfully'); 

    setShowPasswordChange(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setPasswordChangeError('');
  };


  const openInviteModal = () => {
    setInviteModalIsOpen(true);
  };

  const closeInviteModal = () => {
    setInviteModalIsOpen(false);
    setInviteValue('');
    setEmailError('');
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const inviteMember = () => {
    if (!isEmailValid(inviteValue)) {
      setEmailError('Invalid email address');
    } else {
      alert(`Invitation sent to ${inviteValue}`);
      closeInviteModal();
    }
  };

  const removeMember = (id) => {
    const userRef2 = collection(db, 'users');
    const q2 = query(userRef2, where("uid", "==", uid));

    getUsers2(q2);

    fetchUsers();
  };

  const getUsers2 = async (qe) => {
    const querySnapshot3 = await getDocs(qe);
    querySnapshot3.forEach(async (user) => {
      const getUser = doc(db, 'users', user.id);
      await updateDoc(getUser, {
       code: "",
      });
     });
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  const backToTimeline = () => {
    navigate("/timeline");
  }

  const fetchUsers = async () => {
    const postsRef = collection(db, 'users/');
    const postsData = await getDocs(postsRef);
    
    const matchingUsers = [];
    postsData.forEach((doc) => {
      const ddata = doc.data();
      if(ddata.code == code){
        matchingUsers.push({ id: doc.id, ...ddata })
      }
    });

    setFamilyMembers(matchingUsers);
  };


  useEffect(() => {
    // Fetch posts on component mount
    fetchUsers();

    // Set up a timer to fetch posts every 30 minutes
    const intervalId = setInterval(() => {
      fetchUsers();
    }, 30 * 60 * 1000);

    // Clean up the timer on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that this effect runs once on mount

  const centerContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  };
  
  const button = {
    padding: '5px 10px',
    margin: '3px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
    color: 'black',
  };

  return (
    <div style={pageStyles}>
    <div style={centerContentStyle}>
      <h2>My Family View</h2>
      <p> Your family code is: {code}</p>
      <button style = {button} onClick={backToTimeline}>Back to Timeline</button>
      <button style = {button} onClick={openInviteModal}>Invite Family Member</button>
      <button style={button} onClick={showPasswordChangeFields}>
        Change Family Password
      </button>

      {/* Password change fields - conditional rendering */}
      {showPasswordChange && (
        <div>
          <div>
            <label style={{ margin: '5px' }}>Old Password:</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <label style={{ margin: '5px' }}>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label style={{ margin: '5px' }}>Confirm New Password:</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
          <p style={{ color: 'red' }}>{passwordChangeError}</p>
          <button style={button} onClick={changeFamilyPassword}>
            Save New Password
          </button>
        </div>
      )}
      <div>
        <h3>Family Members in the Timeline</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
        {familyMembers.map((member) => (
          <li key={member.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={Unknown}
                style={{ borderRadius: '75px', width: '50px', height: '50px', marginRight: '10px' }}
              />
              {member.username}
            </div>
            {member.uid === uid && (
            <img
            src={TrashCanIcon}
            alt="Remove"
            style={{
              cursor: 'pointer',
              width: '20px',
              height: '20px',
            }}
            onClick={() => {
              const confirmRemove = window.confirm("Are you sure you want to remove this person?");
              if (confirmRemove) {
                removeMember(member.id);
              }
            }}
          />
          )}
          </li>
        ))}
        </ul>
      </div>

      <Modal
        isOpen={inviteModalIsOpen}
        onRequestClose={closeInviteModal}
        style={{
          content: {
            height: '200px',
            maxWidth: '400px',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        <h3>Invite Family Member</h3>
        <div>
        </div>
        <div>
            <label style = {{margin: '5px'}}>Email:</label>
            <input
              type="text"
              value={inviteValue}
              onChange={(e) => {
                setInviteValue(e.target.value);
                setEmailError('');
              }}
            />
            <p style={{ color: 'red' }}>{emailError}</p>
        </div>
        <div>
          <button style = {button} onClick={inviteMember}>Invite Member</button>
          <button style = {button} onClick={closeInviteModal}>Cancel</button>
        </div>
      </Modal>
    </div>
    </div>
  );
};

export default FamilyView;
