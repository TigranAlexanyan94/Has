import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../configs/loggers';
import { getModel } from '../models/index';

dotenv.config();
const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
};

const loginController = async (req, res) => {
  try {
    const { name, password } = req.body;

    const User = getModel('user');
    const userInfo = await User.findOne({
      where: { name },
    });

    if (!userInfo) {
      return res.json({ message: 'User not found ' });
    }

    const userPassword = userInfo.password;
    const userId = userInfo.id;
    const userRole = userInfo.role;

    const validPassword = bcrypt.compareSync(password, userPassword);
    if (!validPassword) {
      return res.json({ message: 'Incorrect password' });
    }
    const token = generateAccessToken(userId, userRole);
    res.json({ token });
  } catch (err) {
    logger.error(err.message);
    res.status(401).json({ message: 'Authentication error' });
  }
};

export default loginController;
