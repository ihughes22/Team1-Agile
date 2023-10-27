import React, { Component } from "react";
import "./DigitalTimeline.css";

class DigitalTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
      enteredName: "", // State to store the entered name
    };
  }

  openPopup = () => {
    this.setState({ isPopupOpen: true });
  };

  closePopup = () => {
    this.setState({ isPopupOpen: false });
  };

  handleNameChange = (event) => {
    this.setState({ enteredName: event.target.value });
  };

  saveName = () => {
    // You can save the enteredName value to your desired location (e.g., in state, database, etc.)
    // For this example, we'll just display it in the modal content.
  };

  render() {
    return (
      <div>
        <button onClick={this.openPopup}>Create New Timeline</button>
        {this.state.isPopupOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={this.closePopup}>
                &times;
              </span>
              <p>Enter the name of your timeline</p>
              <input
                type="text"
                placeholder="timeline name"
                value={this.state.enteredName}
                onChange={this.handleNameChange}
              />
              <button onClick={this.saveName}>Save</button>
              <p>Timeline Name: {this.state.enteredName}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DigitalTimeline;
