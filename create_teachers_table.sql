-- Create teachers table
CREATE TABLE IF NOT EXISTS teachers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    nip TEXT,
    position TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public teachers are viewable by everyone" 
ON teachers FOR SELECT 
USING (true);

CREATE POLICY "Teachers are insertable by authenticated users only" 
ON teachers FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Teachers are updatable by authenticated users only" 
ON teachers FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Teachers are deletable by authenticated users only" 
ON teachers FOR DELETE 
USING (auth.role() = 'authenticated');

-- Create storage bucket for teacher photos if it doesn't exist
-- Note: You might need to create this manually in Supabase dashboard if SQL execution fails for storage
INSERT INTO storage.buckets (id, name, public) 
VALUES ('teacher-photos', 'teacher-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Teacher photos are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'teacher-photos');

CREATE POLICY "Authenticated users can upload teacher photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'teacher-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update teacher photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'teacher-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete teacher photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'teacher-photos' AND auth.role() = 'authenticated');
