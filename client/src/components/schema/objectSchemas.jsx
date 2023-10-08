import PropTypes from 'prop-types';

const categoriesObjectSchemas = {
  title: PropTypes.string,
  id: PropTypes.number,
  parentId: PropTypes.number,
  sub: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.number,
      parentId: PropTypes.number,
    }),
  ),
};

export default { categoriesObjectSchemas };
