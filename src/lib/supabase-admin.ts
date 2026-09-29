import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Service-role client — bypasses RLS, must only ever be imported from server code
// (API routes). Never import this from a "use client" file.
//
// Lazily constructed on first use (inside a request handler), not at module load —
// evaluating env vars at import time would run during Next.js's build-time page-data
// collection, before Vercel's runtime env vars are necessarily available, and throwing
// there fails the build itself instead of just the request.
let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) {
    throw new Error("SUPABASE_URL / SUPABASE_SECRET_KEY env vars are not set");
  }

  client = createClient(url, secretKey, { auth: { persistSession: false } });
  return client;
}
