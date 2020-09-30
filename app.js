const express = require('express');
const redis = require('redis');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const handlers = require('./src/handlers');
const Db = require('./db');

const app = express();
const REDIS_URL = process.env.REDIS_URL || 6379;
const redisClient = redis.createClient(REDIS_URL);
const db = new Db(redisClient);

app.locals.db = db;
app.locals.sessions = {};

db.getGadgets().then((gadgets) => {
  app.locals.gadgets = gadgets || [];
});

db.getReviews().then((reviews) => {
  app.locals.reviews = reviews || {};
});

db.getUsers().then((users) => {
  app.locals.users = users || {};
});

db.getGadgetLastId().then((lastId) => {
  app.locals.gadgetLastId = lastId || 0;
});

app.locals.sessions = {};

app.use(express.json());
app.use(express.static('build'));
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
