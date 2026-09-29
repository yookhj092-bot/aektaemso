import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !secretKey) {
  throw new Error("SUPABASE_URL / SUPABASE_SECRET_KEY env vars are not set");
}

// Service-role client — bypasses RLS, must only ever be imported from server code
// (API routes). Never import this from a "use client" file.
export const supabaseAdmin = createClient(url, secretKey, {
  auth: { persistSession: false },
});
