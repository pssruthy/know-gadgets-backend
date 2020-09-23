const express = require('express');

const app = express();
app.use(express.json());

const handlers = require('./handlers');
const { reviews, gadgets } = require('./data.json');
app.locals.gadgets = gadgets;
app.locals.reviews = reviews;

app.get('/api/getGadgets', handlers.getGadgets);
app.get('/api/getGadgetDetails/:id', handlers.getGadgetDetails);
app.get('/api/getReviews/:id', handlers.getReviews);

module.exports = app;
