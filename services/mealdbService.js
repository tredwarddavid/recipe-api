const axios = require('axios');

/**
 * Fetches a meal from TheMealDB and maps it to the Recipe model format.
 * @param {string} searchTerm - The meal name to search for.
 * @returns {Promise<Object|null>} - Mapped recipe object or null if not found.
 */
async function fetchAndMapRecipe(searchTerm) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`;
  const response = await axios.get(url);
  const meals = response.data.meals;
  if (!meals || meals.length === 0) return [];

  return meals.map(meal => {
    // Map ingredients as associated Ingredient model
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredientName = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredientName && ingredientName.trim()) {
        let quantity = '';
        let unit = '';
        if (measure && measure.trim()) {
          // Smart split: match leading number(s) and fraction(s) as quantity, rest as unit
          // Examples: '1 cup', '1 1/2 cup', '2 tbsp', '1/4 tsp', '1 large egg'
          const match = measure.trim().match(/^((?:\d+\s)?\d*\/?\d*)(.*)$/);
          if (match) {
            quantity = match[1].trim();
            unit = match[2].trim();
          } else {
            quantity = measure.trim();
            unit = '';
          }
        }
        ingredients.push({
          name: ingredientName.trim(),
          quantity,
          unit,
        });
      }
    }

    // Map instructions as associated Instruction model
    const instructionsArr = [];
    if (meal.strInstructions) {
      const steps = meal.strInstructions.split(/\r?\n|\.\s/).filter(s => s.trim());
      steps.forEach((desc, idx) => {
        instructionsArr.push({
          step: idx + 1,
          description: desc.trim(),
        });
      });
    }

    return {
      id: meal.idMeal,
      name: meal.strMeal,
      description: meal.strMeal,
      category: meal.strCategory,
      cuisine: meal.strArea,
      tags: meal.strTags,
      image_url: meal.strMealThumb,
      youtube_url: meal.strYoutube,
      ingredients,
      instructions: instructionsArr,
    };
  });
}

/**
 * Fetches meals by category from TheMealDB and maps to minimal Recipe format.
 * @param {string} category - The meal category to filter by.
 * @returns {Promise<Array>} - Array of mapped recipe objects.
 */
async function fetchAndMapRecipeByCategory(category) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`;
  const response = await axios.get(url);
  const meals = response.data.meals;
  if (!meals || meals.length === 0) return [];

  return meals.map(meal => ({
    id: meal.idMeal,
    name: meal.strMeal,
    image_url: meal.strMealThumb,
  }));
}

module.exports = { fetchAndMapRecipe, fetchAndMapRecipeByCategory };
/**
 * Fetches meals by area from TheMealDB and maps to minimal Recipe format.
 * @param {string} area - The meal area/cuisine to filter by.
 * @returns {Promise<Array>} - Array of mapped recipe objects.
 */
async function fetchAndMapRecipeByArea(area) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(area)}`;
  const response = await axios.get(url);
  const meals = response.data.meals;
  if (!meals || meals.length === 0) return [];

  return meals.map(meal => ({
    id: meal.idMeal,
    name: meal.strMeal,
    image_url: meal.strMealThumb,
  }));
}

module.exports = { fetchAndMapRecipe, fetchAndMapRecipeByCategory, fetchAndMapRecipeByArea };
/**
 * Fetches a meal by id from TheMealDB and maps it to the Recipe model format.
 * @param {string} id - The meal id to look up.
 * @returns {Promise<Object|null>} - Mapped recipe object or null if not found.
 */
async function fetchAndMapRecipeById(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`;
  const response = await axios.get(url);
  const meals = response.data.meals;
  if (!meals || meals.length === 0) return null;

  // Use the same mapping logic as fetchAndMapRecipe for a single meal
  const meal = meals[0];
  // Map ingredients as associated Ingredient model
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientName = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredientName && ingredientName.trim()) {
      let quantity = '';
      let unit = '';
      if (measure && measure.trim()) {
        const match = measure.trim().match(/^((?:\d+\s)?\d*\/?\d*)(.*)$/);
        if (match) {
          quantity = match[1].trim();
          unit = match[2].trim();
        } else {
          quantity = measure.trim();
          unit = '';
        }
      }
      ingredients.push({
        name: ingredientName.trim(),
        quantity,
        unit,
      });
    }
  }

  // Map instructions as associated Instruction model
  const instructionsArr = [];
  if (meal.strInstructions) {
    // Smarter split: use \r\n as step delimiter, trim each step
    const steps = meal.strInstructions.split(/\r\n/).map(s => s.trim()).filter(s => s);
    steps.forEach((desc, idx) => {
      // Remove leading number and tab, e.g. '0.\t'
      const cleanedDesc = desc.replace(/^\d+\.\t\s*/, '');
      instructionsArr.push({
        step: idx + 1,
        description: cleanedDesc,
      });
    });
  }

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    description: meal.strMeal,
    category: meal.strCategory,
    cuisine: meal.strArea,
    tags: meal.strTags,
    image_url: meal.strMealThumb,
    youtube_url: meal.strYoutube,
    ingredients,
    instructions: instructionsArr,
  };
}

/**
 * Fetches recipes by ingredient from TheMealDB and maps to Recipe format.
 * @param {string} ingredient - The ingredient to filter by.
 * @returns {Promise<Array>} - Array of mapped recipe objects.
 */
async function fetchAndMapRecipeByIngredient(ingredient) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`;
  const response = await axios.get(url);
  const meals = response.data.meals;
  if (!meals || meals.length === 0) return [];

  // For each meal, fetch full details and map
  const detailedRecipes = await Promise.all(
    meals.map(async meal => {
      const detailUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`;
      const detailResponse = await axios.get(detailUrl);
      const detailMeals = detailResponse.data.meals;
      if (!detailMeals || detailMeals.length === 0) return null;
      // Use the same mapping logic as fetchAndMapRecipe for a single meal
      const fullMeal = detailMeals[0];
      // Map ingredients as associated Ingredient model
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredientName = fullMeal[`strIngredient${i}`];
        const measure = fullMeal[`strMeasure${i}`];
        if (ingredientName && ingredientName.trim()) {
          let quantity = '';
          let unit = '';
          if (measure && measure.trim()) {
            const match = measure.trim().match(/^((?:\d+\s)?\d*\/?\d*)(.*)$/);
            if (match) {
              quantity = match[1].trim();
              unit = match[2].trim();
            } else {
              quantity = measure.trim();
              unit = '';
            }
          }
          ingredients.push({
            name: ingredientName.trim(),
            quantity,
            unit,
          });
        }
      }

      // Map instructions as associated Instruction model
      const instructionsArr = [];
      if (fullMeal.strInstructions) {
        const steps = fullMeal.strInstructions.split(/\r?\n|\.\s/).filter(s => s.trim());
        steps.forEach((desc, idx) => {
          instructionsArr.push({
            step: idx + 1,
            description: desc.trim(),
          });
        });
      }

      return {
        id: fullMeal.idMeal,
        name: fullMeal.strMeal,
        description: fullMeal.strMeal,
        category: fullMeal.strCategory,
        cuisine: fullMeal.strArea,
        tags: fullMeal.strTags,
        image_url: fullMeal.strMealThumb,
        youtube_url: fullMeal.strYoutube,
        ingredients,
        instructions: instructionsArr,
      };
    })
  );
  // Filter out any nulls (in case some lookups failed)
  return detailedRecipes.filter(r => r);
}

module.exports = { fetchAndMapRecipe, fetchAndMapRecipeByCategory, fetchAndMapRecipeByArea, fetchAndMapRecipeById, fetchAndMapRecipeByIngredient };
