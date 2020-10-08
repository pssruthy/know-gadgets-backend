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

const getDropboxAccessToken = () => {
  return env.DROPBOX_ACCESS_TOKEN;
};

module.exports = {
  getClientId,
  getClientSecret,
  getAuthLink,
  getDropboxAccessToken,
};
