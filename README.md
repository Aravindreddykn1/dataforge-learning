# DataForge

DataForge is an adaptive learning operating system for Data Engineering and Analytics. It is now structured as a Vercel-ready Next.js app with Supabase Auth for secure sign-in and password recovery.

## Run locally

1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add the Supabase values.
4. Run `npm run dev`.
5. Open `http://localhost:3000`.

## Supabase setup

Create a Supabase project, then copy the project URL and anon key from **Project Settings -> API** into:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

In **Authentication -> URL Configuration**, add your local URL and your Vercel URL. The password recovery flow uses `/auth/update-password`; Supabase sends the recovery email and securely manages the one-time token.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New -> Project** and import the repository.
3. Keep the framework preset as **Next.js**.
4. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` under **Settings -> Environment Variables** for Production, Preview, and Development.
5. Deploy. Vercel will build with `npm run build` and redeploy whenever you push to the connected branch.

For a short URL, rename the Vercel project to a short slug such as `df-learn` or `dataforge-os`. Vercel will provide `https://df-learn.vercel.app`. A custom domain can be attached later under **Project -> Settings -> Domains**.

## Security

- Passwords and recovery tokens are handled by Supabase Auth.
- Only the public Supabase anon key is used in browser code.
- `OPENAI_API_KEY` and `DATABASE_URL` remain server-side environment variables.
- Middleware refreshes sessions and redirects unauthenticated users to `/auth/login`.
- Security response headers are configured in `vercel.json`.

## Current product slice

- Responsive dashboard, daily plan, mastery, projects, and analytics surfaces
- Authenticated sign-in and account creation
- Email-based password recovery and password update
- Adaptive daily-test interaction
- Prisma schema foundation for users, tests, attempts, mastery, XP, and study sessions

The original dependency-free prototype remains in `index.html`, `styles.css`, and `app.js` as a local fallback reference. The deployable entry point is the Next.js `app/` directory.
