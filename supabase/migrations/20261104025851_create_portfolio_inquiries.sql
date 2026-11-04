/*
# Create portfolio inquiries table

1. New Tables
- `portfolio_inquiries`
- `id` (uuid, primary key)
- `name` (text, visitor name)
- `email` (text, visitor email)
- `message` (text, project brief)
- `created_at` (timestamptz, submission time)

2. Security
- Enable RLS on `portfolio_inquiries`.
- Grant INSERT to anon and authenticated so the public contact form can receive inquiries.
- Grant SELECT only to authenticated for future internal review.
- Policies permit public submissions but do not expose submitted messages to anonymous visitors.

3. Important notes
- This table is intentionally single-tenant because the portfolio has no sign-in screen.
- Visitor input is constrained by database checks to keep submissions useful and bounded.
*/

CREATE TABLE IF NOT EXISTS public.portfolio_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 254),
  message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.portfolio_inquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON public.portfolio_inquiries TO anon, authenticated;
GRANT SELECT ON public.portfolio_inquiries TO authenticated;

DROP POLICY IF EXISTS "Public can submit inquiries" ON public.portfolio_inquiries;
CREATE POLICY "Public can submit inquiries"
  ON public.portfolio_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Signed in users can read inquiries" ON public.portfolio_inquiries;
CREATE POLICY "Signed in users can read inquiries"
  ON public.portfolio_inquiries FOR SELECT
  TO authenticated
  USING (true);