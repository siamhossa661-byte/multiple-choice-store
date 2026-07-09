# 🌐 Multiple Choice — Website Guide
## Keep this file safe! Share it with any AI assistant to get help updating your website.

---

## 📌 BASIC INFO

- **Website URL:** https://multiple-choice-store-ptqx.vercel.app
- **Admin Panel:** https://multiple-choice-store-ptqx.vercel.app/admin/orders
- **Admin Password:** MultipleChoice2026!
- **GitHub Repo:** https://github.com/siamhossa661-byte/multiple-choice-store
- **Hosting:** Vercel (free, automatic deploy from GitHub)
- **Database:** Neon PostgreSQL (free)
- **Framework:** Next.js 16 (React)

---

## 👤 OWNER DETAILS

- **Name:** Siam Hossain
- **Email:** siamhossa661@gmail.com
- **Phone/Payment:** 01864589805 (bKash/Nagad/Rocket)
- **Facebook:** https://www.facebook.com/share/17VUoU2P8a/?mibextid=wwXIfr
- **Instagram:** https://www.instagram.com/multiple_choice_pprs
- **TikTok:** https://www.tiktok.com/@multiplechoice1111

---

## 🛍️ CURRENT PRODUCTS (as of July 2026)

### Dresses
| Product | Price | Image |
|---------|-------|-------|
| One Piece | ৳890 | https://i.ibb.co/0RJHGXRn/DB404-E0-B-C37-D-480-C-AF21-52550-FD3-F7-D0.jpg |
| Two Piece | ৳1,350 | https://i.ibb.co/4ZxGgbX9/AF9-DADEF-06-B7-41-A4-9-B71-A583971-B94-DA.jpg |
| Premium Two Piece | ৳1,750 | https://i.ibb.co/N4Ss5nc/CF8-CDE58-65-CE-4221-AAD2-387391-BB11-AE.jpg |

### Jewelry
| Product | Price | Image |
|---------|-------|-------|
| Bow Earring | ৳200 | /images/bow-earring.jpeg |
| Earring | ৳100 | /images/earring-100.jpeg |
| Earring | ৳350 | /images/earring-350.jpeg |

---

## 📁 IMPORTANT FILES (where to find things)

| What you want to change | File to edit |
|------------------------|--------------|
| **Add/remove products** | `src/app/api/seed/route.ts` and `src/lib/queries.ts` |
| **Homepage layout & images** | `src/app/page.tsx` |
| **Shop page** | `src/app/shop/page.tsx` |
| **Product detail page** | `src/app/product/[slug]/page.tsx` |
| **Admin orders page** | `src/app/admin/orders/page.tsx` |
| **Admin password** | `src/components/AdminLogin.tsx` (search for ADMIN_PASSWORD) |
| **Checkout & payment number** | `src/components/CheckoutForm.tsx` |
| **Footer & social links** | `src/components/Footer.tsx` |
| **Header/navigation** | `src/components/Header.tsx` |
| **Product card design** | `src/components/ProductCard.tsx` |
| **Database tables** | `src/db/schema.ts` |
| **Database seed (products)** | `src/db/seed.ts` |
| **Order API** | `src/app/api/orders/route.ts` |
| **Allowed image domains** | `next.config.ts` |
| **Product images (local)** | `public/images/` folder |

---

## 🔧 HOW TO MAKE COMMON CHANGES

### To add a new product:
1. Add it to `src/app/api/seed/route.ts` (database seed)
2. Add it to `src/lib/queries.ts` (fallback data)
3. If using a local image, add it to `public/images/`
4. After deploying, visit `/api/seed` to update the database

### To change a product price:
1. Edit `src/app/api/seed/route.ts` — find the product, change the price
2. Edit `src/lib/queries.ts` — find the product, change the price
3. Deploy and visit `/api/seed`

### To change the hero banner image:
1. Add your image to `public/images/`
2. Edit `src/app/page.tsx` — find the hero Image component, change the `src`

### To change social media links:
1. Edit `src/components/Footer.tsx`

### To change the admin password:
1. Edit `src/components/AdminLogin.tsx`
2. Change the `ADMIN_PASSWORD` value

### To change the payment number:
1. Edit `src/components/CheckoutForm.tsx`
2. Change the `paymentNumbers` object

---

## 🚀 HOW TO DEPLOY CHANGES

1. Edit files on GitHub (click the ✏️ pencil icon on any file)
2. Click "Commit changes"
3. Vercel automatically deploys in 1-2 minutes
4. If you changed products, visit `/api/seed` to update the database

---

## 💻 HOW TO ASK AI FOR HELP

Copy-paste this message to any AI assistant (ChatGPT, Arena AI, etc.):

> "Hi! I have a Next.js e-commerce website deployed on Vercel from GitHub.
> I'm attaching my website guide file that has all the details about my website.
> Please read it and help me with: [DESCRIBE WHAT YOU WANT TO CHANGE]
> 
> My GitHub repo: https://github.com/siamhossa661-byte/multiple-choice-store
> 
> Please make the changes and push them to my GitHub. I can give you a GitHub token if needed."

---

## 🔑 GITHUB TOKEN (for AI to push changes)

When an AI helper needs to push code to your GitHub:
1. Go to: https://github.com/settings/tokens/new
2. Note: `update-website`
3. Expiration: 7 days
4. Check: ✅ `repo`
5. Click "Generate token"
6. Share the token with the AI
7. **DELETE the token after the work is done!**

---

## 📦 ORDER MANAGEMENT

- **View orders:** https://multiple-choice-store-ptqx.vercel.app/admin/orders
- **Password:** MultipleChoice2026!
- **What you see:** Customer name, phone, address, items, payment method, transaction ID, total
- **Delivery charges:** ৳60 inside Dhaka, ৳120 outside Dhaka
- **Payment methods:** Cash on Delivery, bKash, Nagad, Rocket
- **Payment number shown to customers:** 01864589805

---

## 📧 EMAIL NOTIFICATIONS

- Order emails sent to: siamhossa661@gmail.com
- Uses Gmail SMTP with App Password
- Configured in: `src/app/api/orders/route.ts`
- If emails stop working, create a new Gmail App Password at: https://myaccount.google.com/apppasswords

---

## ⚠️ TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| Website shows old products | Visit `/api/seed` to re-seed database |
| Admin page crashes | Check database connection in `src/db/index.ts` |
| Images not showing | Check `next.config.ts` has the image domain |
| Vercel build fails | Check for code errors, look at Vercel deployment logs |
| Emails not sending | Create new Gmail App Password |
| Forgot admin password | Edit `src/components/AdminLogin.tsx` |

---

## 🏗️ TECH STACK

- **Frontend:** Next.js 16 + React + Tailwind CSS
- **Database:** Neon PostgreSQL + Drizzle ORM
- **Hosting:** Vercel (free Hobby plan)
- **Code:** GitHub (free)
- **Images:** ibb.co (external) + public/images/ (local)
- **Email:** Nodemailer + Gmail SMTP

---

*Last updated: July 9, 2026*
*Created by AI assistant for Siam Hossain*
