import React, { useState, useEffect } from "react";
import {
  setDoc,
  getDocs,
  updateDoc,
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
} from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";

const PhotoBook = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 1;

  const fetchPosts = async () => {
    const postsRef = collection(db, "posts");
    const postsData = await getDocs(postsRef);
    const postsArray = postsData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    postsArray.sort((a, b) => new Date(b.date) - new Date(a.date));

    setPosts(postsArray);
  };

  useEffect(() => {
    fetchPosts();
    const intervalId = setInterval(
      () => {
        fetchPosts();
      },
      30 * 1000 * 60
    );
    return () => clearInterval(intervalId);
  }, []);

  const postContainer = {
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
    display: "flex",
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

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(posts.length / postsPerPage);
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div onLoad={fetchPosts} style={postContainer}>
      <h1 style={postHeading}>Photobook</h1>
      {currentPosts.map((post) => (
        <div key={post.id} style={postItem}>
          <img style={postImage} src={post.path} alt="Post" />
          <div style={postDetails}>
            <p style={postCaption}>{post.caption}</p>
            <p style={postDate}>{post.date}</p>
          </div>
        </div>
      ))}
      <div style={{ textAlign: "center" }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastPost >= posts.length}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default PhotoBook;
