-- Migration: Add 'deleted_at' field for Sequelize paranoid soft delete
ALTER TABLE recipe ADD COLUMN deleted_at DATETIME NULL AFTER updated_at;
