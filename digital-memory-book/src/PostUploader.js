import React, { Component } from 'react';
import ImageIcon from './Assets/ImageIcon.js';
import "./PostUploader.css";

class PostUploader extends Component {
  maxChar = 230

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        image: null,
        description: ''
      },
      allItems: [],
      showImage: false,
      showPopup: false,
      ValidationMessage: "",
      disabled: false,
      editMode: false,
      editedDate: null, 
      editedIndex: -1, 

    };



    this.toggleContent = this.toggleContent.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.handleToggleEditMode = this.handleToggleEditMode.bind(this); // Add this line
    this.handleEditDateChange = this.handleEditDateChange.bind(this); // Add this line
  }

  handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    this.setState({
      formData: {
        ...this.state.formData,
        image: selectedImage
      }
    });
    this.toggleContent();
    if (this.state.ValidationMessage === "An image is required") {
      this.setState({ ValidationMessage: "", disabled: false });
    }
  };

  handleDescriptionChange = (e) => {
    const description = e.target.value;
    if (description.length <= this.maxChar) {
      this.setState({
        formData: {
          ...this.state.formData,
          description
        },
        disabled: false,
        ValidationMessage: ""
      });
    }
    else {
      this.setState({ ValidationMessage: "Description is too long", disabled: true });
    }
  };

  handleDateChange = (e) => {
    const dateValue = e.target.value;
    try {
      const newDate = new Date(dateValue);
      const offset = newDate.getTimezoneOffset(); // Get the current timezone offset
      newDate.setMinutes(newDate.getMinutes() + offset); // Adjust the date to local timezone

      if (!isNaN(newDate)) {
        this.setState((prevState) => ({
          formData: {
            ...prevState.formData,
            date: newDate,
          },
        }));
      }
    } catch (error) {
      console.error("Error parsing date:", error);
    }
  };

  handleUpload = (e) => {
    e.preventDefault();

    if (this.state.showImage) {
      const newPost = {
        ...this.state.formData,
        date: this.state.formData.date || new Date(), // If date is not set, use current date
      };

      this.setState((prevState) => ({
        allItems: [...prevState.allItems, newPost],
        showPopup: !prevState.showPopup,
      }));

      this.toggleContent();
      document.getElementById("placeholder").value = "";
    } else {
      this.setState({ ValidationMessage: "An image is required", disabled: true });
    }
  };

  toggleContent() {
    this.setState((prevState) => ({
      showImage: !prevState.showImage
    }));
  }

  togglePopup() {
    this.setState((prevState) => ({
      showPopup: !prevState.showPopup
    }));
  }

  handleEditDateChange = (e) => {
    this.setState({
      editedDate: e.target.value
    });
  };
  
handleEditPostDate = (index) => {
  const editedDate = this.state.allItems[index].date;
  this.setState({
    editMode: true,
    editedDate: editedDate.toISOString().slice(0, 16), // Convert date to ISO format for datetime-local input
    editedIndex: index,
  });
};

