const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Instruction = sequelize.define('Instruction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  recipe_id: { type: DataTypes.UUID, allowNull: false },
  step: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.TEXT },
}, {
  timestamps: true,
  tableName: 'instruction',
  paranoid: true,
  deletedAt: 'deleted_at',
});

module.exports = Instruction;
