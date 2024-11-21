-- Prevent deletion of last admin
CREATE OR REPLACE FUNCTION prevent_last_admin_removal()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM company_users
    WHERE company_id = OLD.company_id
    AND role = 'admin'
    AND user_id != OLD.user_id
  ) THEN
    RAISE EXCEPTION 'Cannot remove last admin';
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ensure_company_has_admin
  BEFORE DELETE OR UPDATE ON company_users
  FOR EACH ROW
  WHEN (OLD.role = 'admin')
  EXECUTE FUNCTION prevent_last_admin_removal(); 

  -- Handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    now(),
    now()
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();