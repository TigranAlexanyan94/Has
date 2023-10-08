import { DataTypes } from 'sequelize';

const Events = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  repeat: {
    type: DataTypes.STRING,
  },
};

export default Events;
