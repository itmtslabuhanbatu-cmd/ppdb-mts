import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Default client for client-side usage
export const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

// Helper for server-side usage (standard client)
export const createClient = () => {
    return createSupabaseClient(supabaseUrl, supabaseKey);
};

// Helper for admin operations (bypasses RLS)
export const createAdminClient = () => {
    if (!supabaseServiceKey) {
        console.warn("SUPABASE_SERVICE_ROLE_KEY is missing, admin operations may fail.");
    }
    return createSupabaseClient(supabaseUrl, supabaseServiceKey || supabaseKey);
};
