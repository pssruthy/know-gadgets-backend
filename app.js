const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = express();

const handlers = require('./src/handlers');
const { reviews, gadgets, gadgetLastId } = require('./data.json');
app.locals.gadgets = gadgets;
app.locals.reviews = reviews;
app.locals.gadgetLastId = gadgetLastId;
app.locals.sessions = {};
app.locals.users = {};

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use((req, res, next) => {
  console.log('METHOD : ', req.method, 'URL : ', req.url);
  next();
});
app.get('/callback', handlers.confirmUser);
app.get('/api/getAuthLink', handlers.getAuthLink);

app.use(handlers.authorizeUser);

app.get('/api/getGadgets', handlers.getGadgets);
app.get('/api/getGadgetDetails/:id', handlers.getGadgetDetails);
app.get('/api/getReviews/:id', handlers.getReviews);
app.get('/api/getUser', handlers.getUser);

app.post('/api/addReview', handlers.addReview);
app.post('/api/addGadget', handlers.addGadget);
app.get('/api/logout', handlers.logout);

module.exports = app;
