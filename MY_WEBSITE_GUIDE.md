# 🌐 Multiple Choice — Complete Website Guide
## ⭐ SAVE THIS FILE! Share it with any AI to get instant help with your website.

---

## 📌 BASIC INFO

- **Website URL:** https://multiple-choice-store-ptqx.vercel.app
- **Admin Panel:** https://multiple-choice-store-ptqx.vercel.app/admin/orders
- **Admin Password:** `MultipleChoice2026!`
- **GitHub Repo:** https://github.com/siamhossa661-byte/multiple-choice-store
- **Hosting:** Vercel (free, automatic deploy from GitHub)
- **Database:** Neon PostgreSQL (free)
- **Framework:** Next.js 16 (React)

---

## 👤 OWNER DETAILS

- **Name:** Siam Hossain
- **Email (order notifications):** siamhossa661@gmail.com
- **Phone/Payment Number:** 01864589805 (bKash/Nagad/Rocket)
- **Facebook:** https://www.facebook.com/share/17VUoU2P8a/?mibextid=wwXIfr
- **Instagram:** https://www.instagram.com/multiple_choice_pprs
- **TikTok:** https://www.tiktok.com/@multiplechoice1111

---

## 🛍️ CURRENT PRODUCTS (as of July 2026)

### Dresses
| Product | Price | Images |
|---------|-------|--------|
| One Piece | ৳890 | ibb.co main + 3 local (onepiece-2/3/4.jpeg) |
| Two Piece | ৳1,350 | ibb.co main + 3 local (twopiece-2/3/4.jpeg) |
| Premium Two Piece | ৳1,750 | ibb.co main + 3 local (premium-2/3/4.jpeg) |

### Jewelry
| Product | Price | Image |
|---------|-------|-------|
| Bow Earring | ৳200 | /images/bow-earring.jpeg |
| Earring | ৳100 | /images/earring-100.jpeg |
| Earring | ৳350 | /images/earring-350.jpeg |

Each dress product has **4 images** (customers can click thumbnails to see different angles).

---

## 🚚 DELIVERY SETTINGS

- **First 5 orders:** FREE delivery (tracked automatically from database)
- **Dhaka (inside):** ৳80
- **Outside Dhaka:** ৳130
- **Free delivery banner:** Shows green banner on checkout when active
- **API to check status:** `/api/free-delivery-status`
- **To reset free delivery counter:** Visit `/api/seed` (clears all orders + re-seeds products)

---

## 📧 EMAIL NOTIFICATIONS

- **Sent to:** siamhossa661@gmail.com
- **Uses:** Gmail SMTP with App Password (hardcoded in orders/route.ts)
- **When:** Every time someone places an order
- **Contains:** Customer name, phone, address, items, payment method, TrxID, total
- **If emails stop working:** Create a new Gmail App Password at https://myaccount.google.com/apppasswords

---

## 💳 PAYMENT METHODS

- Cash on Delivery (COD)
- bKash (Send Money to: 01864589805)
- Nagad (Send Money to: 01864589805)
- Rocket (Send Money to: 01864589805)

---

## 📁 IMPORTANT FILES

| What you want to change | File to edit |
|------------------------|--------------|
| **Add/remove products** | `src/app/api/seed/route.ts` AND `src/lib/queries.ts` |
| **Homepage layout/images** | `src/app/page.tsx` |
| **Hero banner image** | `public/images/hero-banner.jpeg` |
| **Shop page** | `src/app/shop/page.tsx` |
| **Product detail page** | `src/app/product/[slug]/page.tsx` |
| **Admin orders page** | `src/app/admin/orders/page.tsx` |
| **Admin password** | `src/components/AdminLogin.tsx` (search ADMIN_PASSWORD) |
| **Checkout & payment** | `src/components/CheckoutForm.tsx` |
| **Delivery charges** | `src/components/CheckoutForm.tsx` (search "baseShipping") |
| **Free delivery limit** | `src/app/api/free-delivery-status/route.ts` (FREE_DELIVERY_LIMIT) |
| **Footer & social links** | `src/components/Footer.tsx` |
| **Header/navigation** | `src/components/Header.tsx` |
| **Product card design** | `src/components/ProductCard.tsx` |
| **Product images** | `public/images/` folder |
| **Email settings** | `src/app/api/orders/route.ts` |
| **Database tables** | `src/db/schema.ts` |
| **Allowed image domains** | `next.config.ts` |

