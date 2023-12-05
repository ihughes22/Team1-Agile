import HTMLFlipBook from "react-pageflip";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import "./BookExample.css";
import "./PhotoBook.css"
import { useNavigate } from "react-router-dom";

const PageCover = React.forwardRef((props, ref) => (
  <div className="cover" ref={ref} data-density="hard">
    <div>
      <h2 style = {{marginTop: '150px'}}>{props.children}</h2>
    </div>
  </div>
));

const Page = React.forwardRef(({ fetchData }, ref) => {
  return (
    <div className="page" ref={ref}>
    </div>
  );
});

function BookExample(props) {
  const [posts, setPosts] = useState([]);
  const [code, setCode] = useState(localStorage.getItem("code"));
  const [contentPageNumbers, setNums] = useState([]);
  
  const [numofpages, setPages] = useState(0);
  const [webName, setWebName] = useState(localStorage.getItem("webName"));

  const fetchAllPosts = async () => {
    try {
      const postsRef = collection(db, "posts");
      const postsData = await getDocs(postsRef);
      const allPosts = [];

      postsData.forEach((doc) => {
        const ddata = doc.data();
        if(ddata.code == code){
          allPosts.push({ id: doc.id, ...ddata });
          setPages(numofpages + 1);
        }
      });

      allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      setPosts(allPosts);
      setNums(Array.from({ length: allPosts.length }, (_, index) => index + 1));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };


  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetchAllPosts();

    const intervalId = setInterval(() => {
      fetchAllPosts();
    }, 30 * 60 * 1000);

    // Clean up the timer on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if(posts.length > 0 && posts.length == contentPageNumbers.length && contentPageNumbers.length > 0){
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
          {/* Front Cover */}
          <PageCover>{webName}: A Digital Memory Book</PageCover>
  
          {/* Content Pages */}
          {contentPageNumbers.map((pageNumber) => (
            <div className="page">
            <div key={posts[pageNumber-1].id} className="post-item">
              <img className="post-image" src={posts[pageNumber-1].path} alt="Post" />
              <div className="post-details">
                <p className="post-caption">{posts[pageNumber-1].caption}</p>
                <p className="post-date">{posts[pageNumber-1].date}</p>
              </div>
            </div>
            </div>
          ))}
  
          {/* Back Cover */}
          <PageCover>The End</PageCover>
        </HTMLFlipBook>
      </div>
    );
  }
}

export default BookExample;
