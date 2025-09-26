const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Ingredients = sequelize.define('Ingredients', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING(50),
  },
}, {
  timestamps: true,
  tableName: 'ingredients',
  paranoid: true,
  deletedAt: 'deleted_at',
});

module.exports = Ingredients;
