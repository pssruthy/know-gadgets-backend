const app = require('./app');

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
  res.send(JSON.stringify({ gadgets: gadgetDetails }));
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
  const reviewList = req.app.locals.reviews;
  reviewList.lastId = reviewList.lastId + 1;
  reviewList[id].push({
    id: reviewList.lastId,
    rating,
    review,
    user: 'sruthy',
  });
  res.end();
};

const addGadget = (req, res) => {
  const details = req.body;
  const { gadgets, gadgetLastId, reviews } = req.app.locals;
  const lastId = gadgetLastId + 1;
  req.app.locals.gadgetLastId = lastId;
  gadgets.push({
    ...details,
    id: lastId,
    imgUrl:
      'https://vlebazaar.in/image/cache/catalog//B01M9C51T9/boAt-BassHeads-225-in-Ear-Super-Extra-Bass-Headphones-Black-B01M9C51T9-1500x1500.jpg',
  });
  reviews[lastId] = [];
  res.send({ id: lastId });
};

module.exports = {
  getGadgets,
  getGadgetDetails,
  getReviews,
  addReview,
  addGadget,
};
