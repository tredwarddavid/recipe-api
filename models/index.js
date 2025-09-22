const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');
const Instruction = require('./Instruction');
require('./associations'); // This will run associations setup

module.exports = {
  Recipe,
  Ingredient,
  Instruction,
};
