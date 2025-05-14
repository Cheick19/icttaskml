/*
  # Create tasks table

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `type` (task_type enum)
      - `priority` (priority_type enum)
      - `status` (status_type enum)
      - `project_id` (uuid, references projects)
      - `assigned_to` (uuid, references profiles)
      - `created_by` (uuid, references profiles)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Enums
    - task_type
    - priority_type
    - status_type

  3. Security
    - Enable RLS on `tasks` table
    - Add policies for authenticated users to:
      - Read tasks they created or are assigned to
      - Create new tasks
      - Update tasks they created or are assigned to
*/

-- Create enums
CREATE TYPE task_type AS ENUM (
  'SYSTEM',
  'SERVER',
  'BUG',
  'DATABASE',
  'CODE',
  'SECURITY',
  'NETWORK',
  'OTHER'
);

CREATE TYPE priority_type AS ENUM (
  'LOW',
  'MEDIUM',
  'HIGH'
);

CREATE TYPE status_type AS ENUM (
  'TODO',
  'IN_PROGRESS',
  'DONE'
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type task_type NOT NULL DEFAULT 'OTHER',
  priority priority_type NOT NULL DEFAULT 'MEDIUM',
  status status_type NOT NULL DEFAULT 'TODO',
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  assigned_to uuid REFERENCES profiles(id),
  created_by uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read tasks they created or are assigned to"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = created_by OR
    auth.uid() = assigned_to
  );

CREATE POLICY "Users can create tasks"
  ON tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update tasks they created or are assigned to"
  ON tasks
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = created_by OR
    auth.uid() = assigned_to
  )
  WITH CHECK (
    auth.uid() = created_by OR
    auth.uid() = assigned_to
  );