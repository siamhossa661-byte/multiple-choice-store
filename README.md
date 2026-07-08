<img width="1284" height="2282" alt="AF9DADEF-06B7-41A4-9B71-A583971B94DA" src="https://github.com/user-attachments/assets/6af7d60e-71f5-4873-82d3-13542a04ce7e" />
<img width="1284" height="2282" alt="CF8CDE58-65CE-4221-AAD2-387391BB11AE" src="https://github.com/user-attachments/assets/4bb4f0bc-469a-42b2-8636-8aaf1e76fefa" />
<img width="1283" height="1906" alt="DB404E0B-C37D-480C-AF21-52550FD3F7D0" src="https://github.com/user-attachments/assets/e9950e97-c7df-4dd2-9d99-6d125dfc6de3" />
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
