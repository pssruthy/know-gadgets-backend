const express = require('express');

const app = express();
app.use(express.json());

app.locals.gadgets = [
  {
    id: 1,
    manufacturer: 'JBL',
    gadget: 'Headphone',
    model: 'TFNAS',
    imgUrl:
      'https://images-na.ssl-images-amazon.com/images/I/612Rldd5TuL._SL1500_.jpg',
    rate: 3,
    ratingCount: 16,
  },
  {
    id: 2,
    manufacturer: 'Boat',
    gadget: 'Headphone',
    model: 'ITF 457',
    rate: 5,
    imgUrl:
      'https://vlebazaar.in/image/cache/catalog//B01M9C51T9/boAt-BassHeads-225-in-Ear-Super-Extra-Bass-Headphones-Black-B01M9C51T9-1500x1500.jpg',
    ratingCount: 1,
  },
  {
    id: 3,
    manufacturer: 'Whirlpool',
    gadget: 'Washing machine',
    model: '33',
    rate: 3,
    imgUrl:
      'https://image1.pricedekho.com/p/61/8/28/61828/160482-whirlpool-agitronic-702sd-top-load-automatic-7-kg-washing-machine-black-chrome-picture-large.jpg',
    ratingCount: 10,
  },
  {
    id: 4,
    manufacturer: 'Samsung',
    gadget: 'Smartphone',
    model: 'A51',
    rate: 4,
    imgUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61sAKMokIUL._AC_SL1000_.jpg',
    ratingCount: 20,
  },
];

app.get('/api/getGadgets', (req, res) => {
  res.send(JSON.stringify({ gadgets: app.locals.gadgets }));
});

module.exports = app;
