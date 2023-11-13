import React, { useState, useEffect } from 'react';
import Unknown from './Photos/unknown2.jpg';
import TrashCanIcon from './Photos/trashcan.png';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const FamilyView = ({ isAuth }) => {
  Modal.setAppElement('#root'); 

  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, name: 'Joseph Slattery', photo: Unknown },
    { id: 2, name: 'Mary Slattery', photo: Unknown },
    { id: 3, name: 'Tabitha Slattery', photo: Unknown },
    { id: 4, name: 'Gerald Slattery', photo: Unknown },
  ]);

  const [inviteModalIsOpen, setInviteModalIsOpen] = useState(false);
  const [inviteValue, setInviteValue] = useState('');
  const [emailError, setEmailError] = useState('');

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
      // In a real application, you would send an invitation using inviteMethod and inviteValue.
      // Here, we're just showing a message.
      alert(`Invitation sent to ${inviteValue}`);
      closeInviteModal();
    }
  };

  const removeMember = (id) => {
    setFamilyMembers(familyMembers.filter((member) => member.id !== id));
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
    <div style={centerContentStyle}>
      <h2>My Family View</h2>
      <button style = {button} onClick={backToTimeline}>Back to Timeline</button>
      <button style = {button} onClick={openInviteModal}>Invite Family Member</button>

      <div>
        <h3>Family Members in the Timeline</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
        {familyMembers.map((member) => (
          <li key={member.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={member.photo}
                style={{ borderRadius: '75px', width: '50px', height: '50px', marginRight: '10px' }}
              />
              {member.name}
            </div>
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
  );
};

export default FamilyView;
