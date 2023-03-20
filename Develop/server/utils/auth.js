const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'mysecret';

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: 3600 });
    req.user = data;
  } catch {
    console.log('Invalid token');
  }

  return req;
};

module.exports = { authMiddleware };
