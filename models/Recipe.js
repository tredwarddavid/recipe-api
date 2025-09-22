const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Recipe = sequelize.define('Recipe', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  category: { type: DataTypes.STRING },
  cuisine: { type: DataTypes.STRING },
  tags: { type: DataTypes.STRING },
  image_url: { type: DataTypes.STRING },
  youtube_url: { type: DataTypes.STRING },
}, {
  timestamps: true,
  tableName: 'recipe',
  paranoid: true,
  deletedAt: 'deleted_at',
});

module.exports = Recipe;
