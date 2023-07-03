const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'h1*alumni'; // Replace with your secret key

const login = async (db, email, password) => {
  const userQuery = 'SELECT * FROM users WHERE email = $1';
  const userResult = await db.query(userQuery, [email]);
  const user = userResult.rows[0];

  if (!user || !user.approved) {
    return 'Invalid email or account not approved';
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return 'Invalid email or password';
  }

  const token = generateToken(user.id, user.admin);

  return token;
};

const generateToken = (userId, isAdmin) => {
  const payload = { userId, isAdmin };
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secretKey, options);
};

module.exports = {
  login,
};
