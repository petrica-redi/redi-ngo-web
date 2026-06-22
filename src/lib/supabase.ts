import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getEnv } from "./env";

let instance: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (instance !== undefined) return instance;
  const url = getEnv("NEXT_PUBLIC_SUPABASE_URL");
  const key = getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (!url || !key) {
    instance = null;
    return null;
  }
  instance = createClient(url, key);
  return instance;
}
