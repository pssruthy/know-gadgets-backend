const express = require('express');

const app = express();
app.use(express.json());

const { reviews, gadgets } = require('./data.json');
app.locals.gadgets = gadgets;
app.locals.reviews = reviews;

app.get('/api/getGadgets', (req, res) => {
  res.send(JSON.stringify({ gadgets: app.locals.gadgets }));
});

app.get('/api/getGadgetDetails/:id', (req, res) => {
  const { id } = req.params;
  const details = app.locals.gadgets.find(
    (detail) => `${detail.id}` === `${id}`
  );
  res.send(JSON.stringify(details));
});

module.exports = app;
