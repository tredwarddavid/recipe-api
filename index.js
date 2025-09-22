const restify = require('restify');
const server = restify.createServer({ name: 'RecipeAPI' });

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser()); // needed for POST/PUT

// Import models (with associations already set)
const { Recipe, Ingredient, Instruction } = require('./models');

// Get all recipes
server.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      include: [
        { model: Ingredient, as: 'ingredients' },
        { model: Instruction, as: 'instructions', order: [['step', 'ASC']] }
      ],
    });
    res.send(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
});

// Get a recipe by id
server.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id, {
      include: [
        { model: Ingredient, as: 'ingredients' },
        { model: Instruction, as: 'instructions', order: [['step', 'ASC']] }
      ],
    });
    if (!recipe) {
      res.send(404, { message: 'Recipe not found' });
      return;
    }
    res.send(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
});


// Create a new recipe
server.post('/recipes', async (req, res) => {
  try {
    const {
      name,
      description,
      ingredients,
      instructions,
      category,
      cuisine,
      tags,
      image_url,
      youtube_url,
      shared
    } = req.body;
    if (!name || !ingredients || !instructions) {
      res.send(400, { message: 'Missing required fields' });
      return;
    }
    const recipe = await Recipe.create({
      name,
      description,
      ingredients,
      instructions,
      category,
      cuisine,
      tags,
      image_url,
      youtube_url,
      shared
    });
    res.send(201, recipe);
  } catch (err) {
    res.send(500, { error: err.message });
  }
});

// Update a recipe
server.put('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      res.send(404, { message: 'Recipe not found' });
      return;
    }
    const {
      name,
      description,
      ingredients,
      instructions,
      category,
      cuisine,
      tags,
      image_url,
      youtube_url,
      shared
    } = req.body;
    await recipe.update({
      name,
      description,
      ingredients,
      instructions,
      category,
      cuisine,
      tags,
      image_url,
      youtube_url,
      shared
    });
    res.send(recipe);
  } catch (err) {
    res.send(500, { error: err.message });
  }
});

// Delete a recipe
server.del('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      res.send(404, { message: 'Recipe not found' });
      return;
    }
    await recipe.destroy(); // This will soft delete with paranoid
    res.send(200, { message: 'Recipe soft deleted' });
  } catch (err) {
    res.send(500, { error: err.message });
  }
});


const { Op } = require('sequelize');

// Search recipes by name, description, ingredients, or tags
const { fetchAndMapRecipe } = require('./services/mealdbService');
server.get('/recipes/search', async (req, res) => {
  try {
    const { criteria, external } = req.query;
    if (!criteria) {
      res.send(400, { message: 'Missing search query' });
      return;
    }
    let recipes = await Recipe.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${criteria}%` } },
          { description: { [Op.like]: `%${criteria}%` } },
          { ingredients: { [Op.like]: `%${criteria}%` } },
          { tags: { [Op.like]: `%${criteria}%` } }
        ]
      }
    });

    // If query param external=true, fetch from TheMealDB and append to results
    if (external === 'true') {
      const externalRecipe = await fetchAndMapRecipe(criteria);
      if (externalRecipe) {
        recipes.push(externalRecipe);
      }
    }
    res.send(recipes);
  } catch (err) {
    res.send(500, { error: err.message });
  }
});

server.listen(3000, () => {
  console.log('%s listening at %s', server.name, server.url);
});
