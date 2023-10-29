import React from 'react';

const Post = ({ item, index }) => {
  const postStyle = {
    border: '2px solid black',
    borderRadius: '5px',
    padding: '10px',
    display: 'flex',
    wordWrap: 'break-word',
    maxWidth: 'max-content',
    margin: '15px'
  };

  const postImageStyle = {
    border: '5px solid #fff',
    borderRadius: '4px',
    maxHeight: '150px',
    maxWidth: '400px',
    height: 'auto',
    marginRight: '40px',
    boxShadow: '0 4px 4px rgb(0 0 0 / 0.4)'
  };

  const postDescStyle = {
    verticalAlign: 'top', 
    flex: '1', 
    width: '250px', 
    height: '145px'

  }

  return (
    <div key={index} style={postStyle}>
      <img src={URL.createObjectURL(item.image)} alt={`Image ${index}`} style={postImageStyle} />
      <span style={postDescStyle}>
        {item.description}
      </span>
    </div>
  );
};

export default Post;