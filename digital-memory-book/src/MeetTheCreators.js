import React from 'react';
import backgroundImage from './Photos/triangle-mosaic.png';
import Isabel from './Headshots/team_member_1.jpeg';
import Rodney from './Headshots/team_member_2.jpeg';
import Ethan from './Headshots/team_member_3.jfif';
import Jolene from './Headshots/team_member_4.jpeg';
import Ashna from './Headshots/team_member_5.jfif';
import Zuting from './Headshots/team_member_6.jfif'
import Ahmad from './Headshots/team_member_7.jpeg';


const teamMembers = [
  {
    name: 'Isabel Hughes',
    role: 'Founder & CEO',
    src: Isabel,
    bio: 'Hi, my name is Isabel Hughes, and I am a senior Cybersecurity student with a minor in Computer Science. Over this past summer, I was introduced to agile through Scrum methodologies at my internship. I learned a lot about the whole overview of agile, sprints, and even got to participate in a PI planning event. I have also CAed for CS 347 (Software Development Process).',
  },
  {
    name: 'Rodney Wotton',
    role: 'Designer',
    src: Rodney,
    bio: 'My name is Rodney Wotton. I am a computer science major in my final year. I am currently working part time as Desk Side Services (IT) for Royal Bank of Canada. During my internship at RBC over the summer, I developed an auto refresh software that scraped, parsed, and outputted specific HTML from our Desk Side Services website. I also developed a chrome extension that would notify me when my application installations completed. (We used this website to remotely install applications to users computers). Fun Fact: I like to video edit and have 8 fish!',
  },
  {
    name: 'Ethan Kleschinsky',
    role: 'Lead Developer',
    src: Ethan,
    bio: 'Pursuing a B.E. in Software Engineering, expected to graduate in May 2024. Undergraduate Researcher in the Health & AI Lab. Automation & Robotics Internship at Merck in Summer 2023. Not working on anything specific just yet! I share a birthday with Shawn Mendes',
  },
  {
    name: 'Jolene Ciccarone',
    role: 'Marketing Manager',
    src: Jolene,
    bio: 'Hi! I am a 4/4 Software Engineering major. Over the past two summers, I have done research in AI/ML and Data Analysis, and have interned at a finance & pharma company. Currently, I am an Assistant to the ASC, a grader for MA 134 and an RA. I mainly have experience with python and java and am looking into learning more about app development. Something you probably would not know about me is that in my free time, I teach kids how to play Minecraft through CodeAdvantage.',
  },
  {
    name: 'Ashna Razdan',
    role: 'Content Writer',
    src: Ashna,
    bio: 'Hi! My name is Ashna and I am a 4/4 Software Engineering major with a minor in Computer Science. I have some experience in full-stack development and mainly work in Java, JavaScript, and Python. I am currently working on some app development and am constantly learning new things! One fun fact about me is my favorite movie is Teen Beach Movie.',
  },
  {
    name: 'Zuting Chen',
    role: 'UX Researcher',
    src: Zuting,
    bio: 'Hello! I am a 4/4 undergraduate Software Engineer. I have had internship experience in Merck and Warner Bros. Discovery where I did a mix of frontend and backend. Eventually, I hope to be able to work with fullstack. As a hobby, I also love to draw!',
  },
  {
    name: 'Ahmad Chaabane',
    role: 'Support Specialist',
    src: Ahmad,
    bio: 'Hello, my name is Ahmad Chaabane. I am a 3rd year software engineering major. I do not have professional experience in the field other than a projects I have worked on my own time. I am currently working on a couple of projects with some friends to create a discord bot for music. I am a big fan of sport, specifically MMA and basketball. I am still currently learning MMA but I have been playing basketball all my life.',
  },
];

const MeetTheCreators = () => {
  const pageStyles = {
    textAlign: 'center',
    padding: '20px',
    backgroundImage: `url(${backgroundImage})`, 
    backgroundSize: '500px 500px',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    height: '100%',  };

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
    background: '#FFFFFF', 
    border: '1px gray solid', 
    borderRadius: '75px', 
    margin: '50px auto', 
    maxWidth: '800px', 
    position: 'relative',
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
        <div data-testid="people" key={index} style={memberStyles}> 
          <img style = {{height: '200px', width: '200px'}} src={member.src} alt={member.name} />
          <h2 style={memberNameStyles}>{member.name}</h2>
          <p style={memberRoleStyles}>{member.role}</p>
          <p style={memberBioStyles}>{member.bio}</p>
        </div>
      ))}
    </div>
  );
      };

export default MeetTheCreators;
