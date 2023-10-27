import React, { Component } from "react";
import "./DigitalTimeline.css";

class DigitalTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
    };
  }

  openPopup = () => {
    this.setState({ isPopupOpen: true });
  };

  closePopup = () => {
    this.setState({ isPopupOpen: false });
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
              <p>Hi</p>
              <button onClick={this.closePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DigitalTimeline;
