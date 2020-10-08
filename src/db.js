class Db {
  constructor(client) {
    this.client = client;
  }

  getGadgets() {
    return new Promise((res, rej) => {
      this.client.get('gadgets', (err, value) => {
        if (err) rej(err);
        res(JSON.parse(value));
      });
    });
  }

  setGadgets(gadgets) {
    return new Promise((res, rej) => {
      this.client.set('gadgets', JSON.stringify(gadgets), (err) => {
        if (err) rej(err);
        res();
      });
    });
  }

  getReviews() {
    return new Promise((res, rej) => {
      this.client.get('reviews', (err, value) => {
        if (err) rej(err);
        res(JSON.parse(value));
      });
    });
  }

  setReviews(reviews) {
    return new Promise((res, rej) => {
      this.client.set('reviews', JSON.stringify(reviews), (err) => {
        if (err) rej(err);
        res();
      });
    });
  }

  getUsers() {
    return new Promise((res, rej) => {
      this.client.get('users', (err, value) => {
        if (err) rej(err);
        res(JSON.parse(value));
      });
    });
  }

  setUsers(users) {
    return new Promise((res, rej) => {
      this.client.set('users', JSON.stringify(users), (err) => {
        if (err) rej(err);
        res();
      });
    });
  }

  getGadgetLastId() {
    return new Promise((res, rej) => {
      this.client.get('gadgetLastId', (err, value) => {
        if (err) rej(err);
        res(JSON.parse(value));
      });
    });
  }

  setGadgetLastId(id) {
    return new Promise((res, rej) => {
      this.client.set('gadgetLastId', id, (err) => {
        if (err) rej(err);
        res();
      });
    });
  }
}

module.exports = Db;
