import React, { useState } from 'react';
import Unknown from './Photos/unknown2.jpg';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for the modal (replace with your root element ID)

const centerContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
};

const FamilyView = () => {
  const [showMembers, setShowMembers] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, name: 'Joseph Slattery', photo: Unknown},
    { id: 2, name: 'Mary Slattery', photo: Unknown},
    { id: 3, name: 'Tabitha Slattery', photo: Unknown },
    { id: 3, name: 'Gerald Slattery', photo: Unknown },
  ]);

  const [inviteModalIsOpen, setInviteModalIsOpen] = useState(false);
  const [inviteMethod, setInviteMethod] = useState('email'); // Default to 'email'
  const [inviteValue, setInviteValue] = useState('');
  const [emailError, setEmailError] = useState('');

  const toggleMemberList = () => {
    setShowMembers(!showMembers);
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
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const inviteMember = () => {
    if (inviteMethod === 'email' && !isEmailValid(inviteValue)) {
      setEmailError('Invalid email address');
    } else {
      // In a real application, you would send an invitation using inviteMethod and inviteValue.
      // Here, we're just showing a message.
      alert(`Invitation sent to ${inviteValue} using ${inviteMethod}`);
      closeInviteModal();
    }
  };

  return (
    <div style={centerContentStyle}>
      <h2>My Family View</h2>
      <button onClick={toggleMemberList}>
        {showMembers ? 'Hide Family Members' : 'Show Family Members'}
      </button>

      <button onClick={openInviteModal}>Invite Family Member</button>

      {showMembers && (
        <div>
          <h3>Family Members in the Timeline</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {familyMembers.map((member) => (
              <li key={member.id} style={{ marginBottom: '10px' }}>
                <img
                  src={member.photo}
                  style={{ borderRadius: '75px', width: '50px', height: '50px', marginRight: '10px' }}
                />
                {member.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Modal
        isOpen={inviteModalIsOpen}
        onRequestClose={closeInviteModal}
        style={{
          content: {
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
          <label>Invite using:</label>
          <select value={inviteMethod} onChange={(e) => setInviteMethod(e.target.value)}>
            <option value="email">Email</option>
            <option value="username">Username</option>
          </select>
        </div>
        <div>
          {inviteMethod === 'email' ? (
            <>
              <label>Email:</label>
              <input
                type="text"
                value={inviteValue}
                onChange={(e) => {
                  setInviteValue(e.target.value);
                  setEmailError('');
                }}
              />
              <p style={{ color: 'red' }}>{emailError}</p>
            </>
          ) : (
            <>
              <label>Username:</label>
              <input
                type="text"
                value={inviteValue}
                onChange={(e) => setInviteValue(e.target.value)}
              />
            </>
          )}
        </div>
        <div>
          <button onClick={inviteMember}>Invite Member</button>
          <button onClick={closeInviteModal}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default FamilyView;
