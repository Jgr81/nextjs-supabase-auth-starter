-- Profiles table policies
CREATE POLICY "Users can insert their own profile."
    ON profiles FOR INSERT 
    TO authenticated, anon
    WITH CHECK (true);

CREATE POLICY "Users can view their own profile."
    ON profiles FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
    ON profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);