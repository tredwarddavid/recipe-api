const sequelize = require('./db');
const Recipe = require('./models/Recipe');

async function migrate() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ alter: true });
    console.log('Recipe table created/updated successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

migrate();
