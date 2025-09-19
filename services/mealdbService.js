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
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const measure = meal[`strMeasure${i}`];
      const ingredient = meal[`strIngredient${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`.trim());
      }
    }
    return {
      id: meal.idMeal,
      name: meal.strMeal,
      instructions: meal.strInstructions,
      category: meal.strCategory,
      cuisine: meal.strArea,
      tags: meal.strTags,
      image_url: meal.strMealThumb,
      youtube_url: meal.strYoutube,
      ingredients: ingredients.join('\n'),
      description: meal.strMeal,
    };
  });
}

module.exports = { fetchAndMapRecipe };
