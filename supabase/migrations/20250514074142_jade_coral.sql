/*
  # Add project_id to tasks table

  1. Changes
    - Add project_id column to tasks table
    - Add foreign key constraint to projects table
    - Add cascade delete for when a project is deleted
  
  2. Security
    - No changes to RLS policies needed as existing policies cover project_id access
*/

ALTER TABLE tasks
ADD COLUMN IF NOT EXISTS project_id uuid REFERENCES projects(id) ON DELETE CASCADE;