import { createClient } from "@supabase/supabase-js";

// Admin client — service role key, bypasses RLS. Server-side only, never expose to browser.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
