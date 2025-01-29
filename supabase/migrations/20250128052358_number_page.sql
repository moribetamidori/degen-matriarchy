alter table "public"."pages" drop column "name";

alter table "public"."pages" add column "number" bigint;

-- Insert 1 as default page number
INSERT INTO public.pages (number) VALUES (1);

-- Add RLS policies for pages table
create policy "Enable read access for all users"
  on public.pages for select
  using (true);

create policy "Enable insert access for all users"
  on public.pages for insert
  with check (true);

create policy "Enable update access for all users"
  on public.pages for update
  using (true);

-- Add RLS policies for users table
create policy "Enable read access for all users"
  on public.users for select
  using (true);

create policy "Enable insert access for all users"
  on public.users for insert
  with check (true);

create policy "Enable update access for all users"
  on public.users for update
  using (true);
