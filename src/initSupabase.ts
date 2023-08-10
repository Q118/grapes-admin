import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const ADMIN_DB = import.meta.env.VITE_ADMIN_DB;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    }
});



// Access auth admin api
export const supabaseAdmin = createClient(SUPABASE_URL, ADMIN_DB, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    }
});