import React, { useState } from "react";
import "./DigitalTimeline.css";
import { useNavigate } from "react-router-dom";

const DigitalTimeline = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [enteredName, setEnteredName] = useState("");
  const navigate = useNavigate();

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleNameChange = (event) => {
    setEnteredName(event.target.value);
  };

  const saveName = () => {
    navigate('/timeline');
  };

  return (
    <div>
      <button onClick={openPopup}>Create New Timeline</button>
      {isPopupOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <p>Enter the name of your new timeline!</p>
            <input
              type="text"
              placeholder="Timeline Name"
              value={enteredName}
              onChange={handleNameChange}
            />
            <button onClick={saveName}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalTimeline;
