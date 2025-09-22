const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient');
const Instruction = require('../models/Instruction');

const seedData = [
      {
        title: 'Tomato Egg Stir-fry',
        desc: 'A classic, quick Chinese dish.',
        img: 'https://www.andy-cooks.com/cdn/shop/articles/20231103000214-andy-20cooks-20-20tomato-20egg-20stir-fry.jpg?v=1699253089&width=1600',
        ingredients: [
          { name: "tomato", qty: 2, unit: "pcs" },
          { name: "egg", qty: 3, unit: "pcs" },
          { name: "oil", qty: 1, unit: "tbsp" },
          { name: "salt", qty: 1, unit: "to taste" },
          { name: "sugar", qty: 1, unit: "tsp" }
        ],
        steps: [
          'Cut tomatoes into small pieces.',
          'Beat eggs with a pinch of salt.',
          'Heat oil in a pan, scramble eggs, then set aside.',
          'Stir-fry tomatoes until soft, add sugar and salt.',
          'Add eggs back, mix well, and serve.'
        ]
      },
      {
        title: 'Pad Thai',
        desc: 'A flavorful Thai stir-fried noodle dish with eggs, protein, vegetables and peanuts.',
        img: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Phat_Thai_kung_Chang_Khien_street_stall.jpg',  // example pad thai image
        ingredients: [
          { name: "rice noodles", qty: 8, unit: "oz" },
          { name: "oil", qty: 3, unit: "tbsp" },
          { name: "garlic", qty: 3, unit: "cloves" },
          { name: "shrimp", qty: 8, unit: "oz" },
          { name: "egg", qty: 2, unit: "pcs" },
          { name: "bean sprouts", qty: 1, unit: "cup" },
          { name: "bell pepper", qty: 1, unit: "pcs" },
          { name: "green onion", qty: 3, unit: "pcs" },
          { name: "peanut", qty: 0.5, unit: "cup" },
          { name: "lime", qty: 2, unit: "pcs" },
          { name: "cilantro", qty: 0.5, unit: "cup" },
          { name: "fish sauce", qty: 3, unit: "tbsp" },
          { name: "soy sauce", qty: 1, unit: "tbsp" },
          { name: "sugar", qty: 5, unit: "tbsp" },
          { name: "vinegar", qty: 2, unit: "tbsp" },
          { name: "sriracha", qty: 1, unit: "tbsp" }
        ],
        steps: [
          'Cook noodles and set aside.',
          'Mix sauce with fish sauce, soy sauce, sugar, vinegar, and sriracha.',
          'Cook protein and garlic in oil.',
          'Scramble eggs, then combine.',
          'Add noodles and sauce, toss together.',
          'Add bean sprouts, peanuts, green onions, cilantro, lime.'
        ]
      },
      {
        title: 'Chicken Curry',
        desc: 'A rich and aromatic curry with spices, chicken, and creamy sauce.',
        img: 'https://www.foodandwine.com/thmb/8YAIANQTZnGpVWj2XgY0dYH1V4I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spicy-chicken-curry-FT-RECIPE0321-58f84fdf7b484e7f86894203eb7834e7.jpg',  // example chicken curry image
        ingredients: [
          { name: "coriander", qty: 1.5, unit: "tsp" },
          { name: "cumin", qty: 1, unit: "tsp" },
          { name: "turmeric", qty: 0.5, unit: "tsp" },
          { name: "cinnamon", qty: 0.5, unit: "tsp" },
          { name: "clove", qty: 0.25, unit: "tsp" },
          { name: "salt", qty: 1, unit: "to taste" },
          { name: "oil", qty: 2, unit: "tbsp" },
          { name: "onion", qty: 1, unit: "pcs" },
          { name: "garlic", qty: 3, unit: "cloves" },
          { name: "ginger", qty: 1, unit: "inch" },
          { name: "chicken", qty: 2, unit: "pcs" },
          { name: "tomato", qty: 1, unit: "cup" },
          { name: "chicken broth", qty: 1, unit: "cup" },
          { name: "cream", qty: 0.5, unit: "cup" },
          { name: "cilantro", qty: 1, unit: "tbsp" }
        ],
        steps: [
          'Sauté onion, garlic, ginger in oil.',
          'Add chicken and sear.',
          'Stir in spices and tomato.',
          'Add broth, simmer until cooked.',
          'Stir in cream and simmer.',
          'Garnish with cilantro and serve.'
        ]
      },
      {
        title: 'Spaghetti Bolognese',
        desc: 'Classic Italian pasta with meat sauce.',
        img: 'https://supervalu.ie/image/var/files/real-food/recipes/Uploaded-2020/spaghetti-bolognese-recipe.jpg',  // from Unsplash “two plates spaghetti” :contentReference[oaicite:0]{index=0}
        ingredients: [
          { name: "spaghetti", qty: 400, unit: "g" },
          { name: "ground beef", qty: 500, unit: "g" },
          { name: "onion", qty: 1, unit: "pcs" },
          { name: "garlic", qty: 2, unit: "cloves" },
          { name: "tomato sauce", qty: 2, unit: "cups" },
          { name: "carrot", qty: 1, unit: "pcs" },
          { name: "celery", qty: 1, unit: "stalk" },
          { name: "oil", qty: 2, unit: "tbsp" },
          { name: "salt", qty: 1, unit: "to taste" },
          { name: "pepper", qty: 1, unit: "to taste" }
        ],
        steps: [
          'Cook spaghetti according to package instructions.',
          'Sauté onion, garlic, carrot, celery in oil.',
          'Add ground beef, cook until browned.',
          'Pour in tomato sauce, simmer 20 minutes.',
          'Serve sauce over spaghetti.'
        ]
      },
      {
        title: 'Caesar Salad',
        desc: 'A crisp salad with romaine, croutons, and parmesan.',
        img: 'https://www.cuisinart.com/dw/image/v2/ABAF_PRD/on/demandware.static/-/Sites-us-cuisinart-sfra-Library/default/dw92573286/images/recipe-Images/classic-caesar-salad-recipe.jpg?sw=1200&sh=1200&sm=fit',  // example Caesar salad image
        ingredients: [
          { name: "romaine", qty: 1, unit: "head" },
          { name: "crouton", qty: 1, unit: "cup" },
          { name: "parmesan", qty: 0.5, unit: "cup" },
          { name: "caesar dressing", qty: 0.5, unit: "cup" },
          { name: "chicken", qty: 200, unit: "g" }
        ],
        steps: [
          'Chop romaine.',
          'Grill chicken and slice.',
          'Mix lettuce with dressing.',
          'Top with croutons, parmesan, and chicken.'
        ]
      },
      {
        title: 'Pancakes',
        desc: 'Fluffy breakfast pancakes.',
        img: 'https://www.marthastewart.com/thmb/Vgb9cQSlegZz5fcoSbkkqyHPmHY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/338185-basic-pancakes-09-00b18f8418fd4e52bb2050173d083d04.jpg',  // example pancakes image
        ingredients: [
          { name: "flour", qty: 1, unit: "cup" },
          { name: "milk", qty: 1, unit: "cup" },
          { name: "egg", qty: 1, unit: "pcs" },
          { name: "sugar", qty: 2, unit: "tbsp" },
          { name: "baking powder", qty: 2, unit: "tsp" },
          { name: "butter", qty: 2, unit: "tbsp" },
          { name: "salt", qty: 0.25, unit: "tsp" }
        ],
        steps: [
          'Mix dry ingredients.',
          'Whisk in milk, egg, melted butter.',
          'Cook on greased pan until golden.'
        ]
      },
      {
        title: 'Guacamole',
        desc: 'Mexican avocado dip.',
        img: 'https://www.giallozafferano.com/images/255-25549/Guacamole_650x433_wm.jpg',  // example guac image
        ingredients: [
          { name: "avocado", qty: 2, unit: "pcs" },
          { name: "lime", qty: 1, unit: "pcs" },
          { name: "onion", qty: 0.25, unit: "pcs" },
          { name: "tomato", qty: 1, unit: "pcs" },
          { name: "cilantro", qty: 2, unit: "tbsp" },
          { name: "salt", qty: 1, unit: "to taste" }
        ],
        steps: [
          'Mash avocados.',
          'Mix in lime juice, chopped onion, tomato, cilantro.',
          'Add salt and serve.'
        ]
      },
      {
        title: 'Fried Rice',
        desc: 'Quick stir-fried rice with vegetables and egg.',
        img: 'https://fullofplants.com/wp-content/uploads/2020/05/sweet-and-sour-spicy-thai-fried-rice-easy-vegan-meal-with-vegetables-thumb.jpg',  // example fried rice image
        ingredients: [
          { name: "rice", qty: 3, unit: "cups" },
          { name: "egg", qty: 2, unit: "pcs" },
          { name: "carrot", qty: 1, unit: "pcs" },
          { name: "pea", qty: 0.5, unit: "cup" },
          { name: "soy sauce", qty: 2, unit: "tbsp" },
          { name: "oil", qty: 2, unit: "tbsp" },
          { name: "green onion", qty: 2, unit: "pcs" }
        ],
        steps: [
          'Scramble eggs, set aside.',
          'Stir-fry carrot and peas.',
          'Add rice and soy sauce.',
          'Stir in eggs and green onion.'
        ]
      },
      {
        title: 'Miso Soup',
        desc: 'Traditional Japanese soup with tofu and seaweed.',
        img: 'https://sudachirecipes.com/wp-content/uploads/2021/11/homemade-miso-soup-thumb.png',  // example miso soup image
        ingredients: [
          { name: "miso paste", qty: 3, unit: "tbsp" },
          { name: "dashi broth", qty: 4, unit: "cups" },
          { name: "tofu", qty: 200, unit: "g" },
          { name: "seaweed", qty: 2, unit: "tbsp" },
          { name: "green onion", qty: 2, unit: "pcs" }
        ],
        steps: [
          'Heat dashi broth.',
          'Add miso paste and dissolve.',
          'Add tofu and seaweed.',
          'Top with green onion.'
        ]
      },
      {
        title: 'Grilled Cheese Sandwich',
        desc: 'Crispy bread with melted cheese.',
        img: 'https://californiaavocado.com/wp-content/uploads/2023/04/AvoBaconGrilledCheese_0011-scaled-e1682914545487.jpg',  // example grilled cheese image
        ingredients: [
          { name: "bread", qty: 2, unit: "slices" },
          { name: "cheese", qty: 2, unit: "slices" },
          { name: "butter", qty: 1, unit: "tbsp" }
        ],
        steps: [
          'Butter bread slices.',
          'Place cheese between bread.',
          'Cook on pan until golden and cheese melts.'
        ]
      },
      {
        title: 'Beef Tacos',
        desc: 'Mexican tacos with seasoned beef.',
        img: 'https://danosseasoning.com/wp-content/uploads/2022/03/Beef-Tacos-1024x767.jpg',  // from Unsplash “authentic mexican tacos…” :contentReference[oaicite:1]{index=1}
        ingredients: [
          { name: "tortilla", qty: 6, unit: "pcs" },
          { name: "ground beef", qty: 400, unit: "g" },
          { name: "onion", qty: 1, unit: "pcs" },
          { name: "tomato", qty: 1, unit: "pcs" },
          { name: "lettuce", qty: 1, unit: "cup" },
          { name: "cheese", qty: 0.5, unit: "cup" },
          { name: "salsa", qty: 0.5, unit: "cup" }
        ],
        steps: [
          'Cook beef with onion until browned.',
          'Warm tortillas.',
          'Fill with beef, tomato, lettuce, cheese, salsa.'
        ]
      },
      {
        title: 'Butter Chicken',
        desc: 'Creamy Indian chicken curry.',
        img: 'https://www.spiceroots.com/spiceroots/wp-content/uploads/2008/05/butterchicken-1024x682-1.jpg',  // example butter chicken image
        ingredients: [
          { name: "chicken", qty: 500, unit: "g" },
          { name: "butter", qty: 3, unit: "tbsp" },
          { name: "onion", qty: 1, unit: "pcs" },
          { name: "garlic", qty: 3, unit: "cloves" },
          { name: "ginger", qty: 1, unit: "inch" },
          { name: "tomato sauce", qty: 1, unit: "cup" },
          { name: "cream", qty: 0.5, unit: "cup" },
          { name: "garam masala", qty: 1, unit: "tbsp" },
          { name: "cumin", qty: 1, unit: "tsp" },
          { name: "coriander", qty: 1, unit: "tsp" },
          { name: "salt", qty: 1, unit: "to taste" }
        ],
        steps: [
          'Sauté onion, garlic, ginger in butter.',
          'Add chicken and cook until browned.',
          'Stir in spices and tomato sauce.',
          'Simmer, then add cream.',
          'Serve with rice or naan.'
        ]
      }
    ];
async function seedRecipes() {
  for (const data of seedData) {
    // Create Recipe
    const recipe = await Recipe.create({
      name: data.title,
      description: data.desc,
      image_url: data.img,
    });

    // Create Ingredients
    for (const ing of data.ingredients) {
      await Ingredient.create({
        recipe_id: recipe.id,   // ✅ use recipe_id to match DB column
        name: ing.name,
        quantity: ing.qty,
        unit: ing.unit,
      });
    }

    // Create Instructions
    for (let i = 0; i < data.steps.length; i++) {
      await Instruction.create({
        recipe_id: recipe.id,   // ✅ use recipe_id to match DB column
        step: i + 1,
        description: data.steps[i],
      });
    }
  }

  console.log('Seeding complete.');
}

if (require.main === module) {
  seedRecipes().then(() => process.exit(0));
}