import { createClient } from '@supabase/supabase-js';
import type { AuditFormData } from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function submitAuditRequest(data: AuditFormData): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from('audit_requests').insert({
    name: data.name,
    email: data.email,
    automation: data.automation,
    website: data.website || null,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
