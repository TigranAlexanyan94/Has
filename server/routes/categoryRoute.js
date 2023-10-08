import express from 'express';
import {
  categoriesController,
  getCategoryByNameController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from '../controllers/categoriesController';

import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/', categoriesController);
router.get('/:title', getCategoryByNameController);
router.post('/', verifyToken, createCategoryController);
router.put('/:id', verifyToken, updateCategoryController);
router.delete('/:id', verifyToken, deleteCategoryController);

export default router;
