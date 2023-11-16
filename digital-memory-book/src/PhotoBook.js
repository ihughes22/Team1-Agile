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
import "./PhotoBook.css"; // Import the CSS file

const PhotoBook = ({ isAuth }) => {
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
    const intervalId = setInterval(() => {
      fetchPosts();
    }, 30 * 1000 * 60);
    return () => clearInterval(intervalId);
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

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
    <div id="post-container" onLoad={fetchPosts}>
      <h1 className="post-heading">Photobook</h1>
      {currentPosts.map((post) => (
        <div key={post.id} className="post-item">
          <img className="post-image" src={post.path} alt="Post" />
          <div className="post-details">
            <p className="post-caption">{post.caption}</p>
            <p className="post-date">{post.date}</p>
          </div>
        </div>
      ))}
      <div className="pagination">
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
