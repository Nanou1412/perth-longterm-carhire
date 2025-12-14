# Perth Long-Term Car Hire - Website

A modern, responsive website for Perth Long-Term Car Hire built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

  - Home (Hero, value proposition, fleet overview)
  - Fleet (Detailed vehicle listings)
  - Pricing (Transparent pricing breakdown)
  - How It Works (Simple 6-step process)
  - FAQ (Interactive accordion)
  - Contact (Form + contact details)

## Enquiries API (file uploads)

This project includes a server API at `POST /api/enquiries` that accepts a `FormData` payload with the following fields:

- `name`, `email`, `phone`, `subject`, `message`, `vehicleInterest`, `rentalDuration`
- Optional files: `idFile`, `licenseFile` (PNG, JPG or PDF, max 5MB each)

By default uploaded files and a JSON metadata file are stored in a local `uploads/` folder (useful for development). To enable upload to AWS S3, set the following environment variables in your deployment environment:

```
AWS_S3_BUCKET=your-bucket-name
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=ap-southeast-2
```

If you enable S3 support you must install the AWS SDK client in your project:

```bash
npm install @aws-sdk/client-s3
```

Note: local `uploads/` is ephemeral on serverless platforms — for production use S3 or another durable storage.

## Long-term booking & recurring payments (Stripe)

This project includes a bookings system with weekly recurring payments implemented via Stripe. Files added:

- `prisma/schema.prisma` — database models (Vehicle, Booking, Payment, Setting)
- `lib/prisma.ts` — Prisma client wrapper
- `lib/stripe.ts` — Stripe helper
- `app/api/bookings/route.ts` — create bookings and create Stripe subscription
- `app/api/bookings/[token]/route.ts` — fetch booking by token (client)
- `app/api/webhooks/stripe/route.ts` — Stripe webhook to record payments and update bookings
- `app/api/admin/reservations/route.ts` — admin listing of bookings (protected by `ADMIN_SECRET`)
- `app/api/admin/settings/route.ts` — admin settings (editable texts)
- `app/(pages)/bookings/new/page.tsx` — client booking page with Stripe Elements
- `app/(pages)/account/reservations/page.tsx` — client view of reservation + payments
- `app/(pages)/admin/reservations/page.tsx` — admin dashboard list
- `app/(pages)/insurance/page.tsx` — insurance info editable from admin settings

Environment variables to add (local .env):

```
DATABASE_URL="file:./dev.db"
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...   # optional for local verification
ADMIN_SECRET=some_admin_secret   # used by admin API routes
```

Install additional packages:

```bash
npm install prisma @prisma/client stripe @stripe/stripe-js @stripe/react-stripe-js
npx prisma generate
npx prisma migrate dev --name init
```

How to test payments locally:

1. Configure Stripe test keys in `.env`.
2. Run the dev server: `npm run dev`.
3. Open `/bookings/new` to create a booking and collect test card details using Stripe's test cards (e.g. `4242 4242 4242 4242`).
4. Configure webhook forwarding in Stripe CLI to `http://localhost:3000/api/webhooks/stripe` and set `STRIPE_WEBHOOK_SECRET` accordingly.

Notes & recommendations:
- For production, use a managed database (Postgres) and durable file storage (S3).
- Ensure HTTPS and secure handling of PII. Implement background retry & admin notifications for failed payments.


## 📋 Tech Stack
- **Form Handling**: React Hooks

## 🏢 Business Details

- **Business Name**: Perth Long-Term Car Hire
- **Location**: Mirrabooka, WA
- **Service Area**: Perth & Surrounds
- **Phone**: 0400 000 000
- **Email**: testrent@gmail.com
- **Minimum Rental**: 6 weeks

## 🚗 Fleet

1. **Toyota Vitz** - $229/week
   - Compact, fuel-efficient city car
   - Perfect for individuals or couples

2. **Toyota Corolla** - $279/week
   - Reliable sedan for comfortable driving
   - Ideal for families

3. **Toyota RAV4 Hybrid** - $379/week
   - Eco-friendly SUV
   - Excellent fuel efficiency

