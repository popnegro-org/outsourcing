-- Public visitors may submit inquiries, but the public client has no inbox.
-- Remove authenticated read access until a dedicated, role-restricted admin path exists.
DROP POLICY IF EXISTS "Signed in users can read inquiries" ON public.portfolio_inquiries;
REVOKE SELECT ON TABLE public.portfolio_inquiries FROM anon, authenticated;
