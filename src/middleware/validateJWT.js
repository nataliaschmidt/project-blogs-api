const { getPayload } = require('../auth/auth');

const extractToken = (bearerToken) => (bearerToken
  .includes(' ') ? bearerToken
  .split(' ')[1] : bearerToken);

const validateJwt = (req, res, next) => {
  const bearerToken = req.header('Authorization');

  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = extractToken(bearerToken);
  try {
    const payload = getPayload(token);
    req.payload = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJwt;