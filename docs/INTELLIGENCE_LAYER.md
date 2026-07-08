# Intelligence Layer

## Messy Inputs
- Dr. Marnie's rough notes, voice memos, or bullet points on a topic
- Category tags typed freehand

## Auto-Structure (v1 → later)
```json
{
  "suggested_title": "5 Signs Your Toddler May Need Early Intervention",
  "suggested_category": "neurodevelopment",
  "suggested_body_draft": "...",
  "source": "gpt-4o",
  "confidence": 0.82,
  "review_status": "unreviewed"
}
```
Stored in `posts.ai_draft_*` fields. Dr. Marnie reviews, edits, and approves before publish.

## Events to Track
- Post published (category, length)
- Lead captured (source_path)
- Page view (path, referrer)
- Post viewed (slug)

## Scoring Rules (rule-based first)
- **Top pages**: count `page_views` grouped by path → sorted desc
- **Lead source**: count `leads` grouped by `source_path`
- **Content gap**: categories with <2 posts in last 30 days flagged

## v1 vs Later
| Feature | v1 | Later |
|---|---|---|
| Page view counts | ✅ raw counts | heatmap + trend lines |
| Lead source tracking | ✅ path stored | UTM + campaign tags |
| AI draft assist | ❌ | ✅ GPT draft from notes |
| Content scoring | ❌ | ✅ engagement + lead correlation |
