-- Migration: Create recipe table

CREATE TABLE IF NOT EXISTS recipe (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    ingredients TEXT,
    instructions TEXT,
    category VARCHAR(100),
    cuisine VARCHAR(100),
    tags VARCHAR(255),
    image_url VARCHAR(255),
    youtube_url VARCHAR(255),
    shared BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
