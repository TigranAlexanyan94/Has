import express from 'express';
import userRoute from './userRoute';
import categoryRoute from './categoryRoute';
import productRoute from './productRoute';
import eventRouter from './eventRoute';

const router = express.Router();

router.use('/login', userRoute);
router.use('/category', categoryRoute);
router.use('/product', productRoute);
router.use('/event', eventRouter);

export default router;
