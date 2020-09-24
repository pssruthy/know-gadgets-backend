const generateSessionId = () => {
  const id1 = Date.now().toString(36).slice(0, 4);
  const id2 = Math.random().toString(36).substr(2, 5);
  return id1 + id2;
};

module.exports = { generateSessionId };