---

## 🔧 HOW TO MAKE COMMON CHANGES

### Add a new product:
1. Add to `src/app/api/seed/route.ts` (database seed)
2. Add to `src/lib/queries.ts` (fallback data)
3. Add images to `public/images/` (compress with sharp first)
4. Deploy, then visit `/api/seed` to update database

### Change a product price:
1. Edit price in `src/app/api/seed/route.ts`
2. Edit price in `src/lib/queries.ts`
3. Deploy, then visit `/api/seed`

### Add more images to a product:
1. Compress images and add to `public/images/`
2. Update the `images` array in seed/route.ts and queries.ts
3. Deploy, then visit `/api/seed`

### Change delivery charges:
1. Edit `src/components/CheckoutForm.tsx`
2. Find `const baseShipping = form.city.toLowerCase().includes("dhaka") ? 80 : 130;`
3. Change 80 and 130 to new values

### Change admin password:
1. Edit `src/components/AdminLogin.tsx`
2. Change `const ADMIN_PASSWORD = "MultipleChoice2026!";`

### Reset free delivery counter:
1. Visit: `https://multiple-choice-store-ptqx.vercel.app/api/seed`
2. This clears ALL orders and re-seeds products

### Change social media links:
1. Edit `src/components/Footer.tsx`

---

## 🚀 HOW TO DEPLOY CHANGES

1. Edit files on GitHub (click ✏️ pencil icon)
2. Click "Commit changes"
3. Vercel automatically deploys in 1-2 minutes
4. If you changed products, visit `/api/seed` to update database

---

## 🔑 HOW TO GET AI HELP (important!)

Copy-paste this message to any AI (ChatGPT, Arena AI, Claude, etc.):

> "Hi! I need help with my Next.js e-commerce website. Please read my website guide at:
> https://github.com/siamhossa661-byte/multiple-choice-store/blob/main/MY_WEBSITE_GUIDE.md
> 
> Then help me with: [DESCRIBE WHAT YOU WANT]
> 
> My GitHub repo: https://github.com/siamhossa661-byte/multiple-choice-store
> I can give you a GitHub token to push changes."

The AI will read the guide and know EVERYTHING about your website!

---

## 🔐 SECURITY CHECKLIST

- [x] Admin page has password protection
- [x] GitHub 2FA enabled
- [x] Old tokens deleted
- [ ] Change admin password regularly
- [ ] Delete GitHub tokens after use

---

## ⚠️ TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| Old products showing | Visit `/api/seed` |
| Images rotated wrong | Re-compress with `sharp().rotate()` |
| Admin page crashes | Check database connection in `src/db/index.ts` |
| Emails not sending | Create new Gmail App Password, update in orders/route.ts |
| Images not loading | Check `next.config.ts` has the domain |
| Vercel build fails | Check deployment logs in Vercel dashboard |
| Free delivery not working | Check `/api/free-delivery-status` |
| Forgot admin password | Edit `src/components/AdminLogin.tsx` |

---

## 🏗️ TECH STACK

- **Frontend:** Next.js 16 + React + Tailwind CSS
- **Database:** Neon PostgreSQL + Drizzle ORM
- **Hosting:** Vercel (free Hobby plan) — lasts forever
- **Code:** GitHub (free) — lasts forever
- **Images:** ibb.co (external) + public/images/ (local, compressed)
- **Email:** Nodemailer + Gmail SMTP
- **Image optimization:** sharp (compression), Next.js Image (AVIF/WebP)

---

## 📊 CURRENT STATUS

- 6 products (3 dresses + 3 jewelry)
- 4 images per dress product
- Free delivery active (first 5 orders)
- Email notifications working
- Admin password protected
- All images compressed for speed
- Social links: Facebook, Instagram, TikTok

---

*Last updated: July 9, 2026*
*Created during setup session with AI assistant*
