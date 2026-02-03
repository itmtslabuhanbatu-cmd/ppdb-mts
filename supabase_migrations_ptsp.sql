-- Create PTSP Services Table
create table ptsp_services (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  requirements text[], -- Array of strings for requirements
  estimated_days int default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create PTSP Requests Table
create table ptsp_requests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  service_id uuid references ptsp_services(id) on delete set null,
  full_name text not null, -- Snapshot of name in case user changes it
  details text, -- Optional additional details from user
  status text default 'PENDING' check (status in ('PENDING', 'PROCESSED', 'COMPLETED', 'REJECTED')),
  admin_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table ptsp_services enable row level security;
alter table ptsp_requests enable row level security;

-- Services are readable by everyone, modifiable only by admins (using service_role for now or admin check)
create policy "Services are public" on ptsp_services for select using (true);

-- Requests policies
create policy "Users can view their own requests" on ptsp_requests 
  for select using (auth.uid() = user_id);

create policy "Users can insert their own requests" on ptsp_requests 
  for insert with check (auth.uid() = user_id);

-- Seed initial services
insert into ptsp_services (name, description, requirements, estimated_days) values
('Legalisir Ijazah/Rapor', 'Pengesahan fotokopi ijazah atau rapor.', array['Membawa Ijazah/Rapor Asli', 'Maksimal 10 lembar'], 1),
('Surat Keterangan Aktif', 'Surat keterangan siswa aktif untuk tunjangan gaji dll.', array['Scan Kartu Pelajar (jika ada)'], 1),
('Surat Pindah (Mutasi Keluar)', 'Pengurusan surat pindah sekolah.', array['Surat Permohonan Ortu', 'Rapor Asli'], 3),
('Permohonan Ijazah Hilang', 'Penerbitan Surat Keterangan Pengganti Ijazah.', array['Surat Kehilangan Polisi', 'Fotokopi Ijazah (jika ada)'], 5);
