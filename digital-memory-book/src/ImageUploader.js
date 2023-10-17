import React, { Component, useState } from 'react';

class ImageUploader extends Component {
  uploadedImages = []
  uploadedDescriptions =[]

  constructor(props) {
    super(props);

    this.state = {
      // selectedImage: null,
      formData: {
        image: '',
        description: ''
      },
      allItems: []
    };
  }

  // handleImageChange = (e) => {
  //   const selectedImage = e.target.files[0];
  //   this.uploadedImages.push(selectedImage)
  //   this.setState({ selectedImage });
  // };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  }

  handleUpload = (e) => {
    e.preventDefault();

    this.setState((prevState) => ({
        allItems: [...prevState.allItems, prevState.formData]
      }), () => {
        // This callback will be executed after the state has been updated
        console.log(this.state.formData);
        console.log(this.state.allItems);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleUpload}>
          <p>
            <label>Image: </label>
            <input id='image' name='image' value={this.state.formData.image} type="file" accept="image/*" onChange={this.handleInputChange} />
          </p>
          <p>
            <label>Description: </label>
            <input id='description' name='description' value={this.state.formData.description} onChange={this.handleInputChange} />
          </p>
          <button type='submit'>Upload</button>
        </form>

        <div>
          {this.state.allItems.map((item, index) => (
            <div key={index}>
              <img src={URL.createObjectURL(item.image)} alt={`Image ${index}`} />
              <p>{item.description}</p>
            </div>
          ))}
      </div>

      {this.state.selectedImage && (
          <div>
            <img src={URL.createObjectURL(this.state.selectedImage)} alt="Selected" />
          </div>
        )}
      </div>
    );
  }
}

export default ImageUploader;
