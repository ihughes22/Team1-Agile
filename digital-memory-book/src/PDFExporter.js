import React from 'react';
import { render, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import { createRoot } from 'react-dom/client';


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

// Create Document Component
const MyDocument = () => (
    <PDFViewer>
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
  </PDFViewer>
);

// const testRender = () => {
//     // use react createRoot to render component on the client side
//     const container = document.getElementById('test');
//     const root = createRoot(container);
//     root.render(<MyDocument />);
// // );
// }

const testRender = async () => {
    // Render the component to a PDF
    const pdfBlob = await render(<MyDocument />).toBlob();
  
    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = 'document.pdf';
  
    // Append the link to the document and trigger the click event
    document.body.appendChild(downloadLink);
    downloadLink.click();
  
    // Remove the link from the document
    document.body.removeChild(downloadLink);
  };

export default testRender;
