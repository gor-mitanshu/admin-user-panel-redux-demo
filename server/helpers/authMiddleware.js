const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
     const token = req.header('Authorization');
     if (!token) {
          return res.status(401).send({ success: false, message: 'Unauthorized: No valid token provided' });
     }

     try {
          const tokenToVerify = token.startsWith('Bearer ') ? token.slice(7) : token;
          const decoded = jwt.verify(tokenToVerify, process.env.JWT_SECRET);

          const currentTimestamp = Math.floor(Date.now() / 1000);
          if (decoded.exp && decoded.exp < currentTimestamp) {
               return res.status(401).send({ success: false, message: 'Unauthorized: Token expired. Please Login again.' });
          }

          req.user = decoded;
          next();
     } catch (error) {
          console.error('Error in token verification:', error);
          if (error.name === 'TokenExpiredError') {
               return res.status(401).send({ success: false, message: 'Unauthorized: Token expired' });
          } else {
               return res.status(401).send({ success: false, message: 'Unauthorized: Invalid token' });
          }
     }
};

module.exports = verifyToken;
