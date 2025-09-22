const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Ingredient = sequelize.define('Ingredient', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.STRING },
  unit: { type: DataTypes.STRING },
  recipe_id: { type: DataTypes.UUID, allowNull: false },
}, {
  timestamps: true,
  tableName: 'ingredient',
  paranoid: true,
  deletedAt: 'deleted_at',
});

module.exports = Ingredient;
