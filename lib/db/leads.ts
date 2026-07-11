import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/lib/db/types";

export async function getAllLeads(): Promise<Lead[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

type CreateLeadInput = {
  name: string;
  email: string;
  phone: string;
  source_path: string;
};

export async function createLead(input: CreateLeadInput): Promise<Lead> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .insert({
      name: input.name,
      email: input.email || null,
      phone: input.phone || null,
      source_path: input.source_path || null,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function deleteLead(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) throw error;
}
