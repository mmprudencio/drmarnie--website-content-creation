# Test Plan

## v1 Success Scenario (manual)
1. Open the live domain in an incognito browser
2. **Verify**: Homepage loads with at least 3 posts, services section, and products section (no login prompt)
3. Click a post title → **Verify**: full post content renders at `/posts/[slug]`
4. Submit the lead form with name="Test Parent", email="test@example.com", phone="555-0100"
5. **Verify**: Success message shown; no page crash
6. Open Supabase table `leads` → **Verify**: new row exists with correct fields and `source_path`
7. Open `/admin` → Posts list → **Verify**: all posts shown with status badges
8. Click **Create Post** → fill title, body, category → click **Publish**
9. **Verify**: post appears in admin list with status `published`
10. Reload homepage in incognito → **Verify**: new post appears at top
11. Open Supabase `page_views` → **Verify**: rows accumulated for each page visited
12. Open admin Leads list → **Verify**: test lead from step 4 appears with correct data

## Empty State Tests
- Delete all seed posts → homepage shows "No posts yet" message (not a blank white screen)
- No leads yet → admin leads list shows "No leads captured yet"
- New category with no posts → no crash, returns empty grid

## Error State Tests
- Submit lead form with empty name → **Verify**: inline validation error, no DB write
- Submit lead form with invalid email → **Verify**: validation error shown
- Simulate DB timeout → **Verify**: error banner appears, not a blank screen
- Navigate to `/posts/nonexistent-slug` → **Verify**: 404 page shown, not a crash

## Security Smoke Tests (Sprint 3)
- Visit `/admin` without login → **Verify**: redirected to `/login`
- Inspect browser network tab → **Verify**: no service-role key visible in any request
- Submit lead form as anonymous user → **Verify**: row created; user_id is null (expected in v1)
