import HTMLFlipBook from "react-pageflip";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import "./BookExample.css";

const PageCover = React.forwardRef((props, ref) => (
  <div className="cover" ref={ref} data-density="hard">
    <div>
      <h2>{props.children}</h2>
    </div>
  </div>
));

const Page = React.forwardRef(({ fetchData }, ref) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const postsRef = collection(db, "posts");
        const postsData = await getDocs(postsRef);
        const allPosts = [];

        postsData.forEach((doc) => {
          const ddata = doc.data();
          allPosts.push({ id: doc.id, ...ddata });
        });

        allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(allPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <div className="page" ref={ref}>
      <h1>Page Header</h1>
      {posts.map((post) => (
        <div key={post.id} className="post-item">
          <img className="post-image" src={post.path} alt="Post" />
          <div className="post-details">
            <p className="post-caption">{post.caption}</p>
            <p className="post-date">{post.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
});

function BookExample(props) {
  // Set the desired number of content pages
  const numberOfPages = 10;

  // Create an array of page numbers for content pages
  const contentPageNumbers = Array.from({ length: numberOfPages }, (_, index) => index + 1);

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
        <PageCover>Front Cover</PageCover>

        {/* Content Pages */}
        {contentPageNumbers.map((pageNumber) => (
          <Page key={pageNumber} />
        ))}

        {/* Back Cover */}
        <PageCover>Back Cover</PageCover>
      </HTMLFlipBook>
    </div>
  );
}

export default BookExample;
