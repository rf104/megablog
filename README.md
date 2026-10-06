# MegaBlog

A blogging app built with React 19, Vite, Tailwind CSS v4, Redux Toolkit and **Supabase** (Postgres database, auth and file storage).

## Setup

### 1. Create a Supabase project

1. Sign in at [supabase.com](https://supabase.com) and create a new project.
2. Open **SQL Editor → New query**, paste the contents of [`supabase/schema.sql`](supabase/schema.sql), and click **Run**.
   This creates:
   - the `posts` table, with row-level security (signed-in users read published posts; authors manage only their own posts)
   - the public `post-images` storage bucket (5 MB limit, images only), where each user can only write to their own folder

### 2. Configure auth

In **Authentication → URL Configuration**:

- **Site URL**: `http://localhost:5173` for local development (your real domain in production).
- Add the same URL under **Redirect URLs**.

Email confirmation is on by default: new users get a link and are signed in when they click it.
To skip confirmation during development, turn off **Authentication → Sign In / Providers → Email → Confirm email**.

### 3. Environment variables

Copy `.envSample` to `.env` and fill it in:

| Variable | Where to find it |
| --- | --- |
| `VITE_SUPABASE_URL` | Project's **Connect** panel, or Project Settings → API |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Same place: the *publishable* key (or legacy *anon* key). **Never** use the secret / `service_role` key in the frontend. |
| `VITE_SUPABASE_BUCKET` | Optional, defaults to `post-images` |
| `VITE_TINY_API_KEY` | [tiny.cloud](https://www.tiny.cloud/auth/signup/) (free) for the rich-text editor |

If the Supabase variables are missing, the app shows a setup screen instead of starting.

### 4. Run

```bash
npm install
npm run dev
```

Restart `npm run dev` after editing `.env`; Vite only reads it on start-up.

## Project structure

```
src/
  supabase/      client, auth service, posts + storage service
  store/         Redux auth slice
  component/     UI components (Button, Input, PostCard, PostForm, Header…)
  Pages/         route pages
  utils/         excerpt / reading-time / date helpers
supabase/
  schema.sql     database tables, security policies and storage bucket
```

## Scripts

- `npm run dev`: start the dev server
- `npm run build`: production build into `dist/`
- `npm run lint`: run ESLint
