# OXID Labs — Modern Tropical Luxury Real Estate Platform

A cutting-edge, modernist architectural luxury real estate web application built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **Supabase (PostgreSQL)**, and **Cloudflare R2 Storage (S3 API)**.

Built according to modern architectural landing page aesthetics with exact proportions, high-definition assets, Plus Jakarta Sans typography, and full-width responsive layouts.

---

## 🌟 Key Features

1. **Aesthetic Architecture**:
   - Ultra-refined navbar with center black notch curved tabs, official **OXID Labs logo**, quick search trigger, direct Admin CRUD access, and WhatsApp concierge pill.
   - Modernist Hero section featuring the signature cantilever house villa (`/images/house-container-hd.webp`), floating specs capsule, geometric starburst compass, and dual review & stats cards.
   - Dynamic Property Catalog featuring 6 curated modernist estates with real-time category filtering (Cantilever, Cottage, Mansion, Penthouse) and live text search.
   - Interactive Blueprint CAD Modal (`FloorPlanModal`) with multi-level schematic floor plans (Ground, Mezzanine, Master 3D) and interactive zoom controls.
   - Built-in Bank Mortgage Simulator (`MortgageCalculator`) with dynamic slider adjustments for property price, down payment, loan tenor, and interest rates.
   - Direct Private Tour & Consultation Booking Form (`ConsultationForm`) connected to the backend leads database and instant WhatsApp chat.

2. **Full CRUD Control Room (`/admin` and Modal)**:
   - **Create**: Add new real estate properties with custom pricing, specs, features, and direct media upload.
   - **Read**: Live-synced listing catalog with dual database fallback.
   - **Update**: Edit any listing's metadata, status (`Available`, `Reserved`, `Sold`), pricing, and media URLs.
   - **Delete**: Remove properties with instant catalog synchronization.
   - **Leads Inbox**: Monitor incoming consultation requests and private tour inquiries with one-click WhatsApp client contact.

3. **Cloud & Storage Infrastructure**:
   - **Database**: Supabase PostgreSQL database with pre-configured schema, Row Level Security (RLS), and automatic fallback to local JSON persistence when offline or during initial zero-config setups.
   - **Media Storage**: Cloudflare R2 storage integration via AWS S3 SDK (`@aws-sdk/client-s3`) with fallback to local `public/uploads/` directory.

---

## 🚀 Quick Start

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/ilhammu29/real-estate-001.git
cd real-estate-001
npm install
```

### 2. Environment Configuration
Create a `.env.local` file based on `.env.example`:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Cloudflare R2 Storage Configuration
CLOUDFLARE_R2_ACCOUNT_ID=your-cloudflare-account-id
CLOUDFLARE_R2_ACCESS_KEY_ID=your-r2-access-key-id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
CLOUDFLARE_R2_BUCKET_NAME=real-estate-media
CLOUDFLARE_R2_PUBLIC_DOMAIN=https://pub-xxxxxx.r2.dev
```

*(Note: The app is equipped with dual-mode fallback, so it runs seamlessly even before cloud credentials are provided).*

### 3. Database Migration (Supabase)
Run the SQL queries provided in `supabase/schema.sql` and `supabase/seed.sql` inside the Supabase SQL Editor:
- Creates `properties` table with indices.
- Creates `inquiries` table with status workflow.
- Seeds 6 initial luxury villas and residences.
- Configures Row Level Security (RLS) policies.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── app/
│   ├── admin/page.tsx             # Standalone Admin Control Panel
│   ├── api/
│   │   ├── properties/            # REST API: GET, POST
│   │   ├── properties/[id]/       # REST API: GET, PUT, DELETE
│   │   ├── inquiries/             # REST API: GET, POST
│   │   └── upload/                # Image Upload: Cloudflare R2 / Local
│   ├── globals.css                # Plus Jakarta Sans, notch curves, Tailwind
│   ├── layout.tsx                 # Root layout with Google Fonts
│   └── page.tsx                   # Main Landing Page
├── components/
│   ├── AdminCrudModal.tsx         # Full CRUD & Leads dialog
│   ├── Amenities.tsx              # Exclusive architectural amenities
│   ├── ConsultationForm.tsx       # Booking & lead generation
│   ├── FloorPlanModal.tsx         # CAD Blueprint schematic viewer
│   ├── Footer.tsx                 # Edge-to-edge luxury footer
│   ├── Hero.tsx                   # NenyaHome hero with reference villa
│   ├── MortgageCalculator.tsx     # Interactive loan & installment calculator
│   ├── Navbar.tsx                 # Curved notch header
│   ├── Philosophy.tsx             # Craft & architectural manifesto
│   └── PropertyCatalog.tsx        # Dynamic listing grid & filter
├── lib/
│   ├── db.ts                      # Dual-mode persistence layer (Supabase + Local)
│   ├── initial-data.ts            # Seed properties data
│   ├── r2.ts                      # Cloudflare R2 client + fallback
│   ├── supabase.ts                # Supabase client helper
│   └── types.ts                   # TypeScript interfaces
├── supabase/
│   ├── schema.sql                 # PostgreSQL DDL, indices, & RLS
│   └── seed.sql                   # Initial catalog records
└── public/
    └── images/                    # HD optimized architectural assets
```

---

## 🚢 Deployment

Deploy directly to Vercel:
```bash
vercel --prod
```

Or connect the repository via GitHub on [vercel.com](https://vercel.com).
