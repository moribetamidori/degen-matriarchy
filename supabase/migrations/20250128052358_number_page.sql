alter table "public"."pages" drop column "name";

alter table "public"."pages" add column "number" bigint;

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

