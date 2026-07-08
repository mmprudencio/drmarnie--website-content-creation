# Data Model

## posts
| Field | Type | Notes |
|---|---|---|
| id | uuid PK | gen_random_uuid() |
| user_id | uuid nullable | owner scope (set at lock-down) |
| title | text not null | |
| slug | text unique not null | url-safe identifier |
| body | text | rich markdown/HTML |
| category | text | e.g. 'neurodevelopment', 'parenting', 'financial-literacy', 'ai-literacy' |
| status | text default 'draft' | 'draft' \| 'published' \| 'archived' |
| published_at | timestamptz | set on publish |
| cover_image_url | text | |
| ai_draft_value | text | AI-suggested body draft |
| ai_draft_source | text | model identifier |
| ai_draft_confidence | numeric | 0–1 |
| ai_draft_review_status | text default 'unreviewed' | |
| created_at | timestamptz default now() | |

## services
| Field | Type |
|---|---|
| id | uuid PK |
| user_id | uuid nullable |
| title | text not null |
| description | text |
| appointment_url | text |
| is_active | boolean default true |
| created_at | timestamptz default now() |

## products
| Field | Type |
|---|---|
| id | uuid PK |
| user_id | uuid nullable |
| title | text not null |
| type | text | 'book' \| 'course' |
| description | text |
| external_url | text |
| cover_image_url | text |
| is_active | boolean default true |
| created_at | timestamptz default now() |

## leads
| Field | Type |
|---|---|
| id | uuid PK |
| user_id | uuid nullable |
| name | text not null |
| email | text |
| phone | text |
| source_path | text | page where form was submitted |
| created_at | timestamptz default now() |

## page_views
| Field | Type |
|---|---|
| id | uuid PK |
| path | text not null |
| referrer | text |
| created_at | timestamptz default now() |

## RLS
All tables: RLS enabled. v1 permissive policies allow anonymous read + write (demo-first). Lock-down sprint replaces with `auth.uid() = user_id` owner policies for write operations.
