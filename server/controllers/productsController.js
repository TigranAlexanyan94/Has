import { getModel } from '../models/index';
import logger from '../configs/loggers';

export const productsController = async (req, res) => {
  try {
    const Products = getModel('product');
    const productsData = await Products.findAll();

    logger.info('Successfully get all products.');
    res.status(200).json(productsData);
  } catch (err) {
    logger.error(err.message);
    return res.status(500).json({ message: 'Products not found.' });
  }
};

export const getProductsById = async (req, res) => {
  try {
    const Category = getModel('category');
    const catId = req.params.id;
    const productsById = await Category.findOne({
      include: [
        {
          all: true,
        },
      ],
      where: { id: catId },
    });

    logger.info('Successfully get all products.');
    res.status(200).json(productsById);
  } catch (err) {
    logger.error(err.message);
    return res.status(500).json({ message: 'Products not found.' });
  }
};

export const getProductByNameController = async (req, res) => {
  try {
    const Product = getModel('product');
    const name = req.query.title;
    const productName = await Product.findOne({
      where: { name },
    });

    logger.info('Successfully get product.');
    res.status(200).json(productName);
  } catch (err) {
    logger.error(err.message);
    return res.status(500).json({ message: 'Product not found.' });
  }
};

export const createProductController = async (req, res) => {
  try {
    const Product = getModel('product');
    const productData = {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      description: req.body.description,
      status: req.body.status,
      categoryId: req.body.categoryId,
    };
    const newProduct = await Product.create(productData);

    res.status(201).json({ data: { ...newProduct.dataValues }, success: `Successful created new Product ${newProduct.name}`});
  } catch (err) {
    logger.error(err.message);
    return res
      .status(500)
      .json({ message: 'Some error occurred while creating a Product.' });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const Product = getModel('product');
    const productId = req.params.id;
    const updateProduct = req.body;
    const updatedProduct = await Product.update(updateProduct, {
      where: { id: productId },
    });

    res.json({
      data: { ...updateProduct, id: Number(productId)},
      message: `${updatedProduct} Product was updated successfully.`,
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: 'Cannot update product ' });
  }
};

export const deleteProuductController = async (req, res) => {
  try {
    const Product = getModel('product');
    const productId = req.params.id;
    const deletedProduct = await Product.destroy({
      where: { id: productId },
    });

    if (deletedProduct === 1) {
      res.json({
        data: { productId: Number(productId) },
        message: 'Product was deleted successfully!',
      });
    } else {
      res.status(400).json({
        message: 'Cannot delete product maybe category was not found!',
      });
    }
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      message: 'Could not delete product.',
    });
  }
};
