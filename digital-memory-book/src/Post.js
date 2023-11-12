import React, { useState, useEffect } from 'react';
import {
  setDoc,
  getDocs,
  updateDoc,
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore
} from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedCaption, setEditedCaption] = useState('');

  const navigate = useNavigate();

  const fetchPosts = async () => {
    const postsRef = collection(db, 'posts');
    const postsData = await getDocs(postsRef);
    const postsArray = postsData.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    postsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
    setPosts(postsArray);
  };

  const makePost = () => {
    navigate('/addpost');
  };

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
    const postsRef = doc(db, 'posts', postId);

    // Update the post with the new caption
    await updateDoc(postsRef, {
      caption: editedCaption,
    });

    fetchPosts();

    // Clear editing state
    setEditingPostId(null);
    setEditedCaption('');
  };

  const handleCancelEdit = () => {
    // Clear editing state
    setEditingPostId(null);
    setEditedCaption('');
  };

  const handleDeletePost = async (postId) => {
    // Implement logic to delete post from Firestore
    const postsRef = doc(db, 'posts', postId);

    // Delete the post
    await deleteDoc(postsRef);
    // Fetch posts again after deletion
    fetchPosts();
  };

  const postContainer = {
    width: '50%',
    margin: '0 auto', 
    padding: '20px',
    border: '5px solid #ccc',
    borderRadius: '10px',
    overflowY: 'auto',
  };

  const postHeading = {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '10px 0',
  };

  const postItem = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    border: '4px solid #eeee',
    padding: '10px',
    borderRadius: '5px',
  };
  
  const postImage = {
    width: '100%',
    height: 'auto',
    maxHeight: '250px',
    objectFit: 'contain',
    borderRadius: '5px',
  };
  
  const postDetails = {
    marginTop: '10px',
  };
  
  const postCaption = {
    fontSize: '16px',
    fontWeight: 'normal',
    marginBottom: '5px',
  };
  
  const postDate = {
    fontSize: '14px',
    color:'#777',
  };
  
  const postEditButton ={
    padding: '5px 10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div onLoad={fetchPosts} style={postContainer}>
      <button
        onClick={makePost}
        style={{
          padding: '5px 10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Add Post
      </button>
      <h1 style={postHeading}>Posts</h1>
      {posts.map((post) => (
        <div key={post.id} style={postItem}>
          <img style={postImage} src={post.path} alt="Post" />
          <div style={postDetails}>
            {editingPostId === post.id ? (
              <div>
                <input
                  type="text"
                  value={editedCaption}
                  onChange={(e) => setEditedCaption(e.target.value)}
                />
                <button style = {postEditButton} onClick={() => handleSaveEdit(post.id)}>Save</button>
                <button style = {postEditButton} onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <p style={postCaption}>{post.caption}</p>
                <p style={postDate}>{post.date}</p>
                <button
                  style={postEditButton}
                  onClick={() => handleEditPost(post.id, post.caption)}
                >
                  Edit Caption
                </button>
                <button style={postEditButton} onClick={() => handleDeletePost(post.id)}>
                  Delete Post
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;