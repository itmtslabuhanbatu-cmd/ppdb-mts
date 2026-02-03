-- 1. Drop the table that has the wrong constraint
DROP TABLE IF EXISTS ptsp_requests;

-- 2. Re-create the table WITHOUT "references auth.users"
CREATE TABLE ptsp_requests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null, -- Removed FK to auth.users to allow custom users
  service_id uuid references ptsp_services(id) on delete set null,
  full_name text not null,
  details text,
  status text default 'PENDING' check (status in ('PENDING', 'PROCESSED', 'COMPLETED', 'REJECTED')),
  admin_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Re-enable RLS (Good practice, though we bypass it with Admin Client)
ALTER TABLE ptsp_requests ENABLE ROW LEVEL SECURITY;

-- 4. Create verify policy (Open for Service Role/Admin)
CREATE POLICY "Enable all access for service role" ON ptsp_requests 
FOR ALL 
USING (true) 
WITH CHECK (true);
