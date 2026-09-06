export type PostStatus = "draft" | "published" | "archived";

export type Post = {
  id: string;
  user_id: string | null;
  title: string;
  slug: string;
  body: string | null;
  category: string | null;
  status: PostStatus;
  published_at: string | null;
  cover_image_url: string | null;
  ai_draft_value: string | null;
  ai_draft_source: string | null;
  ai_draft_confidence: number | null;
  ai_draft_review_status: string | null;
  created_at: string;
};

export type Service = {
  id: string;
  user_id: string | null;
  title: string;
  description: string | null;
  appointment_url: string | null;
  is_active: boolean;
  created_at: string;
};

export type ProductType = "book" | "course";

export type Product = {
  id: string;
  user_id: string | null;
  title: string;
  type: ProductType;
  description: string | null;
  external_url: string | null;
  cover_image_url: string | null;
  is_active: boolean;
  created_at: string;
};

export type Lead = {
  id: string;
  user_id: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  source_path: string | null;
  message: string | null;
  consent_share: boolean;
  created_at: string;
};

export type PageView = {
  id: string;
  path: string;
  referrer: string | null;
  created_at: string;
};
