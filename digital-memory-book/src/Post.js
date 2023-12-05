import React, { useState, useEffect } from "react";
import backgroundImage from "./Photos/triangle-mosaic.png";
import { useRef } from "react";
import {
  setDoc,
  getDocs,
  updateDoc,
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";
import "./Interactable.css";

const pageStyles = {
  padding: "20px",
  backgroundImage: `url(${backgroundImage})`, // Add this line
  backgroundSize: "500px 500px",
  backgroundPosition: "center",
  backgroundRepeat: "repeat",
  height: "200%",
};

const Slideshow = ({
  images,
  onClose,
  currentSlide,
  onNext,
  onPrev,
  intervalDuration,
}) => {
  const [showEscapeMessage, setShowEscapeMessage] = useState(true);
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === " ") {
      e.preventDefault(); // Prevent the default space bar behavior
      onNext();
    } else if (e.key === "ArrowLeft") {
      onPrev();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    const timeoutId = setTimeout(() => {
      setShowEscapeMessage(false);
      onNext();
    }, intervalDuration);
    const hideEscapeMessageTimeout = setTimeout(() => {
      setShowEscapeMessage(false);
    }, 2000); // Hide the escape message after 3 seconds
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(hideEscapeMessageTimeout);
      clearTimeout(timeoutId);
    };
  }, [currentSlide, onNext, onPrev, intervalDuration]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 999,
      }}
    >
      {showEscapeMessage && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: 0,
            width: "100%",
            textAlign: "center",
            color: "#fff",
          }}
        >
          Press "Escape" to exit fullscreen
        </div>
      )}
      <img
        src={images[currentSlide].path}
        alt={`Slide ${currentSlide + 1}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          backgroundColor: "rgba(0, 0, 0, 1)",
        }}
      />
    </div>
  );
};

const Post = ({ isAuth }) => {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedCaption, setEditedCaption] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideshowActive, setSlideshowActive] = useState(false);
  const [slideshowInterval, setSlideshowInterval] = useState(5000);
  const [selectedInterval, setSelectedInterval] = useState(null);

  const [code, setCode] = useState(localStorage.getItem("code"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  const [errorMessage, setErrorMessage] = useState("");

  const startSlideshow = () => {
    if (posts.length === 0) {
      setErrorMessage("There are no posts to start a slideshow.");
      return;
    }
    setSlideshowActive(true);
    setFullscreen(true);
    setCurrentSlide(0);
    setTimeout(handleSlideshowTimeout, slideshowInterval);
  };

  const handleSlideshowTimeout = () => {
    if (slideshowActive) {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % posts.length);
      setTimeout(handleSlideshowTimeout, slideshowInterval);
    }
  };

  const handleIntervalChange = (newInterval) => {
    setSlideshowInterval(newInterval * 1000); // Convert to milliseconds
    setSelectedInterval(newInterval);
  };

  const pauseSlideshow = () => {
    setSlideshowActive(false);
    setFullscreen(false);
  };

  const navigate = useNavigate();

  const fetchPosts = async () => {
    const postsRef = collection(db, "posts");
    const postsData = await getDocs(postsRef);

    const matchingUsers = [];
    postsData.forEach((doc) => {
      const ddata = doc.data();
      if (ddata.code == code) {
        matchingUsers.push({ id: doc.id, ...ddata });
      }
    });

    matchingUsers.sort((a, b) => new Date(b.date) - new Date(a.date));
    setPosts(matchingUsers);
  };

  const makePost = () => {
    navigate("/addpost");
  };

  const handleClose = () => {
    navigate("/photobook");
  };

  const viewFamily = () => {
    navigate("/family");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    // Fetch posts on component mount
    fetchPosts();

    // Set up a timer to fetch posts every 30 seconds
    const intervalId = setInterval(() => {
      fetchPosts();
    }, 30 * 1000);

    // Clean up the timer on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that this effect runs once on mount

  const handleEditPost = async (postId, currentCaption) => {
    setEditingPostId(postId);
    setEditedCaption(currentCaption);
  };

  const handleSaveEdit = async (postId) => {
    // Implement logic to update post in Firestore
    const postsRef = doc(db, "posts", postId);

    // Update the post with the new caption
    await updateDoc(postsRef, {
      caption: editedCaption,
    });

    fetchPosts();

    // Clear editing state
    setEditingPostId(null);
    setEditedCaption("");
  };

  const handleCancelEdit = () => {
    // Clear editing state
    setEditingPostId(null);
    setEditedCaption("");
  };

  const handleDeletePost = async (postId) => {
    // Implement logic to delete post from Firestore
    const confirmRemove = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmRemove) {
      const postsRef = doc(db, "posts", postId);

      // Delete the post
      await deleteDoc(postsRef);
      // Fetch posts again after deletion
      fetchPosts();
    }
  };

  const postContainer = {
    backgroundColor: "white",
    width: "50%",
    margin: "0 auto",
    padding: "20px",
    border: "5px solid #ccc",
    borderRadius: "10px",
    overflowY: "auto",
  };

  const postHeading = {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    padding: "10px 0",
  };

  const postItem = {
    sdisplay: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    border: "4px solid #eeee",
    padding: "10px",
    borderRadius: "5px",
  };

  const postImage = {
    width: "100%",
    height: "auto",
    maxHeight: "250px",
    objectFit: "contain",
    borderRadius: "5px",
  };

  const postDetails = {
    marginTop: "10px",
  };

  const postCaption = {
    fontSize: "16px",
    fontWeight: "normal",
    marginBottom: "5px",
  };

  const postDate = {
    fontSize: "14px",
    color: "#777",
  };

  const postEditButton = {
    padding: "5px 10px",
    margin: "3px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const postEditButton2 = {
    padding: "5px 10px",
    marginLeft: "350px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10 auto",
  };

  const postEditButton3 = {
    padding: "5px 10px",
    marginLeft: "437px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10s auto",
  };

  return (
    <div style={pageStyles}>
      <div onLoad={fetchPosts} style={postContainer}>
        {/* Display error message below the button */}
        {errorMessage && (
          <div style={{ color: "red", marginTop: "10px" }}>{errorMessage}</div>
        )}
        <button
          onClick={makePost}
          className="login-button"
        >
          Add Post
        </button>
        <button
          className="login-button"
          onClick={() =>
            slideshowActive ? pauseSlideshow() : startSlideshow()
          }
        >
          {slideshowActive ? "Pause Slideshow" : "Start Slideshow"}
        </button>
        <button
          className="login-button"
          onClick={viewFamily}
        >
          View Family
        </button>

        <div style = {{ marginLeft: '130px'}}>
          {[3, 5, 7, 10].map((interval) => (
            <button
              key={interval}
              style={{
                marginLeft: "5px",
                backgroundColor:
                  selectedInterval === interval ? "#ccc" : "transparent",
                border: "none",
              }}
              onClick={() => handleIntervalChange(interval)}
            >
              {`${interval}s`}
            </button>
          ))}
        </div>
        <h1 style={postHeading}>Posts</h1>
        {posts.map((post, index) => (
          <div key={post.id} style={postItem}>
            <img style={postImage} src={post.path} alt={`Post ${index}`} />
            <div style={postDetails}>
              {editingPostId === post.id ? (
                <div>
                  <input
                    type="text"
                    value={editedCaption}
                    onChange={(e) => setEditedCaption(e.target.value)}
                  />
                  <button
                    style={postEditButton}
                    onClick={() => handleSaveEdit(post.id)}
                  >
                    Save
                  </button>
                  <button style={postEditButton} onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <p style={postCaption}>{post.caption}</p>
                  <p style={postDate}>{post.date}</p>
                  <p style={postDate}>{"@" + post.author}</p>
                  {post.uid === uid && (
                    <>
                      <button
                        className="register-button"
                        style={postEditButton}
                        onClick={() => handleEditPost(post.id, post.caption)}
                      >
                        Edit Caption
                      </button>
                      <button
                        className="register-button"
                        style={postEditButton}
                        onClick={() => handleDeletePost(post.id)}
                      >
                        Delete Post
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {slideshowActive && fullscreen && (
          <Slideshow
            images={posts}
            currentSlide={currentSlide}
            intervalDuration={slideshowInterval}
            onNext={() =>
              setCurrentSlide((prevSlide) => (prevSlide + 1) % posts.length)
            }
            onPrev={() =>
              setCurrentSlide(
                (prevSlide) => (prevSlide - 1 + posts.length) % posts.length
              )
            }
            onClose={pauseSlideshow}
          />
        )}
        <button className="login-button" onClick={handleClose} style = {{marginLeft: '230px'}}>
          Close the Final Chapter
        </button>
      </div>
    </div>
  );
};

export default Post;
