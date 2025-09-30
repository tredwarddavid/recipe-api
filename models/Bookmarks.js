const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Recipe = require('./Recipe');

const Bookmarks = sequelize.define('Bookmarks', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  recipe_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Recipe,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  timestamps: true,
  tableName: 'bookmarks',
  paranoid: true,
  deletedAt: 'deleted_at',
});

// Associations
Bookmarks.belongsTo(Recipe, { foreignKey: 'recipe_id', as: 'recipe' });

module.exports = Bookmarks;
