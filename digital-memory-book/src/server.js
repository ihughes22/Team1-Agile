// server.js
const express = require('express');
const { render } = require('@react-pdf/renderer');
const { createServer } = require('http');

const app = express();
const server = createServer(app);

const PORT = process.env.PORT || 3001;

// Your PDF rendering logic
const generatePDF = async () => {
  const pdfBlob = await render(<YourPDFComponent />).toBlob();
  return pdfBlob;
};

// API endpoint to generate and return the PDF
app.get('/api/render-pdf', async (req, res) => {
  try {
    const pdfBlob = await generatePDF();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=example.pdf');
    res.send(pdfBlob);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
