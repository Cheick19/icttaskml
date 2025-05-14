/*
  # Update profiles table RLS policies

  1. Changes
    - Add policy to allow authenticated users to read all profiles
    - This is necessary for features like team member selection and collaboration
  
  2. Security
    - Maintains existing policies for users to update their own profiles
    - Adds new policy for reading all profiles while keeping write restrictions
*/

-- Drop the existing SELECT policy
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;

-- Create new SELECT policy to allow authenticated users to read all profiles
CREATE POLICY "Users can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Keep existing UPDATE policy unchanged
-- This ensures users can only update their own profiles
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile"
      ON profiles
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = id)
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;