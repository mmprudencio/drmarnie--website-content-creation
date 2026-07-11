import { createClient } from "@/lib/supabase/server";
import type { Service } from "@/lib/db/types";

export async function getActiveServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getAllServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

type CreateServiceInput = {
  title: string;
  description: string;
  appointment_url: string;
  is_active: boolean;
};

export async function createService(input: CreateServiceInput): Promise<Service> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .insert(input)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function updateService(
  id: string,
  input: Partial<CreateServiceInput>,
): Promise<Service> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function deleteService(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw error;
}
