const http = require('http');
const fs = require('fs');
const express = require('express');
const PDFDocument = require('pdfkit');

const app = express();

// Serve HTML file
app.get('/html', (req, res) => {
  fs.readFile('sample.html', (err, data) => {
    if (err) {
      res.status(500).send('Error loading HTML file');
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.send(data);
    }
  });
});

// Serve CSV file
app.get('/csv', (req, res) => {
  fs.readFile('sample.csv', (err, data) => {
    if (err) {
      res.status(500).send('Error loading CSV file');
    } else {
      res.setHeader('Content-Type', 'text/csv');
      res.send(data);
    }
  });
});

// Serve JSON file
app.get('/json', (req, res) => {
  fs.readFile('sample.json', (err, data) => {
    if (err) {
      res.status(500).send('Error loading JSON file');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    }
  });
});

// Generate and serve a PDF file
app.get('/pdf', (req, res) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=sample.pdf');
  doc.pipe(res);

  doc.text('Hello, this is a sample PDF file.');
  doc.end();
});

// Start the server
const server = http.createServer(app);
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
