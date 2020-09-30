const config = require('../config');
const authUtils = require('./authUtils');
const { generateSessionId } = require('./session');

const getRating = (reviewDetails) => {
  const totalRating = reviewDetails.reduce(
    (context, { rating }) => context + rating,
    0
  );
  const ratingCount = reviewDetails.length;
  const avgRating = totalRating / ratingCount;
  const rating = isNaN(avgRating) ? 0 : avgRating;
  return { rate: Math.round(rating * 10) / 10, ratingCount };
};

const getGadgets = (req, res) => {
  const gadgets = req.app.locals.gadgets;
  const reviews = req.app.locals.reviews;
  const gadgetDetails = gadgets.map((gadget) => {
    return { ...gadget, ...getRating(reviews[gadget.id]) };
  });
  res.send(JSON.stringify({ gadgets: gadgetDetails.reverse() }));
};

const getGadgetDetails = (req, res) => {
  const { id } = req.params;
  const details = req.app.locals.gadgets.find(
    (detail) => `${detail.id}` === `${id}`
  );
  const review = req.app.locals.reviews[details.id];
  res.send(JSON.stringify({ ...details, ...getRating(review) }));
};

const getReviews = (req, res) => {
  const { id } = req.params;
  const reviewsOfGadget = req.app.locals.reviews[id];
  res.send(JSON.stringify({ reviews: reviewsOfGadget }));
};

const addReview = (req, res) => {
  const { id, rating, review } = req.body;
  const { user } = req;
  const reviewList = req.app.locals.reviews;
  reviewList.lastId = reviewList.lastId + 1;
  reviewList[id].push({
    id: reviewList.lastId,
    rating,
    review,
    user,
  });
  req.app.locals.db.setReviews(reviewList);
  res.end();
};

const addGadget = (req, res) => {
  const details = req.body;
  const { gadgets, gadgetLastId, reviews } = req.app.locals;
  const lastId = gadgetLastId + 1;

  const { img } = req.files || { image: {} };
  const imageName = `image-${lastId}.jpg`;
  const location = `./public/assets/${imageName}`;
  img.mv && img.mv(location);

  req.app.locals.gadgetLastId = lastId;
  gadgets.push({
    ...details,
    id: lastId,
    imgUrl: `/assets/${imageName}`,
  });
  reviews[lastId] = [];
  req.app.locals.db.setGadgetLastId(lastId);
  req.app.locals.db.setGadgets(gadgets);
  req.app.locals.db.setReviews(reviews);
  res.send({ id: lastId });
};

const getAuthLink = (req, res) => {
  const link = config.getAuthLink();
  res.send({ link });
};

const confirmUser = (req, res) => {
  const { code } = req.query;
  authUtils
    .getAccessToken(code)
    .then(authUtils.getUserDetail)
    .then(({ login, avatar_url }) => {
      const user = req.app.locals.users[login];
      if (!user) {
        req.app.locals.users[login] = { user: login, avatar_url };
        req.app.locals.db.setUsers(req.app.locals.users);
      }
      const session = generateSessionId();
      req.app.locals.sessions[session] = login;
      res.cookie('sId', session);
      res.redirect(process.env.REDIRECTION_URL);
    });
};

const authorizeUser = function (req, res, next) {
  const sessions = req.app.locals.sessions;
  const user = sessions[req.cookies.sId];
  if (!user) {
    res.sendStatus(401);
    res.end();
    return;
  }
  req.user = user;
  next();
};

const getUser = (req, res) => {
  const user = req.user;
  const userDetails = req.app.locals.users[user];
  res.send({ details: userDetails });
};

const logout = (req, res) => {
  const { sessions } = req.app.locals;
  const sId = req.cookies.sId;
  delete sessions[sId];
  res.clearCookie('sId');
  res.end();
};

module.exports = {
  getGadgets,
  getGadgetDetails,
  getReviews,
  addReview,
  addGadget,
  getAuthLink,
  confirmUser,
  authorizeUser,
  getUser,
  logout,
};
