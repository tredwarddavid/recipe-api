const Recipe = require('../models/Recipe');

const seedData = [
  {
    name: "Apple Frangipan Tart",
    description: "",
    ingredients: "175g/6oz digestive biscuits\r\n 75g/3oz butter\r\n 200g/7oz Bramley apples\r\n 75g/3oz Salted Butter\r\n 75g/3oz caster sugar\r\n 2 free-range eggs, beaten\r\n 75g/3oz ground almonds\r\n 1 tsp almond extract\r\n 50g/1¾oz flaked almonds",
    instructions: "Preheat the oven to 200C/180C Fan/Gas 6.\r\nPut the biscuits in a large re-sealable freezer bag and bash with a rolling pin into fine crumbs. Melt the butter in a small pan, then add the biscuit crumbs and stir until coated with butter. Tip into the tart tin and, using the back of a spoon, press over the base and sides of the tin to give an even layer. Chill in the fridge while you make the filling.\r\nCream together the butter and sugar until light and fluffy. You can do this in a food processor if you have one. Process for 2-3 minutes. Mix in the eggs, then add the ground almonds and almond extract and blend until well combined.\r\nPeel the apples, and cut thin slices of apple. Do this at the last minute to prevent the apple going brown. Arrange the slices over the biscuit base. Spread the frangipane filling evenly on top. Level the surface and sprinkle with the flaked almonds.\r\nBake for 20-25 minutes until golden-brown and set.\r\nRemove from the oven and leave to cool for 15 minutes. Remove the sides of the tin. An easy way to do this is to stand the tin on a can of beans and push down gently on the edges of the tin.\r\nTransfer the tart, with the tin base attached, to a serving plate. Serve warm with cream, crème fraiche or ice cream.",
    category: "Dessert",
    cuisine: "British",
    tags: "Tart,Baking,Fruity",
    image_url: "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg",
    youtube_url: "https://www.youtube.com/watch?v=rp8Slv4INLk",
  },
  {
    name: "Chicken Adobo",
    description: "Chicken cooked with soy sauce and vinegar.",
    ingredients: "1/2 kilo chicken, 1/4 cup soy sause, etc.",
    instructions: "This is a test instruction.",
    category: "Chicken",
    cuisine: "Filipino",
    tags: "meat,lunch,dinner",
    image_url: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
    youtube_url: "",
  },
  {
    name: "Beef Wellington",
    description: "",
    ingredients: "400g mushrooms\r\n 1-2tbsp English Mustard\r\n Dash Olive Oil\r\n 750g piece Beef Fillet\r\n 6-8 slices Parma ham\r\n 500g Puff Pastry\r\n Dusting Flour\r\n 2 Beaten Egg Yolks",
    instructions: "Put the mushrooms into a food processor with some seasoning and pulse to a rough paste. Scrape the paste into a pan and cook over a high heat for about 10 mins, tossing frequently, to cook out the moisture from the mushrooms. Spread out on a plate to cool.\r\nHeat in a frying pan and add a little olive oil. Season the beef and sear in the hot pan for 30 secs only on each side. (You don't want to cook it at this stage, just colour it). Remove the beef from the pan and leave to cool, then brush all over with the mustard.\r\nLay a sheet of cling film on a work surface and arrange the Parma ham slices on it, in slightly overlapping rows. With a palette knife, spread the mushroom paste over the ham, then place the seared beef fillet in the middle. Keeping a tight hold of the cling film from the edge, neatly roll the Parma ham and mushrooms around the beef to form a tight barrel shape. Twist the ends of the cling film to secure. Chill for 15-20 mins to allow the beef to set and keep its shape.\r\nRoll out the puff pastry on a floured surface to a large rectangle, the thickness of a £1 coin. Remove the cling film from the beef, then lay in the centre. Brush the surrounding pastry with egg yolk. Fold the ends over, the wrap the pastry around the beef, cutting off any excess. Turn over, so the seam is underneath, and place on a baking sheet. Brush over all the pastry with egg and chill for about 15 mins to let the pastry rest.\r\nHeat the oven to 200C, 400F, gas 6.\r\nLightly score the pastry at 1cm intervals and glaze again with beaten egg yolk. Bake for 20 minutes, then lower the oven setting to 180C, 350F, gas 4 and cook for another 15 mins. Allow to rest for 10-15 mins before slicing and serving with the side dishes of your choice. The beef should still be pink in the centre when you serve it.",
    category: "Beef",
    cuisine: "British",
    tags: "Meat,Stew",
    image_url: "https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg",
    youtube_url: "https://www.youtube.com/watch?v=FS8u1RBdf6I",
  },
  {
    name: "Escovitch Fish",
    description: "",
    ingredients: "2 Pounds Red Snapper\r\n 1/2 cup Vegetable Oil\r\n 1 clove peeled crushed Garlic\r\n 1/2 tsp Ginger\r\n 2 sprigs Thyme\r\n 1 Bay Leaf\r\n 0.5 Red Pepper\r\n 0.5 Yellow Pepper\r\n 1 sliced Onion\r\n 1 chopped Carrots\r\n 1 tbs Sugar\r\n 1/2 tsp Allspice\r\n 1 tsp Worcestershire Sauce\r\n 1 Scotch Bonnet\r\n 1 Lime\r\n 3/4 cup Malt Vinegar\r\n pinch Pepper",
    instructions: "Rinse fish; rub with lemon or lime, seasoned with salt and pepper or use your favorite seasoning. I used creole seasoning. Set aside or place in the oven to keep it warm until sauce is ready.\r\n\r\nIn large skillet heat oil over medium heat, until hot, add the fish, cook each side- for about 5-7 minutes until cooked through and crispy on both sides. Remove fish and set aside. Drain oil and leave about 2-3 tablespoons of oil\r\nAdd, bay leave, garlic and ginger, stir-fry for about a minute making sure the garlic does not burn\r\nThen add onion, bell peppers, thyme, scotch bonnet, sugar, all spice-continue stirring for about 2-3 minutes. Add vinegar, mix an adjust salt and pepper according to preference. Let it simmer for about 2 more minutes. \r\n\r\nDiscard bay leave, thyme spring and serve over fish with a side of this bammy. You may make the sauce about 2 days in advance.",
    category: "Seafood",
    cuisine: "Jamaican",
    tags: "Seafood,Spicy,Speciality,Easter",
    image_url: "https://www.themealdb.com/images/media/meals/1520084413.jpg",
    youtube_url: "https://www.youtube.com/watch?v=nF6DOtGE6k8",
  },
  {
    name: "Garides Saganaki",
    description: "",
    ingredients: "500g Raw king prawns\r\n 3 tablespoons Olive oil\r\n 1 Chopped onion\r\n pinch Freshly chopped parsley\r\n 250ml White wine\r\n 1 (400g) tin Chopped tomatoes\r\n 1/2 teaspoon Minced garlic\r\n 1 (200g) pack Cubed Feta cheese",
    instructions: "Place the prawns in a pot and add enough water to cover. Boil for 5 minutes. Drain, reserving the liquid, and set aside.\r\nHeat 2 tablespoons of oil in a saucepan. Add the onion; cook and stir until soft. Mix in the parsley, wine, tomatoes, garlic and remaining olive oil. Simmer, stirring occasionally, for about 30 minutes, or until the sauce is thickened.\r\nWhile the sauce is simmering, the prawns should become cool enough to handle. First remove the legs by pinching them, and then pull off the shells, leaving the head and tail on.\r\nWhen the sauce has thickened, stir in the prawns. Bring to a simmer again if the sauce has cooled with the prawns, and cook for about 5 minutes. Add the feta and remove from the heat. Let stand until the cheese starts to melt. Serve warm with slices of crusty bread.\r\nThough completely untraditional, you can add a few tablespoons of stock or passata to this recipe to make a delicious pasta sauce. Toss with pasta after adding the feta, and serve.",
    category: "Seafood",
    cuisine: "Greek",
    tags: "Seafood,Shellfish",
    image_url: "https://www.themealdb.com/images/media/meals/wuvryu1468232995.jpg",
    youtube_url: "https://www.youtube.com/watch?v=uO0ejc85zSE",
  },
  {
    name: "Roti john",
    description: "",
    ingredients: "1/4 lb Minced Beef\r\n 1 Onion\r\n 3 Eggs\r\n 1 tbs Chilli\r\n To taste Baguette\r\n To taste Salt\r\n Top Pepper",
    instructions: "Mix all the ingredients in a bowl.\r\nHeat a pan or griddle with a little vegetable oil.\r\nPour the mixture onto the pan and place a piece of open-faced baguette on top.\r\nPress on the bread with a spatula and grill for 2 minutes.\r\nTurn the bread over to make it a little crispy.\r\nRemove from pan and cut the bread into small portions.\r\nAdd mayonnaise and/or Sambal before cutting the sandwich (optional).",
    category: "Beef",
    cuisine: "Malaysian",
    tags: "Seafood,Shellfish",
    image_url: "https://www.themealdb.com/images/media/meals/hx335q1619789561.jpg",
    youtube_url: "https://www.youtube.com/watch?v=cl4YH8wblRs",
  },
  {
    name: "Steak Diane",
    description: "",
    ingredients: "2 tbs Canola Oil\r\n 4 Beef Fillet\r\n 1 1/2 cup Beef Stock\r\n 2 tbs Butter\r\n 2 cloves minced Garlic\r\n 1 medium finely diced Challots\r\n 4 oz Mushrooms\r\n ¼ cup Brandy\r\n ¼ cup Heavy Cream\r\n 1 tbs Dijon Mustard\r\n 1 tbs Worcestershire Sauce\r\n Dash Tabasco Sauce\r\n 1 tbs minced Parsley\r\n 1 tbs minced Chives\r\n to taste Salt\r\n to taste Pepper",
    instructions: "Heat oil in a 12\" skillet over medium-high heat. Season steaks with salt and pepper, and add to skillet; cook, turning once, until browned on both sides and cooked to desired doneness, about 4 to 5 minutes for medium-rare. Transfer steaks to a plate, and set aside.\r\nReturn skillet to high heat, and add stock; cook until reduced until to 1⁄2 cup, about 10 minutes. Pour into a bowl, and set aside. Return skillet to heat, and add butter; add garlic and shallots, and cook, stirring, until soft, about 2 minutes. Add mushrooms, and cook, stirring, until they release any liquid and it evaporates and mushrooms begin to brown, about 2 minutes. Add cognac, and light with a match to flambée; cook until flame dies down. Stir in reserved stock, cream, Dijon, Worcestershire, and hot sauce, and then return steaks to skillet; cook, turning in sauce, until warmed through and sauce is thickened, about 4 minutes. Transfer steak to serving plates and stir parsley and chives into sauce; pour sauce over steaks to serve.",
    category: "Beef",
    cuisine: "French",
    tags: "DateNight,Expensive,Meat,MainMeal,Cheasy",
    image_url: "https://www.themealdb.com/images/media/meals/vussxq1511882648.jpg",
    youtube_url: "https://www.youtube.com/watch?v=9rWZNHkrsNg",
  },
  {
    name: "Mediterranean Pasta Salad",
    description: "",
    ingredients: "200 g mozzarella balls\r\n 250 g baby plum tomatoes\r\n 1 bunch fresh basil\r\n 350 g farfalle\r\n 3 tablespoons extra virgin olive oil\r\n 40 g Green Olives\r\n 200 g tuna\r\n to taste salt\r\n to taste pepper",
    instructions: "Bring a large saucepan of salted water to the boil\r\nAdd the pasta, stir once and cook for about 10 minutes or as directed on the packet.\r\nMeanwhile, wash the tomatoes and cut into quarters. Slice the olives. Wash the basil.\r\nPut the tomatoes into a salad bowl and tear the basil leaves over them. Add a tablespoon of olive oil and mix.\r\nWhen the pasta is ready, drain into a colander and run cold water over it to cool it quickly.\r\nToss the pasta into the salad bowl with the tomatoes and basil.\r\nAdd the sliced olives, drained mozzarella balls, and chunks of tuna. Mix well and let the salad rest for at least half an hour to allow the flavours to mingle.\r\nSprinkle the pasta with a generous grind of black pepper and drizzle with the remaining olive oil just before serving.",
    category: "Seafood",
    cuisine: "Italian",
    tags: "Pasta,Baking",
    image_url: "https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg",
    youtube_url: "https://www.youtube.com/watch?v=e52IL8zYmaE",
  },
  {
    name: "Kentucky Fried Chicken",
    description: "",
    ingredients: "1 whole Chicken\r\n 2 quarts neutral frying Oil\r\n 1 Egg White\r\n 1 1/2 cups Flour\r\n 1 tablespoon Brown Sugar\r\n 1 tablespoon Salt\r\n 1 tablespoon paprika\r\n 2 teaspoons onion salt\r\n 1 teaspoon chili powder\r\n 1 teaspoon black pepper\r\n 1/2 teaspoon celery salt\r\n 1/2 teaspoon sage\r\n 1/2 teaspoon garlic powder\r\n 1/2 teaspoon allspice\r\n 1/2 teaspoon oregano\r\n 1/2 teaspoon basil\r\n 1/2 teaspoon marjoram",
    instructions: "Preheat fryer to 350°F. Thoroughly mix together all the spice mix ingredients.\r\nCombine spice mix with flour, brown sugar and salt.\r\nDip chicken pieces in egg white to lightly coat them, then transfer to flour mixture. Turn a few times and make sure the flour mix is really stuck to the chicken. Repeat with all the chicken pieces.\r\nLet chicken pieces rest for 5 minutes so crust has a chance to dry a bit.\r\nFry chicken in batches. Breasts and wings should take 12-14 minutes, and legs and thighs will need a few more minutes. Chicken pieces are done when a meat thermometer inserted into the thickest part reads 165°F.\r\nLet chicken drain on a few paper towels when it comes out of the fryer. Serve hot.",
    category: "Chicken",
    cuisine: "American",
    tags: "Meat,Spicy",
    image_url: "https://www.themealdb.com/images/media/meals/xqusqy1487348868.jpg",
    youtube_url: "https://www.youtube.com/watch?v=PTUxCvCz8Bc",
  },
  {
    name: "Lasagne",
    description: "",
    ingredients: "1 tblsp Olive Oil\r\n 2 Bacon\r\n 1 finely chopped Onion\r\n 1 Stick Celery\r\n 1 medium Carrots\r\n 2 cloves chopped Garlic\r\n 500g Minced Beef\r\n 1 tbls Tomato Puree\r\n 800g Chopped Tomatoes\r\n 1 tblsp Honey\r\n 500g Lasagne Sheets\r\n 400ml Creme Fraiche\r\n 125g Mozzarella Balls\r\n 50g Parmesan Cheese\r\n Topping Basil Leaves",
    instructions: "Heat the oil in a large saucepan. Use kitchen scissors to snip the bacon into small pieces, or use a sharp knife to chop it on a chopping board. Add the bacon to the pan and cook for just a mins until starting to turn golden. Add the onion, celery and carrot, and cook over a medium heat for 5 mins, stirring occasionally, until softened.\r\nAdd the garlic and cook for 1 min, then tip in the mince and cook, stirring and breaking it up with a wooden spoon, for about 6 mins until browned all over.\r\nStir in the tomato purée and cook for 1 min, mixing in well with the beef and vegetables. Tip in the chopped tomatoes. Fill each can half full with water to rinse out any tomatoes left in the can, and add to the pan. Add the honey and season to taste. Simmer for 20 mins.\r\nHeat oven to 200C/180C fan/gas 6. To assemble the lasagne, ladle a little of the ragu sauce into the bottom of the roasting tin or casserole dish, spreading the sauce all over the base. Place 2 sheets of lasagne on top of the sauce overlapping to make it fit, then repeat with more sauce and another layer of pasta. Repeat with a further 2 layers of sauce and pasta, finishing with a layer of pasta.\r\nPut the crème fraîche in a bowl and mix with 2 tbsp water to loosen it and make a smooth pourable sauce. Pour this over the top of the pasta, then top with the mozzarella. Sprinkle Parmesan over the top and bake for 25–30 mins until golden and bubbling. Serve scattered with basil, if you like.",
    category: "Pasta",
    cuisine: "Italian",
    tags: "",
    image_url: "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg",
    youtube_url: "https://www.youtube.com/watch?v=gfhfsBPt46s",
  }
];

async function seedRecipes() {
  for (const data of seedData) {
    await Recipe.create(data);
  }
  console.log('Seeding complete.');
}

if (require.main === module) {
  seedRecipes().then(() => process.exit(0));
}
