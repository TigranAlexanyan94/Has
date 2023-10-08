import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../configs/loggers';

dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    if (req.headers.authorization === undefined) {
      return res
        .status(400)
        .json({ message: 'Authorization header is missing' });
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    logger.error(err.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default verifyToken;
