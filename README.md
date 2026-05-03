# MyNextSeat – Ultimate College Decision Platform

## Features
- ✅ 40,000+ Indian colleges (import script)
- ✅ AI review summarization (Groq)
- ✅ JEE Main rank predictor
- ✅ Full Q&A system with upvotes
- ✅ Warning stories feed
- ✅ Image upload in reviews (Cloudinary)
- ✅ Dark mode, responsive design
- ✅ Authentication (NextAuth)
- ✅ PostHog analytics
- ✅ Advanced search with filters

## Quick Start
```bash
npm install
npm run dev
```

## Import Colleges
```bash
npm run import-colleges
```
(Requires Supabase)

## Environment Variables
Copy `.env.local` and fill:
- Supabase: https://supabase.com
- Groq: https://console.groq.com (free AI key)
- Cloudinary: https://cloudinary.com (free tier for images)
- PostHog: https://posthog.com (free analytics)

## Deploy to Vercel
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Add custom domains (mynextseat.online, mynextseat.info)
