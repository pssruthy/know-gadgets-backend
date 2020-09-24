require('dotenv').config();

const { env } = process;

const getClientId = () => {
  const clientId = env.CLIENT_ID;
  return clientId;
};

const getClientSecret = () => {
  const clientSecret = env.CLIENT_SECRET;
  return clientSecret;
};

const getAuthLink = () => {
  let authLink = 'https://github.com/login/oauth/authorize?client_id=';
  authLink = env.AUTH_HREF || `${authLink}${getClientId()}`;
  return authLink;
};

module.exports = {
  getClientId,
  getClientSecret,
  getAuthLink,
};
