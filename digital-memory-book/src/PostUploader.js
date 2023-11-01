import React, { Component } from 'react';
import ImageIcon from './Assets/ImageIcon.js';
import Post from './Post.js';
import './Post.css';

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
    };

    this.toggleContent = this.toggleContent.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
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

  handleUpload = (e) => {
    e.preventDefault();

    if (this.state.showImage) {
      this.setState((prevState) => ({
          allItems: [...prevState.allItems, prevState.formData],
          showPopup: !prevState.showPopup
      }))
      this.toggleContent();
      document.getElementById("placeholder").value = "";
    }
    else {
      this.setState({ ValidationMessage: "An image is required", disabled: true });
    }
}

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


  render() {
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
        <h1>Post Uploader</h1> 
        <button onClick={this.togglePopup}>New Post</button>
        <div style={dimBackground}></div>
        <div style={popupBox} id="popupBox">
          <form onSubmit={this.handleUpload}>
          <div style={{display: 'flex'}}>
            <span onClick={this.togglePopup} style={{flex: '1'}}>Cancel</span>
            <button type='submit' disabled={this.state.disabled}>Upload</button>
          </div>
          <div className="post">
            {this.state.showImage ? ( <img src={URL.createObjectURL(this.state.formData.image)} alt="Uploaded Image" className="postImage" onClick={this.toggleContent} /> ) : (
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
            </span>
            </div>
          </form>
          <p style={{color: 'red'}}>{this.state.ValidationMessage}</p>
        </div>

        <div>
          Uploaded Posts:
          {this.state.allItems.map((item, index) => (
            <Post key={index} item={item}/>
          ))}
        </div>
      </div>
    );
  }
}

export default PostUploader;