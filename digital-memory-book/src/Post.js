import React from 'react';
import './Post.css';

const Post = ({ item, index }) => {
  return (
    <div key={index} className="post">
      <img src={URL.createObjectURL(item.image)} alt={`Image ${index}`} className="postImage" />
      <span className="postDesc">
        {item.description}
      </span>
    </div>
  );
};

export default Post;