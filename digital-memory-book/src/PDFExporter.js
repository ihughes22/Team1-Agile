import React, { useState, useEffect } from "react";
import { PDFViewer, Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4'
  },
  postImageStyle: {
    border: '5px solid #fff',
    maxHeight: '300px',
    maxWidth: '300px',
    height: 'auto',
    marginRight: '40px',
  },
  postStyle: {
    flexDirection: 'row',
    border: '2px solid black',
    padding: '10px',
    // maxWidth: 'max-content',
    margin: '15px',
    margin: 10,
    padding: 10,
  },
  postDescStyle: {
    fontSize: '20px',
    width: '250px', 
  },
  postDateStyle: {
    fontSize: "10px",
    color: "#777",
  },
  pageNum: {
    position: 'absolute',
    fontSize: 16,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  }
});

const PDFExporter = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data } = useParams();
  const decodedData = decodeURIComponent(data);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (state && state.posts) {
      setPosts(state.posts);
    } else {
      try {
        const parsedData = JSON.parse(decodedData);
        setPosts(parsedData);
      } catch (error) {
        console.error('Error parsing JSON data:', error);
      }
    }
  }, [decodedData, state]);

  const MyDocument = () => (
    <Document>
      {posts.map((post, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <View style={styles.postStyle}>
            <Image style={styles.postImageStyle} src={post.path} />
            <Text style={styles.postDescStyle}>
              {post.caption}
            </Text>
            <Text style={styles.postDateStyle}>
              {post.date}
            </Text>
          </View>
          <Text style={styles.pageNum}>Page {index}</Text>
        </Page>
      ))}
    </Document>
  );

  return (
    <div>
      <PDFViewer className="center" style={{ height: '100vh', width: "100%" }}>
        <MyDocument />
      </PDFViewer>
    </div>
  );
}

export default PDFExporter;
