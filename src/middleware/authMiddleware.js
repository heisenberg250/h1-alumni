const jwt = require('jsonwebtoken');
const secretKey = 'h1*alumni'; // Replace with your secret key

const authenticateUser = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const token = authorization.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.userId = decodedToken.userId;
    req.isAdmin = decodedToken.isAdmin;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const authenticateAdmin = (req, res, next) => {
  if (!req.isAdmin) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }
  next();
};

module.exports = {
  authenticateUser,
  authenticateAdmin,
};
