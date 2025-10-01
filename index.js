const restify = require('restify');
const { Op } = require('sequelize');
const { IncomingForm } = require('formidable');
const { fetchAndMapRecipe, fetchAndMapRecipeByCategory, fetchAndMapRecipeByArea, fetchAndMapRecipeById, fetchAndMapRecipeByIngredient } = require('./services/mealdbService');
// Import models (with associations already set)
const { Recipe, Ingredient, Instruction, Bookmarks } = require('./models');
const fs = require('fs');
const os = require('os');
const path = require('path');
const server = restify.createServer({ name: 'RecipeAPI' });

server.use(restify.plugins.queryParser());
const bodyParser = restify.plugins.bodyParser();

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
server.post('/recipes',bodyParser, async (req, res) => {
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
          { tags: { [Op.like]: `%${criteria}%` } },
          {
            id: {
              [Op.in]: [
                // Subquery: get recipe IDs that have ingredients matching criteria
                ...(
                  await Ingredient.findAll({
                    where: { name: { [Op.like]: `%${criteria}%` } },
                    attributes: ['recipe_id'],
                    raw: true
                  })
                ).map(ing => ing.recipe_id)
              ]
            }
          }
        ]
      },
      include: [
        { model: Ingredient, as: 'ingredients' },
        { 
          model: Instruction, 
          as: 'instructions',
          separate: true,
          order: [['step', 'ASC']]
        }
      ],
      distinct: true
    });

    // If query param external=true, fetch from TheMealDB and append to results
    if (external === 'true') {
      // Fetch by name/description/tags (original)
      const externalRecipesByName = await fetchAndMapRecipe(criteria);
      // Fetch by ingredient
      const externalRecipesByIngredient = await fetchAndMapRecipeByIngredient(criteria);
      // Combine and deduplicate by id
      const allExternal = [...externalRecipesByName, ...externalRecipesByIngredient];
      // Remove duplicates by id
      const uniqueExternal = Object.values(
        allExternal.reduce((acc, recipe) => {
          acc[recipe.id] = recipe;
          return acc;
        }, {})
      );
      if (uniqueExternal.length > 0) {
        recipes = recipes.concat(uniqueExternal);
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


// Image upload endpoint



const userHome = os.homedir();
const uploadDir = path.join(userHome, 'dishcovery', 'recipe', 'images');

server.post('/upload', (req, res, next) => {

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    multiples: false
  });

  form.parse(req, (err, fields, files) => {
    console.log("form parsing");
    console.log("fields:", fields);
    console.log("files:", files);

    if (err) {
      console.error('Form parse error:', err);
      res.send(500, { error: err.message });
      return next();
    }

    // Formidable stores files in an array
    const fileArray = files.image;
    if (!fileArray || fileArray.length === 0) {
      res.send(400, { message: 'No image file uploaded' });
      return next();
    }

    const file = fileArray[0]; // take the first uploaded file
    const fileName =
      Date.now() + '_' + path.basename(file.originalFilename).replace(/\s+/g, '_');
    const newPath = path.join(uploadDir, fileName);

    fs.rename(file.filepath, newPath, (err) => {
      if (err) {
        res.send(500, { error: err.message });
        return next();
      }

      res.send({
        message: 'Image uploaded successfully',
        url: '/images/' + fileName 
      });
      return next();
    });
  });

});

// Serve uploaded images
server.get('/images/:filename', (req, res, next) => {
  const filePath = path.join(uploadDir, req.params.filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.send(404, { message: 'File not found' });
      return next();
    }

    // Set content type from file extension
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    if (ext === '.png') contentType = 'image/png';
    if (ext === '.gif') contentType = 'image/gif';

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);

    stream.on('end', () => next());
    stream.on('error', (err) => {
      res.send(500, { error: err.message });
      next();
    });
  });
});


server.get('/bookmarks', async (req, res) => {
  try {
    const bookmarks = await Bookmarks.findAll({
      include: [
        {
          model: Recipe,
          as: 'recipe',
          include: [
            { model: Ingredient, as: 'ingredients' },
            { model: Instruction, as: 'instructions', order: [['step', 'ASC']] }
          ]
        }
      ]
    });
    res.send(bookmarks);
  } catch (err) {
    res.send(500, { error: err.message });
  }
});

// Add a bookmark
server.post('/bookmarks',bodyParser, async (req, res) => {
  try {
    const { recipe_id } = req.body;
    if (!recipe_id) {
      res.send(400, { message: 'Missing recipe_id' });
      return;
    }

    // Ensure recipe exists
    const recipe = await Recipe.findByPk(recipe_id);
    if (!recipe) {
      res.send(404, { message: 'Recipe not found' });
      return;
    }

    const bookmark = await Bookmarks.create({ recipe_id });
    res.send(201, bookmark);
  } catch (err) {
    res.send(500, { error: err.message });
  }
});

// Delete a bookmark
server.del('/bookmarks/:id', async (req, res) => {
  try {
    const bookmark = await Bookmarks.findByPk(req.params.id);
    if (!bookmark) {
      res.send(404, { message: 'Bookmark not found' });
      return;
    }
    await bookmark.destroy(); // soft delete if paranoid:true
    res.send(200, { message: 'Bookmark deleted' });
  } catch (err) {
    res.send(500, { error: err.message });
  }
});


server.get('/bookmarks/check/:recipeId', async (req, res) => {
  try {
    const { recipeId } = req.params;

    const bookmark = await Bookmarks.findOne({
      where: { recipe_id: recipeId }
    });

    if (bookmark) {
      res.send({ isBookmarked: true, bookmarkId: bookmark.id });
    } else {
      res.send({ isBookmarked: false });
    }
  } catch (err) {
    res.send(500, { error: err.message });
  }
});


server.listen(3000, "localhost", () => {
  console.log("Running at http://localhost:3000");
});