const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to handle JSON body parsing
app.use(express.json());

// Serve static files (for the front-end HTML and assets)
app.use(express.static('public'));

// Endpoint to get video data
app.get('/store.json', (req, res) => {
  fs.readFile(path.join(__dirname, 'store.json'), (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load video data' });
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint to save video data
app.post('/store.json', (req, res) => {
  const videoData = req.body;

  fs.writeFile(path.join(__dirname, 'store.json'), JSON.stringify(videoData, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save video data' });
    }
    res.status(200).json({ message: 'Video data saved' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
