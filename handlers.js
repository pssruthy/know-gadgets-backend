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
  res.send({ id: lastId });
};

module.exports = {
  getGadgets,
  getGadgetDetails,
  getReviews,
  addReview,
  addGadget,
};
