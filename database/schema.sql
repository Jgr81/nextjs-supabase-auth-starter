-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- USERS table is handled by Supabase Auth, but we'll create a profiles table
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS
alter table profiles enable row level security;

-- Create companies table
create table companies (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  created_by uuid references profiles(id) not null
);

-- Enable RLS
alter table companies enable row level security;

-- Create company_users junction table for managing user roles within companies
create type user_role as enum ('admin', 'contributor', 'viewer');

create table company_users (
  company_id uuid references companies(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  role user_role not null default 'viewer',
  created_at timestamptz default now() not null,
  primary key (company_id, user_id)
);

-- Enable RLS
alter table company_users enable row level security;

-- Create areas table with self-referencing for hierarchy
create table areas (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references companies(id) on delete cascade not null,
  parent_id uuid references areas(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS
alter table areas enable row level security;

-- Create products table
create table products (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references companies(id) on delete cascade not null,
  name text not null,
  description text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS
alter table products enable row level security;

-- Create budget_items table
create table budget_items (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references companies(id) on delete cascade not null,
  area_id uuid references areas(id) on delete cascade not null,
  product_id uuid references products(id) on delete cascade,
  type text not null check (type in ('planned', 'actual')),
  amount decimal(15,2) not null,
  currency text not null default 'USD',
  date date not null,
  created_by uuid references profiles(id) not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS
alter table budget_items enable row level security;

-- Create invitations table
create table invitations (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references companies(id) on delete cascade not null,
  email text not null,
  role user_role not null default 'viewer',
  token uuid default uuid_generate_v4() not null,
  created_by uuid references profiles(id) not null,
  created_at timestamptz default now() not null,
  expires_at timestamptz not null default (now() + interval '7 days'),
  accepted_at timestamptz
);

-- Enable RLS
alter table invitations enable row level security;

-- Create notifications table
create table notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  type text not null,
  title text not null,
  message text not null,
  read boolean default false,
  created_at timestamptz default now() not null
);

-- Enable RLS
alter table notifications enable row level security;

-- Create RLS Policies

-- Profiles policies
create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- Companies policies
create policy "Users can view companies they belong to"
  on companies for select
  using (
    exists (
      select 1 from company_users
      where company_id = companies.id
      and user_id = auth.uid()
    )
  );

create policy "Admins can insert companies"
  on companies for insert
  with check (auth.uid() = created_by);

create policy "Admins can update their companies"
  on companies for update
  using (
    exists (
      select 1 from company_users
      where company_id = companies.id
      and user_id = auth.uid()
      and role = 'admin'
    )
  );

-- Add more policies for other tables...

-- Create functions for common operations
create or replace function get_user_companies(user_id uuid)
returns setof companies
language sql
security definer
set search_path = public
stable
as $$
  select c.*
  from companies c
  inner join company_users cu on cu.company_id = c.id
  where cu.user_id = user_id;
$$;

-- Create triggers for updated_at timestamps
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on profiles
  for each row
  execute function update_updated_at_column();

create trigger update_companies_updated_at
  before update on companies
  for each row
  execute function update_updated_at_column();

-- Add similar triggers for other tables... 