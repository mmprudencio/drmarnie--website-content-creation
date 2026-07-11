import { createClient } from "@/lib/supabase/server";
import type { Post, PostStatus } from "@/lib/db/types";

export async function getPublishedPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getAllPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export async function uniqueSlug(base: string): Promise<string> {
  const supabase = await createClient();
  let candidate = base || "post";
  let n = 1;
  for (;;) {
    const { data, error } = await supabase
      .from("posts")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();
    if (error) throw error;
    if (!data) return candidate;
    n += 1;
    candidate = `${base}-${n}`;
  }
}

type CreatePostInput = {
  title: string;
  body: string;
  category: string;
  status: PostStatus;
};

export async function createPost(input: CreatePostInput): Promise<Post> {
  const supabase = await createClient();
  const base = slugify(input.title);
  const slug = await uniqueSlug(base);

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title: input.title,
      slug,
      body: input.body,
      category: input.category || null,
      status: input.status,
      published_at: input.status === "published" ? new Date().toISOString() : null,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

type UpdatePostInput = {
  title?: string;
  body?: string;
  category?: string;
  status?: PostStatus;
};

export async function updatePost(id: string, input: UpdatePostInput): Promise<Post> {
  const supabase = await createClient();
  const patch: Record<string, unknown> = { ...input };

  if (input.status === "published") {
    const existing = await getPostById(id);
    if (!existing?.published_at) {
      patch.published_at = new Date().toISOString();
    }
  }

  const { data, error } = await supabase
    .from("posts")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
}