4. **Toyota HiAce** - $459/week
   - Spacious van for larger groups
   - Great for deliveries

## 💰 Pricing

- **Security Bond**: $500 (refundable)
- **Included Kilometers**: 3,000 km per week
- **Excess Kilometers**: $0.15/km
- **Insurance Options**:
  - Third Party: $10/week
  - Comprehensive: $25/week

## 📁 Project Structure

```
app/
├── components/           # Reusable UI components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── Card.tsx
│   └── CTAButton.tsx
├── lib/
│   └── constants.ts      # Business data & constants
├── (pages)/              # App routes
│   ├── fleet/
│   ├── pricing/
│   ├── how-it-works/
│   ├── faq/
│   └── contact/
├── page.tsx             # Home page
├── layout.tsx           # Root layout
└── globals.css          # Global styles
```

## 🛠️ Installation

1. **Navigate to the project**
```bash
cd /Users/norchenekrb/Desktop/perth-longterm-carhire
```

2. **Install dependencies** (already done)
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🎯 Pages

### Home (/)
- Hero section with value proposition
- Key features highlight
- Fleet showcase
- Minimum rental period information
- How it works preview
- Contact CTA

### Fleet (/fleet)
- Detailed vehicle listings
- Vehicle specifications (seats, transmission, fuel type)
- Features for each vehicle
- Weekly pricing
- Rental requirements and inclusions

### Pricing (/pricing)
- Weekly rates table
- Pricing components (bond, kilometers, insurance)
- Rental conditions
- Sample price breakdown (6-week example)

### How It Works (/how-it-works)
- 6-step rental process
- Required documents
- Eligibility requirements
- Delivery & return options
- Important reminders

### FAQ (/faq)
- Interactive accordion with common questions
- Topics overview
- Multiple contact options

### Contact (/contact)
- Contact form with fields for:
  - Full name, email, phone
  - Vehicle interest
  - Rental duration
  - Subject & message
- Contact information card
- Multiple contact methods

## 🎨 Design Features

- **Color Scheme**: Blue primary (#2563eb), gray secondary
- **Typography**: Clean, readable sans-serif fonts
- **Spacing**: Consistent padding and margins
- **Responsive Grid**: Mobile-first approach
- **Interactive Elements**: Hover states, smooth transitions
- **Accessibility**: Semantic HTML, proper form labels

## 🔧 Customization

### Update Business Details
Edit `app/lib/constants.ts`:
```typescript
export const BUSINESS = {
  name: 'Perth Long-Term Car Hire',
  phone: '0400 000 000',
  email: 'testrent@gmail.com',
  // ... other details
};
```

### Add New Vehicles
Add to `FLEET` array in `app/lib/constants.ts`

### Modify Pricing
Update `PRICING_DETAILS` in `app/lib/constants.ts`

### Add FAQ Items
Add to `FAQ` array in `app/lib/constants.ts`

## 📝 Form Submission

The contact form is currently set up with client-side validation and success feedback. To connect to a backend:

1. Update the `handleSubmit` function in `app/(pages)/contact/page.tsx`
2. Add API endpoint call
3. Implement server-side validation

## 📱 Mobile Responsive

- All pages are fully responsive
- Navigation adapts for mobile devices
- Touch-friendly button sizes
- Optimized font sizes

## 🔍 SEO

- Semantic HTML structure
- Meta tags for pages
- Descriptive page titles and descriptions
- Open Graph tags for social sharing

## 🚀 Deployment

This site is ready to deploy on:
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Any Node.js hosting**

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 📄 License

Created for Perth Long-Term Car Hire.

## ✅ Production Checklist

- ✅ All pages created and functional
- ✅ Responsive design implemented
- ✅ Contact form with validation
- ✅ Navigation and footer
- ✅ Fleet and pricing information
- ✅ FAQ section
- ✅ How it works guide
- ✅ SEO optimization
- ✅ Fast load times
- ✅ Clean, maintainable code

## 📧 Contact

For questions or updates, contact:
- Phone: 0400 000 000
- Email: testrent@gmail.com
- Location: Mirrabooka, WA
