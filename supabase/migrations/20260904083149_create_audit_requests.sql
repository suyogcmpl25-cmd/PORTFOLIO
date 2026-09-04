/*
# Create audit_requests table

1. New Tables
- `audit_requests`
  - `id` (uuid, primary key)
  - `name` (text, not null) — the submitter's name
  - `email` (text, not null) — the submitter's business email
  - `automation` (text, not null) — what they want to automate
  - `website` (text, nullable) — optional website URL
  - `status` (text, default 'pending') — for tracking audit status
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `audit_requests`.
- Allow anon + authenticated INSERT only (public form submissions).
- No SELECT/UPDATE/DELETE for anon or authenticated — only the table owner
  (via service role / dashboard) can read and manage submissions.
*/

CREATE TABLE IF NOT EXISTS audit_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  automation text NOT NULL,
  website text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE audit_requests ENABLE ROW LEVEL SECURITY;

-- Allow public insert (form submission from the website)
DROP POLICY IF EXISTS "anon_insert_audit_requests" ON audit_requests;
CREATE POLICY "anon_insert_audit_requests"
ON audit_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No SELECT, UPDATE, or DELETE policies for anon/authenticated.
-- Submissions are only readable via the Supabase dashboard / service role key.
