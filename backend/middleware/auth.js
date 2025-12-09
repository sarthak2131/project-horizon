const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Temporarily disable auth guard (always allow)
// TODO: restore JWT verification when login is re-enabled
const authenticateToken = (req, res, next) => next();

module.exports = { authenticateToken, JWT_SECRET };


