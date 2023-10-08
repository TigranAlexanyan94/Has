import express from 'express';
import {
  productsController,
  getProductsById,
  getProductByNameController,
  createProductController,
  updateProductController,
  deleteProuductController,
} from '../controllers/productsController';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/title', verifyToken, getProductByNameController);
router.get('/', verifyToken, productsController);
router.get('/:id', getProductsById);
router.post('/', verifyToken, createProductController);
router.put('/:id', verifyToken, updateProductController);
router.delete('/:id', verifyToken, deleteProuductController);

export default router;
