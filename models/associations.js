const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');
const Instruction = require('./Instruction');

Recipe.hasMany(Ingredient, { foreignKey: 'recipe_id', as: 'ingredients' });
Ingredient.belongsTo(Recipe, { foreignKey: 'recipe_id', as: 'recipe' });

Recipe.hasMany(Instruction, { foreignKey: 'recipe_id', as: 'instructions' });
Instruction.belongsTo(Recipe, { foreignKey: 'recipe_id', as: 'recipe' });

module.exports = { Recipe, Ingredient, Instruction };
