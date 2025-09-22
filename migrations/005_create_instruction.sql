-- Migration: Create instructions table

CREATE TABLE IF NOT EXISTS instructions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id CHAR(36) NOT NULL,
    step INT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_instructions_recipe FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON DELETE CASCADE
);
