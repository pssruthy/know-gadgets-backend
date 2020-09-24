const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

const handlers = require('./handlers');
const { reviews, gadgets, gadgetLastId } = require('./data.json');
app.locals.gadgets = gadgets;
app.locals.reviews = reviews;
app.locals.gadgetLastId = gadgetLastId;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.get('/api/getGadgets', handlers.getGadgets);
app.get('/api/getGadgetDetails/:id', handlers.getGadgetDetails);
app.get('/api/getReviews/:id', handlers.getReviews);

app.post('/api/addReview', handlers.addReview);
app.post('/api/addGadget', handlers.addGadget);

module.exports = app;
