# How to Edit the Website - Perth Long-Term Car Hire

This guide explains how to make common changes to the website.

## 📍 Quick File Reference

### Most Important File
**`app/lib/constants.ts`** - Contains ALL business information
- Business details (name, phone, email, location)
- Fleet information (vehicles)
- Pricing details
- FAQ questions and answers
- How it works steps

---

## 🔧 Common Tasks

### 1. Change Business Phone Number

Edit `app/lib/constants.ts`:
```typescript
export const BUSINESS = {
  phone: '0400 000 000',  // ← Change this
};
```

**Where it appears:**
- Navigation (mobile menu)
- Footer
- Home page (CTA section)
- Contact page
- All pages with phone links

---

### 2. Change Email Address

Edit `app/lib/constants.ts`:
```typescript
export const BUSINESS = {
  email: 'testrent@gmail.com',  // ← Change this
};
```

**Where it appears:**
- Footer
- Contact page
- All email links throughout site

---

### 3. Update Business Location

Edit `app/lib/constants.ts`:
```typescript
export const BUSINESS = {
  location: 'Mirrabooka, WA',  // ← Change this
};
```

---

### 4. Change Vehicle Information

Edit `app/lib/constants.ts`, `FLEET` array:

```typescript
{
  id: 1,
  name: 'Toyota Vitz',        // ← Vehicle name
  category: 'Economy',         // ← Category
  weeklyPrice: 229,            // ← Price per week
  description: '...',          // ← Description
  seats: 5,                    // ← Number of seats
  transmission: 'Automatic',   // ← Transmission type
  fuelType: 'Petrol',         // ← Fuel type
  features: [                  // ← List of features
    'Air Conditioning',
    'Power Steering',
  ],
  image: '🚗',                // ← Emoji icon
}
```

**To add a new vehicle:**
```typescript
export const FLEET = [
  // ... existing vehicles ...
  {
    id: 5,
    name: 'New Vehicle Name',
    category: 'Category',
    weeklyPrice: 350,
    description: 'Description here',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    features: ['Feature 1', 'Feature 2'],
    image: '🚗',
  },
];
```

---

### 5. Update Pricing

Edit `app/lib/constants.ts`, `PRICING_DETAILS`:

```typescript
export const PRICING_DETAILS = {
  weeklyRates: { /* auto-generated from FLEET */ },
  bond: 500,                    // ← Security bond amount
  kmIncluded: '3000 km',        // ← Free km per week
  excessKmRate: 0.15,          // ← $ per excess km
  insuranceOptions: [
    { type: 'Third Party', price: 10 },  // ← Price per week
    { type: 'Comprehensive', price: 25 },
  ],
  conditions: [
    'Minimum rental period: 6 weeks',
    // ... add or remove conditions ...
  ],
};
```

---

### 6. Add/Edit FAQ Questions

Edit `app/lib/constants.ts`, `FAQ` array:

```typescript
export const FAQ = [
  {
    id: 1,
    question: 'What is the minimum rental period?',
    answer: 'The minimum rental period is 6 weeks...',
  },
  // Add new question:
  {
    id: 9,
    question: 'New question here?',
    answer: 'Answer to the new question...',
  },
];
```

---

### 7. Modify Home Page Hero Section

Edit `app/page.tsx`:

```typescript
// Change hero title
<h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
  Long-Term Car Rental in Perth  {/* ← Edit this */}
</h1>

// Change hero subtitle
<p className="text-xl text-blue-100 mb-6">
  Your new subtitle here...  {/* ← Edit this */}
</p>
```

---

### 8. Change Colors

Colors are used throughout the site. Common ones:

```typescript
// Blue (primary)
className="bg-blue-600"  // Change 600 to: 400, 500, 700, 800

// Gray (secondary)
className="text-gray-600"  // Change to: 400, 500, 700, 800

// Green (success)
className="text-green-600"  // Change to: 400, 500, 700, 800
```

**To change blue throughout site**, search and replace:
- `blue-600` → your color
- `blue-700` → your color-dark
- `blue-50` → your color-light
- `blue-100` → your color-lighter

---

### 9. Edit "How It Works" Steps

Edit `app/lib/constants.ts`, `HOW_IT_WORKS` array:

