import React from 'react';
import { PDFViewer, Page, Text, View, Document, StyleSheet, BlobProvider } from '@react-pdf/renderer';
import PostUploader from './PostUploader';
import TimelineUrl from './TimelineUrl';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component - Need to integrate with timeline later
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>

//// Getting a confusing issue with basename and useContext
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//       <PostUploader />
//       </View>
//     </Page>
//   </Document>
);

const PDFGenerator = () => (
  <BlobProvider document={<MyDocument />}>
    {({ blob, url, loading, error }) => {
      if (loading) {
        return <p>Loading...</p>;
      }

      if (error) {
        return <p>Error generating PDF: {error.toString()}</p>;
      }

      // Render a download link when the PDF is ready
      return (
        <a href={url} download="document.pdf">
          Download PDF
        </a>
      );
    }}
  </BlobProvider>
);

const PDFExporter = () => (
  <div>
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <MyDocument />
    </PDFViewer>
    <PDFGenerator />
  </div>
);

export default PDFExporter;
