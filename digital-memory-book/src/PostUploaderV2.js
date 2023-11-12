import React, { useState, useEffect, Component } from "react";
import ImageIcon from './Assets/ImageIcon.js';
import "./PostUploader.css";
import { useNavigate } from "react-router-dom";
import { setDoc, getDocs, addDoc, collection, deleteDoc, doc, Firestore } from "firebase/firestore";
import {
    ref,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";
import { db } from "./firebase";
import { v4 } from "uuid";
import { storage } from "./firebase";

function PostUploaderV2 (){
    const maxChar = 230;

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const [date, setDate] = useState("");

    const [validationMessage, setMessage] = useState("");

    const postsCollectionRef = collection(db, "posts/");

    const navigate = useNavigate();

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    }

    const handleCaptionChange = (event) => {
        if(event.target.value.length > maxChar){
            setMessage("Description is too long");
        }
        else{
            setCaption(event.target.value);
            setMessage("");
        }
    }
    
    const handleDateChange = (event) => {
        setDate(event.target.value);
    }

    const createPost = async (path) => {
        await addDoc(postsCollectionRef, {
          path,
          caption,
          date,
        });
      };
      
    const handleUpload = () => {
        if(image == null){
            setMessage("An image is required");
        }
        else if(date == ""){
            setMessage("A date is required");
        }
        else{
            const imageRef = ref(storage, `Photos/${image.name + v4()}`);
            uploadBytes(imageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    createPost(url);
                });
            });

            setImage(null);
            setCaption("");
            setMessage("");
            setDate("");
            document.getElementById("placeholder").value = "";
            navigate("/timeline");
        }
    }

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
        <div style={{ padding: '250px', marginLeft: '350px'}}>
        <div style={dimBackground}></div>
        <div style={popupBox} id="popupBox">
          <div>
            <div style={{ display: 'flex' }}>
              <button style = {button} id = "submit" type='submit' onClick={handleUpload}>Upload</button>
            </div>
            <div style={postStyle}>
              {image ? (
                <img src={URL.createObjectURL(image)} alt="Uploaded Image" style={postImageStyle} /*onClick={this.toggleContent}*/ />
              ) : (
                <div style={imageUploadBox}>
                  <label style={imageUploadLabel} >
                    <span style={imageUploadIcon}><ImageIcon /></span>
                    Upload Image
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }}/>
                  </label>
                </div>
              )}
              <span style={{ flex: '1', position: 'relative' }}>
                <textarea id="placeholder" onChange={handleCaptionChange} placeholder="Write a description..." style={descriptionBox} />
                <input
                  style = {{marginLeft: '10px',}}
                  type="date"
                  onChange={handleDateChange}
                  value={date}
                />
              </span>
            </div>
          </div>
          <p style={{ color: 'red' }}>{validationMessage}</p>
        </div>
        </div>
    );
}

export default PostUploaderV2;