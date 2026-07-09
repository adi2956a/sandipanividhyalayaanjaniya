# Sandipani Vidyalaya, Anjaniya

Next.js 14 + Tailwind CSS + MongoDB scaffold for an official, government-style school website for Sandipani Vidyalaya, Anjaniya, Mandla.

## Stack

- Next.js 14 App Router
- Tailwind CSS
- MongoDB Atlas with Mongoose
- NextAuth credentials login for admin
- React Hook Form for contact submission

## Included in this scaffold

- Public pages: Home, About, Academics, Admissions, Facilities, Activities, Notices, Gallery, Downloads, Disclosure, Contact
- Admin pages: Login, Dashboard, Notices, Gallery, Downloads, Homepage, Settings
- Mongoose models for notices, gallery, downloads, homepage content, site settings, contact submissions, and admins
- API routes for notices, gallery, downloads, homepage, settings, contact, and auth
- Sample fallback data so the site still renders before MongoDB is connected

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Fill in:

- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `CLOUDINARY_URL` if you plan to add upload support
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

4. Start development:

```bash
npm run dev
```

## Seed sample data

After setting `MONGODB_URI`, run:

```bash
npm run seed
```

## Notes

- If MongoDB is not configured, public pages use sample content from `lib/sample-data.ts`.
- Admin UI is scaffolded and route-protected, but the form submissions are still starter shells and can be connected to live CRUD interactions next.
- YouTube items are intended to store only video IDs, and downloads are intended to store Google Drive or external document links.