toggleEditMode = (index) => {
  const { editedDate, editedIndex } = this.state;

  if (editedDate) {
    const parsedDate = new Date(editedDate + 'T00:00:00');

    if (!isNaN(parsedDate)) { // Check if parsed date is valid
      const updatedItems = [...this.state.allItems];
      updatedItems[editedIndex].date = parsedDate;

      this.setState({
        allItems: updatedItems,
        editMode: false,
        editedDate: null,
        editedIndex: -1,
        dateValidationError: null, // Clear any previous validation errors
      });

      // Re-sort the posts after update
      updatedItems.sort((a, b) => b.date - a.date);
    } else {
      // Set dateValidationError in state
      this.setState({
        dateValidationError: 'Please choose a valid date.'
      });
    }
  }
};
  
  handleToggleEditMode = (index) => {
    this.setState({
      editModeIndex: index === this.state.editModeIndex ? null : index,
    });
  }

  render() {
    const postImageStyle = {
      border: '5px solid #fff',
      borderRadius: '4px',
      maxHeight: '150px',
      maxWidth: '400px',
      height: 'auto',
      marginRight: '40px',
      boxShadow: '0 4px 4px rgb(0 0 0 / 0.4)'
    }

    const postStyle = {
      border: '2px solid black',
      borderRadius: '5px',
      padding: '10px',
      display: 'flex',
      wordWrap: 'break-word',
      maxWidth: 'max-content',
      margin: '15px'
    }

    const imageUploadBox = {
      display: 'inline-block',
      borderRadius: '5px',
      background: '#e2e2e2',
      position: 'relative',
      width: '150px',
      height: '150px',
      textAlign: 'center',
      fontSize: '18px',
      marginRight: '40px',
      userSelect: 'none'
    }

    const imageUploadLabel = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }
    
    const imageUploadIcon = {
      fontSize: '40px',
      marginBottom: '10px'
    }

    const descriptionBox = {
      height: '145px', 
      width: '250px', 
      verticalAlign: 'none', 
      border: '2px solid #e2e2e2', 
      borderRadius: '5px',
      resize: 'none'
    }

    const dimBackground = {
      background: this.state.showPopup ? ('rgba(0, 0, 0, 0.5)') : ('rgba(0, 0, 0, 0)'),
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '0'
    }

    const popupBox = {
      padding: '30px',
      border: '2px solid black',
      borderRadius: '5px',
      position: 'fixed',
      width: 'max-content',
      display: this.state.showPopup ?  ('block') : ('none'),
      background: '#ffffff',
      boxShadow: '0 4px 4px rgb(0 0 0 / 0.4)',
      zIndex: '1',
    }

    return (
      <div style={{padding: '200px'}}>
      <h1>Upload Button</h1>
      <button onClick={this.togglePopup}>New Post</button>
      <div style={dimBackground}></div>
      <div style={popupBox} id="popupBox">
        <form onSubmit={this.handleUpload}>
        <div style={{display: 'flex'}}>
          <span onClick={this.togglePopup} style={{flex: '1'}}>Cancel</span>
          <button type='submit' disabled={this.state.disabled}>Upload</button>
        </div>
        <div style={postStyle}>
          {this.state.showImage ? ( <img src={URL.createObjectURL(this.state.formData.image)} alt="Uploaded Image" style={postImageStyle} onClick={this.toggleContent} /> ) : (
            <div style={imageUploadBox}>
            <label style={imageUploadLabel} >
              <span style={imageUploadIcon}><ImageIcon/></span>
              Upload Image
            <input type="file" accept="image/*" onChange={this.handleImageChange} style={{display: 'none'}} ref={(input) => this.imageUpload = input}/>
            </label>
            </div>
          )}
          <span style={{flex: '1', position: 'relative'}}>
            <textarea id="placeholder" onChange={this.handleDescriptionChange} placeholder="Write a description..." style={descriptionBox}/>
            <input
              type="date"
              onChange={this.handleDateChange}
              value={this.state.formData.date ? this.state.formData.date.toISOString().substring(0, 10) : ""}
            />
          </span>
          </div>
        </form>
        <p style={{color: 'red'}}>{this.state.ValidationMessage}</p>
    </div>

    <div>
      Uploaded Images:
      {this.state.allItems
        .sort((a, b) => b.date - a.date) // Sort posts by date in descending order
        .map((item, index) => (
          <div key={index} style={postStyle}>
            <img src={URL.createObjectURL(item.image)} alt={`Image ${index}`} style={postImageStyle} />
            <span style={{ verticalAlign: 'top', flex: '1', width: '250px', height: '145px' }}>{item.description}</span>
            <div style={{ textAlign: 'center' }}>
              
              {this.state.editMode && this.state.editedIndex === index ?  (
                <div>
                  <input
                    type="date"
                    value={this.state.editedDate}
                    onChange={this.handleEditDateChange}
                  />
                  <button className="update-button" onClick={this.toggleEditMode}>Update</button>
                  {this.state.dateValidationError && (
                    <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                      {this.state.dateValidationError}
                    </div>
    )}
                </div> 
              ) : (
                <div className="date-container">
                {item.date.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit' })}
                <button className="edit-option" onClick={() => this.handleEditPostDate(index)}>Edit</button>
                </div>  
              )}
              
            </div>
          </div>
        ))}
    </div>


      </div>
    );
  }
}

export default PostUploader;
