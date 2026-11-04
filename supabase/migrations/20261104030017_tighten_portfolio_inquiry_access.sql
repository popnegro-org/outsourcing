/*
# Tighten portfolio inquiry access

1. Security changes
- Revoke inherited table-wide privileges from anon and authenticated.
- Allow anonymous visitors only to INSERT the three contact fields.
- Allow authenticated reviewers only to SELECT inquiry records.
- Keep row-level security enabled and preserve existing policies.

2. Important notes
- The public contact form does not need to update or delete submissions.
- Column-level INSERT privileges prevent callers from setting the id or created_at fields.
*/

REVOKE ALL PRIVILEGES ON TABLE public.portfolio_inquiries FROM anon, authenticated;
GRANT INSERT (name, email, message) ON TABLE public.portfolio_inquiries TO anon, authenticated;
GRANT SELECT ON TABLE public.portfolio_inquiries TO authenticated;