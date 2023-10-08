import { getModel } from '../models/index';
import logger from '../configs/loggers';

export const categoriesController = async (req, res) => {
  try {
    const Category = getModel('category');
    const categoryData = await Category.findAll();
    const subCat = categoryData.reduce((acc, item) => {
      const subCategories = categoryData.filter(
        (cat) => cat.parentId === item.id,
      );
      acc[item.id] = {
        id: item.id,
        parentId: item.parentId ? item.parentId : null,
        name: item.name,
        sub: subCategories,
      };
      return acc;
    }, {});

    logger.info('Successfully get all categories.');
    res.json(subCat);
  } catch (err) {
    logger.error(err.message);
    return res.status(500).json({ message: 'Categories not found.' });
  }
};

export const getCategoryByNameController = async (req, res) => {
  try {
    const Category = getModel('category');
    const { name } = req.query;
    const categoryName = await Category.findOne({
      where: { name },
    });

    res.status(200).json(categoryName);
  } catch (err) {
    logger.error(err.message);
    return res.status(500).json({ message: 'Category not found.' });
  }
};

export const createCategoryController = async (req, res) => {
  try {
    const Category = getModel('category');
    const catTitle = { name: req.body.name, parentId: req.body.parentId };
    const newCategory = await Category.create(catTitle);
    res.status(201).json({
      data: { ...newCategory.dataValues, parentId: catTitle.parentId },
      success: `${newCategory.dataValues} Successful created new Category.`,
    });
  } catch (err) {
    logger.error(err.message);
    return res
      .status(500)
      .json({ message: 'Some error occurred while creating a category.' });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const Category = getModel('category');
    const catId = req.params.id;
    const updateTitle = req.body;
    const updatedCatgory = await Category.update(updateTitle, {
      where: { id: catId },
    });

    res.json({
      data: { ...updatedCatgory.dataValues, name: updateTitle.name, id: catId },
      message: `${updatedCatgory} Category was updated successfully.`,
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: 'Cannot update category.' });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const Category = getModel('category');
    const catId = req.params.id;
    const deletedCategory = await Category.destroy({
      where: { id: catId },
    });

    if (deletedCategory === 1) {
      res.json({
        data: { ...deletedCategory.dataValues, id: catId },
        message: 'Category was deleted successfully!',
      });
    } else {
      res.status(400).json({
        message: 'Cannot delete category maybe category was not found!',
      });
    }
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      message: 'Could not delete category.',
    });
  }
};
