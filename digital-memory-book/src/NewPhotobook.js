import React, { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";
import "./BookExample.css"; // Import the CSS file
import backgroundImage from './Photos/triangle-mosaic.png';

const NewBookExample = ({ isAuth }) => {
  const pageStyles = {
    textAlign: 'center',
    padding: '20px',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: '500px 500px',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    height: '100vh',
  };

  const PageCover = React.forwardRef((props, ref) => (
    <div className="cover" ref={ref} data-density="hard">
      <div>
        <h2>{props.children}</h2>
      </div>
    </div>
  ));

  const Page = React.forwardRef(({ post, number }, ref) => (
    <div className="page" ref={ref}>
      <h1>Page Header</h1>
      <p>{number}</p>
      <div id="post-container" onLoad={fetchPosts}>
        <h1 className="post-heading">Photobook</h1>
        {post ? (
          <div key={post.id} className="post-item">
            <img className="post-image" src={post.path} alt="Post" />
            <div className="post-details">
              <p className="post-caption">{post.caption}</p>
              <p className="post-date">{post.date}</p>
            </div>
          </div>
        ) : (
          <p>No post available for this page</p>
        )}
      </div>
    </div>
  ));
  
  

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [code, setCode] = useState(localStorage.getItem("code") || "");
  const [uid, setUid] = useState(localStorage.getItem("uid") || "");
  const postsPerPage = 1;

  const fetchPosts = async () => {
    try {
      const postsRef = collection(db, "posts");
      const postsData = await getDocs(postsRef);
      const matchingUsers = postsData
        .filter(doc => doc.data().code === code)
        .map(doc => ({ id: doc.id, ...doc.data() }));

      matchingUsers.sort((a, b) => new Date(b.date) - new Date(a.date));
      setPosts(matchingUsers);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    const intervalId = setInterval(fetchPosts, 30 * 1000 * 60);
    return () => clearInterval(intervalId);
  }, [code]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const [inputText, setInputElement] = useState("");
  const [text, setText] = useState("sample text");

  const printText = () => {
    setText(inputText);
    setInputElement("");
  };

  const TotalPages = 10;
  const contentPageNumbers = Array.from({ length: TotalPages }, (_, index) => index + 1);

  return (
    <div>
      <HTMLFlipBook
        width={550}
        height={650}
        minWidth={315}
        maxWidth={1000}
        minHeight={420}
        maxHeight={1350}
        showCover={true}
        flippingTime={1000}
        style={{ margin: "0 auto" }}
        maxShadowOpacity={0.5}
        className="album-web"
      >
        <PageCover>Front Cover</PageCover>

        {contentPageNumbers.map((pageNumber, index) => (
        <Page key={pageNumber} post={posts[index]} number={pageNumber} />
        ))}

        <PageCover>Back Cover</PageCover>
      </HTMLFlipBook>
    </div>
  );
};

export default NewBookExample;
