-- Migration: Alter recipe table - remove ingredients and instructions columns

ALTER TABLE recipe
    DROP COLUMN ingredients,
    DROP COLUMN instructions;
