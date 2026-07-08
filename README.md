# Multiple Choice — Bangladesh E-Commerce Store

A beautiful e-commerce storefront for clothing and jewelry, built for Bangladesh with:
- 💵 Cash on Delivery
- 📱 bKash, Nagad, Rocket payments
- 🏠 Dhaka & Outside Dhaka delivery rates
- 📦 Admin orders dashboard

## Deployment Guide

### 1. Set up Neon Database
1. Go to https://neon.tech and create a free account
2. Create a new project
3. Copy your database connection string

### 2. Deploy to Vercel
1. Push this code to GitHub
2. Go to https://vercel.com
3. Import your GitHub repository
4. Add environment variable:
   - Name: `DATABASE_URL`
   - Value: Your Neon connection string
5. Deploy!

### 3. Seed the Database
After deployment, run the seed script or access `/api/seed` to populate demo products.

### 4. Configure Your Payment Numbers
Edit `src/components/CheckoutForm.tsx` and update:
```javascript
const paymentNumbers = {
  bkash: "01XXXXXXXXX",  // Your bKash number
  nagad: "01XXXXXXXXX",  // Your Nagad number
  rocket: "01XXXXXXXXX", // Your Rocket number
};
```

## URLs
- **Store:** `your-domain.vercel.app`
- **Admin Orders:** `your-domain.vercel.app/admin/orders`

## Customization
- Products: Edit `src/db/seed.ts`
- Delivery charges: Edit `src/components/CheckoutForm.tsx`
- Store name: Edit `src/app/layout.tsx` and `src/components/Header.tsx`
