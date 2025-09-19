-- Migration: Drop 'shared' field from recipe table
ALTER TABLE recipe DROP COLUMN shared;
