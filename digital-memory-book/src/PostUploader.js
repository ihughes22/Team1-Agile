import React, { Component } from 'react';
import ImageIcon from './Assets/ImageIcon.js';
import "./PostUploader.css";
import { Link } from 'react-router-dom';

class PostUploader extends Component {
  maxChar = 230;

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
      editedCaption: '', // Added editedCaption
    };

    this.toggleContent = this.toggleContent.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.handleToggleEditMode = this.handleToggleEditMode.bind(this);
    this.handleEditDateChange = this.handleEditDateChange.bind(this);
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
      const offset = newDate.getTimezoneOffset();
      newDate.setMinutes(newDate.getMinutes() + offset);
  
      if (!isNaN(newDate)) {
        this.setState((prevState) => ({
          formData: {
            ...prevState.formData,
            date: newDate,
          },
          selectedUploadDate: newDate.toISOString().substring(0, 10), // Update selectedUploadDate
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
        date: this.state.formData.date || new Date(),
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

  handleEditCaptionChange = (e) => {
    this.setState({
      editedCaption: e.target.value,
    });
  };

  handleEditPostDate = (index) => {
    const editedDate = new Date(this.state.allItems[index].date);
    editedDate.setDate(editedDate.getDate() );
  
    const editedDateFormatted = editedDate.toISOString().slice(0, 10);
  
    this.setState({
      editMode: true,
      editedDate: editedDateFormatted,
      editedCaption: this.state.allItems[index].description, 
      editedIndex: index,
    });
  };

  toggleEditMode = (index) => {
    const { editedDate, editedIndex, editedCaption } = this.state;

    if (editedDate) {
      const parsedDate = new Date(editedDate + 'T00:00:00');

      if (!isNaN(parsedDate)) {
        const updatedItems = [...this.state.allItems];
        updatedItems[editedIndex].date = parsedDate;
        updatedItems[editedIndex].description = editedCaption; // Update the description

        this.setState({
          allItems: updatedItems,
          editMode: false,
          editedDate: null,
          editedCaption: '', // Clear editedCaption
          editedIndex: -1,
          dateValidationError: null,
        });

        updatedItems.sort((a, b) => b.date - a.date);
      } else {
        this.setState({
          dateValidationError: 'Please choose a valid date.',
        });
      }
    }
  };

  handleToggleEditMode = (index) => {
    this.setState({
      editModeIndex: index === this.state.editModeIndex ? null : index,
    });
  };

  deletePost = (index) => {
    this.setState((prevState) => {
      const updatedAllItems = [...prevState.allItems];
      updatedAllItems.splice(index, 1);
      return { allItems: updatedAllItems };
    });
  };

  render() {
    const postImageStyle = {
      border: '5px solid #fff',
      borderRadius: '4px',
      maxHeight: '150px',
      maxWidth: '400px',
      height: 'auto',
      marginRight: '40px',
      boxShadow: '0 4px 4px rgb(0 0 0 / 0.4)',
    };

    const button = {
      display: 'inline-block',
      padding: '10px 20px',
      margin: '2px',
      background: 'blue',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '5px',
      border: '1px solid black',
      cursor: 'pointer',
    };

    const postStyle = {
      border: '2px solid black',
      borderRadius: '5px',
      padding: '10px',
      display: 'flex',
      wordWrap: 'break-word',
      maxWidth: 'max-content',
      margin: '15px',
    };

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
      userSelect: 'none',
    };

    const imageUploadLabel = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    };

    const imageUploadIcon = {
      fontSize: '40px',
      marginBottom: '10px',
    };

    const descriptionBox = {
      height: '145px',
      width: '250px',
      verticalAlign: 'none',
      border: '2px solid #e2e2e2',
      borderRadius: '5px',
      resize: 'none',
    };

    const dimBackground = {
      background: this.state.showPopup ? ('rgba(0, 0, 0, 0.5)') : ('rgba(0, 0, 0, 0)'),
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '0',
    };

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
    };

    const deleteButtonStyle = {
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginLeft: '10px',
    };

    return (
      <div style={{ padding: '200px' }}>
        <Link style={button} to="/family">View Family</Link>
        <button style={button} onClick={this.togglePopup}>New Post</button>
        <div style={dimBackground}></div>
        <div style={popupBox} id="popupBox">
          <form onSubmit={this.handleUpload}>
            <div style={{ display: 'flex' }}>
              <span onClick={this.togglePopup} style={{ flex: '1' }}>Cancel</span>
              <button type='submit' disabled={this.state.disabled}>Upload</button>
            </div>
            <div style={postStyle}>
              {this.state.showImage ? (
                <img src={URL.createObjectURL(this.state.formData.image)} alt="Uploaded Image" style={postImageStyle} onClick={this.toggleContent} />
              ) : (
                <div style={imageUploadBox}>
                  <label style={imageUploadLabel} >
                    <span style={imageUploadIcon}><ImageIcon /></span>
                    Upload Image
                    <input type="file" accept="image/*" onChange={this.handleImageChange} style={{ display: 'none' }} ref={(input) => this.imageUpload = input} />
                  </label>
                </div>
              )}
              <span style={{ flex: '1', position: 'relative' }}>
                <textarea id="placeholder" onChange={this.handleDescriptionChange} placeholder="Write a description..." style={descriptionBox} />
                <input
                  type="date"
                  onChange={this.handleDateChange}
                  value={this.state.formData.date ? this.state.formData.date.toISOString().substring(0, 10) : (() => {
                    const currentDate = new Date();
                    currentDate.setDate(currentDate.getDate());
                    return currentDate.toISOString().substring(0, 10);
                  })()}
                />
              </span>
            </div>
          </form>
          <p style={{ color: 'red' }}>{this.state.ValidationMessage}</p>
        </div>

        <div>
          Uploaded Images:
          {this.state.allItems
            .sort((a, b) => b.date - a.date)
            .map((item, index) => (
              <div key={index} style={postStyle}>
                <img src={URL.createObjectURL(item.image)} alt={`Image ${index}`} style={postImageStyle} />
                {this.state.editMode && this.state.editedIndex === index ? (
                  <div>
                    <textarea value={this.state.editedCaption} onChange={this.handleEditCaptionChange} style={descriptionBox} />
                    <input
                      type="date"
                      value={this.state.editedDate || new Date().toISOString().slice(0, 10)}
                      onChange={this.handleEditDateChange}
                    />
                    <button className="update-button" onClick={() => this.toggleEditMode(index)}>Update</button>
                    {this.state.dateValidationError && (
                      <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                        {this.state.dateValidationError}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ verticalAlign: 'top', flex: '1', width: '250px', height: '145px' }}>
                    {item.description}
                  </div>
                )}
                <div style={{ textAlign: 'center' }}>
                  <div className="date-container">
                    {item.date.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit' })}
                    {this.state.editMode && this.state.editedIndex === index ? (
                      <button className="edit-option" onClick={() => this.toggleEditMode(index)}>Cancel</button>
                    ) : (
                      <button className="edit-option" onClick={() => this.handleEditPostDate(index)}>Edit</button>
                    )}
                  </div>
                </div>
                <button onClick={() => this.deletePost(index)} style={deleteButtonStyle}>
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default PostUploader;
