import Users from './Users';
import Categories from './Categories';
import Products from './Products';
import CategorysProduct from './CategoryProduct';
import Events from './Events';

const models = {};

export const initModels = (sequelize) => {
  const User = sequelize.define('user', Users, {
    createdAt: false,
    updatedAt: false,
  });
  const Category = sequelize.define('category', Categories, {
    createdAt: false,
    updatedAt: false,
  });
  const Product = sequelize.define('product', Products, {
    createdAt: false,
    updatedAt: false,
  });
  const Event = sequelize.define('event', Events, {
    createdAt: false,
    updatedAt: false,
  });
  const CategoryProduct = sequelize.define(
    'category_product',
    CategorysProduct,
    {
      createdAt: false,
      updatedAt: false,
    },
  );
  Category.belongsToMany(Product, { through: CategoryProduct, as: 'products' });
  Product.belongsToMany(Category, {
    through: CategoryProduct,
    as: 'categories',
  });

  models.user = User;
  models.category = Category;
  models.product = Product;
  models.event = Event;
  models.category_product = CategoryProduct;
};

export const getModel = (modelName) => models?.[modelName];

export default initModels;
