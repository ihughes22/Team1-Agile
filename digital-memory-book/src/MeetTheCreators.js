import React from 'react';

const teamMembers = [
  {
    name: 'Isabel Hughes',
    role: 'Founder & CEO',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Rodney Wotton',
    role: 'Designer',
    bio: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'Ethan Kleschinsky',
    role: 'Lead Developer',
    bio: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
  {
    name: 'Jolene Ciccarone',
    role: 'Marketing Manager',
    bio: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
  },
  {
    name: 'Ashna Razdan',
    role: 'Content Writer',
    bio: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
  },
  {
    name: 'Zuting Chen',
    role: 'UX Researcher',
    bio: 'Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui.',
  },
  {
    name: 'Ahmad Chaabane',
    role: 'Support Specialist',
    bio: 'In a sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor.',
  },
];

const MeetTheCreators = () => {
  const pageStyles = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f4',
  };

  const headingStyles = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  };

  const memberStyles = {
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '5px',
  };

  const memberNameStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  };

  const memberRoleStyles = {
    fontSize: '18px',
    color: '#666',
    marginBottom: '10px',
  };

  const memberBioStyles = {
    fontSize: '16px',
    color: '#444',
  };

  return (
    <div style={pageStyles}>
      <h1 style={headingStyles}>Meet the Creators</h1>
      {teamMembers.map((member, index) => (
        <div key={index} style={memberStyles}>
          <img src={`team_member_${index + 1}.jpg`} alt={member.name} />
          <h2 style={memberNameStyles}>{member.name}</h2>
          <p style={memberRoleStyles}>{member.role}</p>
          <p style={memberBioStyles}>{member.bio}</p>
        </div>
      ))}
    </div>
  );
};

export default MeetTheCreators;
