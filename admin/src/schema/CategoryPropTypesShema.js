import PropTypes from 'prop-types';

const SubObject = PropTypes.shape({
  title: PropTypes.string,
  id: PropTypes.number,
  parentId: PropTypes.number,
})

export default SubObject;
