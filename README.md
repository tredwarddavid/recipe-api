# Recipe API

## Setup Instructions

1. **Create the MySQL Database**

   Open your MySQL client and run:
   ```sql
   CREATE DATABASE dishcovery;
   ```

2. **Configure Database Credentials**

   Edit `db.js` to match your MySQL username and password if needed.

3. **Install Dependencies**

   ```bash
   npm install
   ```


4. **Run Migration**

   This will create the necessary tables in the `dishcovery` schema:
   ```bash
   node migrate.js
   ```

5. **Seed the Database**

   To insert sample recipes, run:
   ```bash
   node seeders/seedRecipes.js
   ```

6. **Start the API Server**

   ```bash
   npm start
   ```

## Endpoints

- `GET /recipes` - List all recipes
- `GET /recipes/:id` - Get a recipe by ID
- `POST /recipes` - Create a new recipe
- `PUT /recipes/:id` - Update a recipe
- `DELETE /recipes/:id` - Delete a recipe

## Notes
- Make sure MySQL is running and accessible.
- The API uses Sequelize ORM and expects the `dishcovery` schema to exist before running migrations.
