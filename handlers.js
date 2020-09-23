const getGadgets = (req, res) => {
  res.send(JSON.stringify({ gadgets: req.app.locals.gadgets }));
};

const getGadgetDetails = (req, res) => {
  const { id } = req.params;
  const details = req.app.locals.gadgets.find(
    (detail) => `${detail.id}` === `${id}`
  );
  res.send(JSON.stringify(details));
};

const getReviews = (req, res) => {
  const { id } = req.params;
  const reviewsOfGadget = req.app.locals.reviews[id];
  res.send(JSON.stringify({ reviews: reviewsOfGadget }));
};

module.exports = { getGadgets, getGadgetDetails, getReviews };
