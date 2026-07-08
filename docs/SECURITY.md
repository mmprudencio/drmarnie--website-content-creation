# Security

## Secret Handling
- All API keys (Supabase service role, OpenAI) stored as Vercel environment variables — never in client code or committed to git
- Public Supabase anon key used only for frontend reads; service role key used only in Next.js API routes (server-side)

## Permission Model (v1 → lock-down)
- **v1**: Open RLS policies — public pages and lead form work for anonymous visitors; admin panel has no auth yet (ship fast, lock down next)
- **Lock-down sprint**: Supabase Auth email/password for Dr. Marnie only; RLS write policies require `auth.uid() = user_id`; public pages remain readable anonymously

## Approved Tools Rule
- Agent may only call the three named tools in AGENTIC_LAYER.md
- No `run_any`, `eval`, or raw SQL execution from agent context
- Agent inherits read-only DB access unless an approved write tool is explicitly invoked

## Audit Principle
- Every admin create/update/delete writes an entry to `audit_logs` (object type, id, before, after, timestamp)
- Lead deletes are human-only and logged with actor identity
- No secrets appear in logs or error messages surfaced to the frontend

## Stop Points
If implementing payments, email marketing, or medical-data storage — stop and engage a qualified security/compliance professional before proceeding.
