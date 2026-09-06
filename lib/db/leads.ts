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
  message?: string;
  consent_share?: boolean;
};

export async function createLead(input: CreateLeadInput): Promise<Lead> {
  const supabase = await createClient();

  const base = {
    name: input.name,
    email: input.email || null,
    phone: input.phone || null,
    source_path: input.source_path || null,
  };
  const extended = {
    ...base,
    message: input.message?.trim() || null,
    consent_share: input.consent_share ?? false,
  };

  // Try with the capture fields (message / consent_share). If migration 0002
  // hasn't been applied to this database yet, Postgres reports an undefined
  // column — fall back to the base insert so the form still works.
  let { data, error } = await supabase.from("leads").insert(extended).select("*").single();

  if (error && (error.code === "42703" || error.code === "PGRST204")) {
    ({ data, error } = await supabase.from("leads").insert(base).select("*").single());
  }

  if (error) throw error;
  return data;
}

export async function deleteLead(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) throw error;
}
