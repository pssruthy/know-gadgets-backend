const express = require('express');

const app = express();
app.use(express.json());

app.get('/api/message', (req, res) => {
  res.send(JSON.stringify({ message: 'hai' }));
});

module.exports = app;
