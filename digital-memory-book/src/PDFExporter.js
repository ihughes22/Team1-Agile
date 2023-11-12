import React from 'react';
import { PDFViewer, Page, Text, View, Image, Document, StyleSheet, BlobProvider } from '@react-pdf/renderer';

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

// Create Document Component - Need to write a version for timeline later
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.postStyle}>
        <Image style={styles.postImageStyle} src="/Photos/unknown2.jpg"/>
        <Text style={styles.postDescStyle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dolor quam, faucibus semper tortor a, bibendum tincidunt purus. Proin ullamcorper purus non sagittis commodo. In hac habitasse platea dictumst. Duis feugiat,           </Text>
      </View>
      <View style={styles.postStyle}>
        <Image style={styles.postImageStyle} src="https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?cs=srgb&dl=pexels-roberto-nickson-2486168.jpg&fm=jpg"/>
        <Text style={styles.postDescStyle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dolor quam, faucibus semper tortor a, bibendum tincidunt purus. Proin ullamcorper purus non sagittis commodo. In hac habitasse platea dictumst. Duis feugiat,           </Text>
      </View>
      <Text style={styles.pageNum}>Page 1</Text>
    </Page>
  </Document>
);

const PDFExporter = () => (
  <div>
    <PDFViewer class="center" style={{height: '100vh', width: "100%"}}>
      <MyDocument />
    </PDFViewer>
  </div>
);

export default PDFExporter;
