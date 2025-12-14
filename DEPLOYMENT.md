# Deployment Guide - Perth Long-Term Car Hire

This guide covers various deployment options for your Next.js website.

## Quick Deployment (Recommended: Vercel)

### Option 1: Vercel (Easiest)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd /Users/norchenekrb/Desktop/perth-longterm-carhire
vercel
```

3. **Follow prompts**
   - Confirm project name
   - Link to GitHub (optional)
   - Vercel will automatically deploy

**Benefits**: 
- Free tier available
- Automatic deployments from Git
- Built-in analytics
- Custom domain support
- SSL certificate included

---

## Option 2: Netlify

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build the project**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod --dir=.next
```

**Benefits**:
- Free tier
- Drag-and-drop deployment
- Form handling built-in
- Edge Functions available

---

## Option 3: AWS Amplify

1. **Install AWS CLI**
```bash
pip install awscli
```

2. **Configure AWS credentials**
```bash
aws configure
```

3. **Deploy**
```bash
amplify init
amplify publish
```

---

## Option 4: Self-Hosted (VPS/Dedicated)

### Linux Server Deployment

1. **SSH into your server**
```bash
ssh user@your-server.com
```

2. **Clone repository** (if using Git)
```bash
git clone https://github.com/yourusername/perth-longterm-carhire.git
cd perth-longterm-carhire
```

3. **Install Node.js** (if not installed)
```bash
curl https://nodejs.org/dist/v20.0.0/node-v20.0.0-linux-x64.tar.xz | tar xJ
```

4. **Install dependencies**
```bash
npm install
```

5. **Build**
```bash
npm run build
```

6. **Start with PM2** (process manager)
```bash
npm install -g pm2
pm2 start "npm start" --name "perth-car-hire"
pm2 startup
pm2 save
```

7. **Setup Nginx** (reverse proxy)
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Option 5: Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Build and Run

```bash
# Build image
docker build -t perth-car-hire .

# Run container
docker run -p 3000:3000 perth-car-hire
```

---

## Environment Variables

Create `.env.local` if needed:

```env
# Optional: API endpoints
NEXT_PUBLIC_API_URL=https://your-api.com
```

---

## Custom Domain Setup

### For All Providers

1. **Purchase domain** from:
   - Namecheap
   - GoDaddy
   - Route53
   - Any domain registrar

2. **Update DNS records** to point to your hosting provider
   - Vercel/Netlify: Check provider docs for DNS records
   - Self-hosted: Point to your server IP

3. **Enable SSL/HTTPS**
   - Vercel/Netlify: Automatic
   - Self-hosted: Use Let's Encrypt (certbot)

```bash
sudo apt-get install certbot nginx-certbot
sudo certbot certonly --nginx -d yourdomain.com
```

---

## Form Handling Setup

Currently, the contact form shows a success message but doesn't send data anywhere.

### Option A: Use a Form Service

#### SendGrid
```bash
npm install @sendgrid/mail
```

Update `app/(pages)/contact/page.tsx`:
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// In handleSubmit:
await sgMail.send({
  to: 'testrent@gmail.com',
  from: 'noreply@yourdomain.com',
  subject: formData.subject,
  html: `<p>${formData.message}</p>`,
});
```

#### Formspree
```javascript
// In form tag, change action to:
action="https://formspree.io/f/YOUR_FORM_ID"
method="POST"
```

### Option B: Create API Route

Create `app/api/contact/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.json();
  
  // Send email using your service
  // Save to database
  // etc.
  
  return NextResponse.json({ success: true });
}
```

---

## Performance Optimization

### Before Deployment

1. **Check Lighthouse Score**
```bash
npm run build
npm start
# Open Chrome DevTools > Lighthouse
```

2. **Optimize Images**
   - Already done with Next.js

3. **Minify CSS/JS**
   - Automatic with Next.js build

4. **Enable compression**
   - Set in Nginx/server config

---

## Monitoring & Analytics

### Add Google Analytics
```typescript
// In app/layout.tsx
import Script from 'next/script';

<Script
  strategy="afterInteractive"
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
/>
<Script
  id="google-analytics"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    `,
  }}
/>
```

### Use Vercel Analytics
- Automatic if deployed on Vercel
- Real user monitoring included

---

## Backup & Updates

### Regular Backups
- Use Git for code backup
- Cloud storage for database backups

### Keep Dependencies Updated
```bash
npm update
npm audit fix
```

---

## Post-Deployment Checklist

- [ ] Domain is accessible
- [ ] SSL certificate is valid
- [ ] All pages load correctly
- [ ] Contact form works
- [ ] Navigation works
- [ ] Responsive design verified
- [ ] Images load properly
- [ ] Performance is good (Lighthouse score > 90)
- [ ] SEO metadata is visible
- [ ] Analytics tracking works

---

## Troubleshooting

### Pages Not Found
- Check Next.js routes match file structure
- Ensure `(pages)` folder structure is correct

### Styling Not Applied
- Clear browser cache
- Rebuild project: `npm run build`

### Form Not Working
- Check browser console for errors
- Verify form fields match state variable names
- Test in development first

### Slow Performance
- Check Lighthouse scores
- Optimize images
- Enable caching headers
- Use CDN

---

## Support

For issues or questions:
- Phone: 0400 000 000
- Email: testrent@gmail.com
- Location: Mirrabooka, WA

---

## Deployment Comparison

| Provider | Cost | Ease | Performance | Support |
|----------|------|------|-------------|---------|
| **Vercel** | Free/$15/mo | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Excellent |
| **Netlify** | Free/$19/mo | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Great |
| **AWS Amplify** | Pay-as-you-go | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Good |
| **Self-Hosted** | Varies | ⭐⭐⭐ | ⭐⭐⭐⭐ | DIY |

**Recommendation**: Start with Vercel (free tier), upgrade as needed.

---

**Ready to deploy!** Choose your preferred option and follow the steps above.
