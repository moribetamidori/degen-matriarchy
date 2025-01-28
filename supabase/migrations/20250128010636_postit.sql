-- Create tables
create table public.users (
  id uuid references auth.users on delete cascade,
  email text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

create table public.pages (
  id uuid default uuid_generate_v4() primary key,
  name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.post_it_notes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  text text not null,
  position_x numeric not null,
  position_y numeric not null,
  color text not null,
  page_id uuid references public.pages(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security)
alter table public.users enable row level security;
alter table public.post_it_notes enable row level security;
alter table public.pages enable row level security;

-- Create RLS policies
create policy "Users can read all notes"
  on public.post_it_notes for select
  using (true);

create policy "Users can only update their own notes"
  on public.post_it_notes for update
  using (auth.uid() = user_id);

create policy "Users can only delete their own notes"
  on public.post_it_notes for delete
  using (auth.uid() = user_id);

create policy "Users can insert their own notes"
  on public.post_it_notes for insert
  with check (auth.uid() = user_id);

-- Insert default page
INSERT INTO public.pages (name) VALUES ('1');