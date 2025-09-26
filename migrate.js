const sequelize = require('./db');

// Import models so Sequelize knows about them
require('./models/Recipe');
require('./models/Ingredient');
require('./models/Instruction');
require('./models/Ingredients');

async function migrate() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('All tables created/updated successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

migrate();
