const restify = require('restify');
const { Op } = require('sequelize');
const { fetchAndMapRecipe, fetchAndMapRecipeByCategory, fetchAndMapRecipeByArea, fetchAndMapRecipeById } = require('./services/mealdbService');
// Import models (with associations already set)
const { Recipe, Ingredient, Instruction } = require('./models');

const server = restify.createServer({ name: 'RecipeAPI' });

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser()); // needed for POST/PUT

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
      // Try external API if not found locally
      const externalRecipe = await fetchAndMapRecipeById(req.params.id);
      if (!externalRecipe) {
        res.send(404, { message: 'Recipe not found' });
        return;
      }
      res.send(externalRecipe);
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
    // Create Recipe first
    const recipe = await Recipe.create({
      name,
      description,
      category,
      cuisine,
      tags,
      image_url,
      youtube_url,
      shared
    });

    // Create Ingredients
    if (Array.isArray(ingredients)) {
      for (const ing of ingredients) {
        await Ingredient.create({
          name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit,
          recipe_id: recipe.id
        });
      }
    }

    // Create Instructions
    if (Array.isArray(instructions)) {
      for (const inst of instructions) {
        await Instruction.create({
          step: inst.step,
          description: inst.description,
          recipe_id: recipe.id
        });
      }
    }

    // Return the full recipe with associations
    const fullRecipe = await Recipe.findByPk(recipe.id, {
      include: [
        { model: Ingredient, as: 'ingredients' },
        { model: Instruction, as: 'instructions', order: [['step', 'ASC']] }
      ]
    });
    res.send(201, fullRecipe);
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

// Search recipes by name, description or tags
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
          { tags: { [Op.like]: `%${criteria}%` } }
        ]
      },
      include: [
        { model: Ingredient, as: 'ingredients' },
        { model: Instruction, as: 'instructions', order: [['step', 'ASC']] }
      ]
    });

    // If query param external=true, fetch from TheMealDB and append to results
    if (external === 'true') {
      const externalRecipes = await fetchAndMapRecipe(criteria);
      if (externalRecipes && externalRecipes.length > 0) {
        recipes = recipes.concat(externalRecipes);
      }
    }
    res.send(recipes);
  } catch (err) {
    res.send(500, { error: err.message });
  }
});

// Search recipes by category
server.get('/recipes/searchByCategory', async (req, res) => {
  try {
    const { category, external } = req.query;
    if (!category) {
      res.send(400, { message: 'Missing category query' });
      return;
    }
    let recipes = await Recipe.findAll({
      where: {
        category: { [Op.like]: `%${category}%` }
      },
      include: [
        { model: Ingredient, as: 'ingredients' },
        { model: Instruction, as: 'instructions', order: [['step', 'ASC']] }
      ]
    });

    // If query param external=true, fetch from TheMealDB and append to results
    if (external === 'true') {
      const externalRecipes = await fetchAndMapRecipeByCategory(category);
      if (externalRecipes && externalRecipes.length > 0) {
        recipes = recipes.concat(externalRecipes);
      }
    }
    res.send(recipes);
  } catch (err) {
    res.send(500, { error: err.message });
  }
});

// Search recipes by cuisine/area
server.get('/recipes/searchByCuisine', async (req, res) => {
  try {
    const { cuisine, external } = req.query;
    if (!cuisine) {
      res.send(400, { message: 'Missing cuisine query' });
      return;
    }
    let recipes = await Recipe.findAll({
      where: {
        cuisine: { [Op.like]: `%${cuisine}%` }
      },
      include: [
        { model: Ingredient, as: 'ingredients' },
        { model: Instruction, as: 'instructions', order: [['step', 'ASC']] }
      ]
    });

    // If query param external=true, fetch from TheMealDB and append to results
    if (external === 'true') {
      const externalRecipes = await fetchAndMapRecipeByArea(cuisine);
      if (externalRecipes && externalRecipes.length > 0) {
        recipes = recipes.concat(externalRecipes);
      }
    }
    res.send(recipes);
  } catch (err) {
    res.send(500, { error: err.message });
  }
});

server.listen(3000, "localhost", () => {
  console.log("Running at http://localhost:3000");
});

// Image upload endpoint
const os = require('os');
const path = require('path');
const fs = require('fs');

server.post('/upload', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      res.send(400, { message: 'No image file uploaded' });
      return;
    }
    const imageFile = req.files.image;
    const userHome = os.homedir();
    const uploadDir = path.join(userHome, 'dishcovery', 'recipe', 'images');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const fileName = Date.now() + '_' + imageFile.name.replace(/\s+/g, '_');
    const filePath = path.join(uploadDir, fileName);
    // Save file
    fs.writeFileSync(filePath, imageFile.data);
    res.send({ message: 'Image uploaded successfully', path: filePath });
  } catch (err) {
    res.send(500, { error: err.message });
  }
});

