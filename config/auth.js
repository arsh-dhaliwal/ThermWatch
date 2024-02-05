const { auth } = require('express-openid-connect');

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_DOMAIN
};

// Middleware to configure Auth0 with Express
const authMiddleware = auth(authConfig);

module.exports = { authConfig, authMiddleware };