```typescript
export const HOW_IT_WORKS = [
  {
    id: 1,
    title: 'Browse Our Fleet',      // ← Step title
    description: 'View our...',     // ← Step description
    icon: '🔍',                     // ← Emoji icon
  },
  // ... more steps ...
];
```

---

### 10. Change Navigation Links

Edit `app/components/Navigation.tsx`:

```typescript
<Link href="/" className="...">
  Home  {/* ← Link text */}
</Link>
<Link href="/fleet" className="...">
  Fleet
</Link>
```

---

### 11. Update Footer

Edit `app/components/Footer.tsx`:

```typescript
// Change footer text
<p className="text-gray-400 text-sm">
  Your footer description here...  {/* ← Edit */}
</p>

// Change footer links
<li><Link href="/fleet" className="...">Fleet</Link></li>
```

---

### 12. Modify Contact Form

Edit `app/(pages)/contact/page.tsx`:

```typescript
// Add new form field:
<div>
  <label htmlFor="newfield">New Field</label>
  <input
    type="text"
    id="newfield"
    name="newfield"
    value={formData.newfield}
    onChange={handleChange}
  />
</div>

// Update form state:
const [formData, setFormData] = useState({
  // ... existing fields ...
  newfield: '',  // ← Add new field
});
```

---

## 🎨 Text Content to Customize

### Home Page
- Hero title: `app/page.tsx` line ~13
- Hero subtitle: `app/page.tsx` line ~17
- Feature titles: `app/page.tsx` lines ~54-70

### Fleet Page
- Fleet title: `app/(pages)/fleet/page.tsx` line ~9
- Fleet description: `app/(pages)/fleet/page.tsx` line ~10

### Pricing Page
- Pricing title: `app/(pages)/pricing/page.tsx` line ~9
- Pricing description: `app/(pages)/pricing/page.tsx` line ~10

### Contact Page
- Form title: `app/(pages)/contact/page.tsx` line ~50
- Form description: `app/(pages)/contact/page.tsx` line ~52

---

## 📝 Important Notes

1. **Always test changes locally first:**
```bash
npm run dev
# Check http://localhost:3000
```

2. **Build before deploying:**
```bash
npm run build
# Look for errors or warnings
```

3. **Keep backups of constants.ts** if making major changes

4. **Format dates and prices consistently:**
   - Prices: Always include $ symbol
   - Dates: Use full month names (e.g., "January")
   - Phone: Use format "0400 000 000"

5. **Test all pages after making changes:**
   - Home
   - Fleet
   - Pricing
   - How It Works
   - FAQ
   - Contact

---

## 🐛 Common Mistakes to Avoid

1. **Forgetting closing tags**
```javascript
// ❌ Wrong
<h1>Hello
<p>World</p>

// ✅ Correct
<h1>Hello</h1>
<p>World</p>
```

2. **Mismatched quotes**
```javascript
// ❌ Wrong
className={"bg-blue-600'"}

// ✅ Correct
className={"bg-blue-600"}
```

3. **Missing commas in arrays**
```javascript
// ❌ Wrong
{
  id: 1,
  name: 'Vehicle'
  price: 229
}

// ✅ Correct
{
  id: 1,
  name: 'Vehicle',
  price: 229,
}
```

4. **Not updating imports when renaming files**
```javascript
// If you rename a file, update the import!
import Card from '@/components/Card';
```

---

## 📱 Testing After Changes

1. **Desktop View:**
   - Open http://localhost:3000
   - Check all pages

2. **Mobile View:**
   - Chrome DevTools → Toggle Device Toolbar
   - Test on phone-sized screen

3. **Tablet View:**
   - Test responsive behavior
   - Check navigation menu

---

## 🚀 Deploying Changes

After editing:

```bash
# 1. Build locally
npm run build

# 2. If successful, deploy
vercel  # or your deployment command
```

---

## 📞 Need Help?

If something breaks:

1. **Check the error message** in console
2. **Undo your last change** (use git or copy-paste)
3. **Test locally first** (`npm run dev`)
4. **Review the file structure** to make sure nothing moved

---

## Quick Edit Checklist

- [ ] Made changes to constants.ts or relevant file
- [ ] Tested locally with `npm run dev`
- [ ] Checked all affected pages
- [ ] Verified no console errors
- [ ] Tested on mobile view
- [ ] Built with `npm run build`
- [ ] Deployed changes

---

**Remember**: Most changes are in `app/lib/constants.ts`! Start there for business information.
