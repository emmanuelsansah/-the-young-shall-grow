import { createClient } from '@supabase/supabase-js';

// Base Supabase Project URL (strip trailing /rest/v1/ if passed)
const rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vctjxlncglyisbqlidon.supabase.co';
export const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');

export const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjdGp4bG5jZ2x5aXNicWxpZG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyMDgwNzgsImV4cCI6MjEwOTc4NDA3OH0.A9fFVjXiBJIL8UweTduFimkJMcYh9MjgKsLAyE60ygA';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.includes('supabase.co')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;
