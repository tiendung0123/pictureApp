import jwt from 'jsonwebtoken';

const secretKey = 'jwt_secret'; 

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

export { generateToken, verifyToken };
