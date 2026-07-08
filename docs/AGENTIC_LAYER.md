# Agentic Layer

## Risk Levels & Actions

### Low — Auto (no approval needed)
- Tag a post's category from its title (rule-based)
- Generate a slug from the post title
- Count page views and surface top-10 paths in admin dashboard

### Medium — Draft → Dr. Marnie approves
- AI drafts a post body from bullet-point notes (`post_draft_tool`) — stored in `ai_draft_*` fields, status = `unreviewed`; Dr. Marnie edits and publishes
- Suggest a content calendar gap alert ("No parenting post this week")

### High — Always requires explicit approval
- Send lead a follow-up email (not in v1; requires email tool + GDPR review)
- Publish a post directly without review

### Critical — Human only
- Delete a lead record
- Bulk delete posts
- Any data export of patient contact information

## Named Tools (approved list)
- `post_draft_tool` — takes bullet notes, returns draft body
- `slug_generator` — deterministic, no external calls
- `page_view_aggregator` — read-only DB query

## Audit Log Fields
`action | object_type | object_id | actor | risk_level | timestamp | before_state | after_state`

## v1 vs Later
- **v1**: slug_generator + page_view_aggregator only
- **Later**: post_draft_tool with GPT-4o, lead follow-up email (after legal review)
