# Go-live Pulafanatics

## Accounts and hosting
- [ ] Separate Supabase TEST and PRODUCTIE projects.
- [ ] Vercel Preview uses TEST; Production uses PRODUCTIE.
- [ ] Configure VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY, VITE_APP_URL and VITE_RBFA_TEAM_URL in Vercel.
- [ ] Configure MOLLIE_API_KEY and APP_URL as Supabase Edge Function Secrets. Never add service role or Mollie secrets to GitHub or browser variables.
- [ ] Enable 2FA on GitHub, Vercel, Supabase, Mollie and DNS.
- [ ] Protect main with pull request review and successful build.
- [ ] Create at least two personal admin accounts; use bootstrap-admin.sql.example only for the intended account.

## Auth, data and privacy
- [ ] Run migration in TEST and inspect RLS with anonymous, supporter A, supporter B and admin.
- [ ] Configure SMTP, email confirmation, password reset, allowed redirects and CAPTCHA in Supabase Auth.
- [ ] Publish privacy notice, retention periods, processing register and contact procedure before real member data.
- [ ] Verify family profiles are only visible to their household and authorized admins.
- [ ] Test backup and restore before importing member data.

## Calendar and bus
- [ ] Confirm each fixture against the official Voetbal Vlaanderen first-team calendar.
- [ ] Enter venue, kick-off, bus fare, capacity, pickup point and deadline.
- [ ] Test concurrent booking, duplicate passenger, full bus, cancellation and waitlist promotion.
- [ ] Verify each passenger has an individual reservation and price snapshot.

## Mollie
- [ ] Deploy both Edge Functions to TEST and use a Mollie test key.
- [ ] Test paid, canceled, failed, expired, repeated webhook, refund, browser close and amount mismatch.
- [ ] Switch to the live key only after board acceptance and technical/security review.

## Domain
- [ ] Add app.pulafanatics.be in Vercel and copy the exact DNS record shown by Vercel into Webnode.
- [ ] Configure the exact production domain as Supabase Auth Site URL and redirect.
- [ ] Test HTTPS, login, password reset, PWA install and payment return on phones and desktop.
