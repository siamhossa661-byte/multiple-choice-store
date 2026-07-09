# 🤖 AI INSTRUCTIONS — READ THIS FIRST

## WHO YOU ARE HELPING
You are helping **Siam Hossain** edit his e-commerce website called **Multiple Choice**.

## THE WEBSITE
- **Live URL:** https://multiple-choice-store-ptqx.vercel.app
- **GitHub Repo:** https://github.com/siamhossa661-byte/multiple-choice-store
- **Tech Stack:** Next.js 16 + React + Tailwind CSS + Neon PostgreSQL + Vercel
- **Admin Panel:** https://multiple-choice-store-ptqx.vercel.app/admin/orders (password: MultipleChoice2026!)

## WHAT YOU MUST DO

### Step 1: Clone the repository
```
git clone https://github.com/siamhossa661-byte/multiple-choice-store.git
```

### Step 2: Ask the user for a GitHub Personal Access Token
Tell them: "Go to https://github.com/settings/tokens/new → Note: 'update' → Expiration: 7 days → Check ✅ repo → Click Generate → Copy and paste the token here"

### Step 3: Set up git remote with the token
```
git remote set-url origin https://siamhossa661-byte:TOKEN_HERE@github.com/siamhossa661-byte/multiple-choice-store.git
```

### Step 4: Make the requested changes
Read the relevant files, make changes, then:
```
git add -A
git commit -m "Description of changes"
git push origin main
```

### Step 5: After pushing, seed the database (if products changed)
Visit: https://multiple-choice-store-ptqx.vercel.app/api/seed

### Step 6: Tell the user to delete their token after done
Tell them: "Go to https://github.com/settings/tokens and delete the token for security"

## IMPORTANT RULES
- ALWAYS set git config: `git config user.email "siamhossa661@users.noreply.github.com"` and `git config user.name "siamhossa661-byte"`
- If remote origin doesn't exist, use `git remote add origin` instead of `set-url`
- After pushing, Vercel auto-deploys in 1-2 minutes
- The `ptqx` Vercel project sometimes takes 3-5 minutes to deploy (be patient)
- If products were changed, visit `/api/seed` to update the database
- Use `npm install` before `npm run build` to test locally
- Images go in `public/images/` folder and should be compressed
- The site uses `sharp` for image compression

## OWNER DETAILS
- **Email:** siamhossa661@gmail.com (receives order notification emails)
- **Phone/Payment:** 01864589805 (bKash/Nagad/Rocket)
- **Facebook:** https://www.facebook.com/share/17VUoU2P8a/?mibextid=wwXIfr
- **Instagram:** https://www.instagram.com/multiple_choice_pprs
- **TikTok:** https://www.tiktok.com/@multiplechoice1111

## CURRENT PRODUCTS

### Dresses (category: dresses)
| Product | Price | Slug | Images |
|---------|-------|------|--------|
| One Piece | ৳890 | one-piece | ibb.co + 3 local (onepiece-2/3/4.jpeg) |
| Two Piece | ৳1,350 | two-piece | ibb.co + 3 local (twopiece-2/3/4.jpeg) |
| Premium Two Piece | ৳1,750 | premium-two-piece | ibb.co + 3 local (premium-2/3/4.jpeg) |

Each dress has description: "✨ Product Details: • Premium Georgette Fabric • Elegant Floral Print • Soft, Lightweight & Comfortable • Flowy & Stylish Fit • Perfect for Casual & Festive Wear • Available Sizes: M (40), L (42), XL (44)"

### Jewelry (category: jewelry)
| Product | Price | Slug | Image |
|---------|-------|------|-------|
| Bow Earring | ৳200 | bow-earring | /images/bow-earring.jpeg |
| Earring | ৳100 | earring-classic | /images/earring-100.jpeg |
| Earring | ৳350 | earring-premium | /images/earring-350.jpeg |

### T-Shirts (category: tshirts)
- Currently empty (no products yet)

### Male Collection
- Separate page at /male-collection showing "Coming Soon"

## DELIVERY SETTINGS
- **First 5 orders:** FREE delivery (auto-tracked from database)
- **Dhaka:** ৳80
- **Outside Dhaka:** ৳130
- Free delivery API: `/api/free-delivery-status`
- To reset free delivery counter: `/api/seed` (clears all orders)

## KEY FILES (where to find things)

| What to change | File |
|---------------|------|
| Add/remove products | `src/app/api/seed/route.ts` AND `src/lib/queries.ts` |
| Homepage | `src/app/page.tsx` |
| Shop page | `src/app/shop/page.tsx` |
| Product detail page | `src/app/product/[slug]/page.tsx` |
| Admin orders page | `src/app/admin/orders/page.tsx` |
| Admin password | `src/components/AdminLogin.tsx` |
| Checkout + payment | `src/components/CheckoutForm.tsx` |
| Delivery charges | `src/components/CheckoutForm.tsx` (search "baseShipping") |
| Free delivery limit | `src/app/api/free-delivery-status/route.ts` |
| Header + navigation | `src/components/Header.tsx` |
| Footer + social links | `src/components/Footer.tsx` |
| Product card design | `src/components/ProductCard.tsx` |
| Cart drawer | `src/components/CartDrawer.tsx` |
| Product images | `public/images/` folder |
| Email notifications | `src/app/api/orders/route.ts` |
| Database schema | `src/db/schema.ts` |
| Database connection | `src/db/index.ts` |
| Image config | `next.config.ts` |
| Male Collection page | `src/app/male-collection/page.tsx` |
| CSS/Animations | `src/app/globals.css` |

## HOW TO ADD A NEW PRODUCT
1. Add the product to `src/app/api/seed/route.ts` in the products array
2. Add the same product to `src/lib/queries.ts` in FALLBACK_PRODUCTS array
3. If using a local image, add it to `public/images/` (compress first with sharp)
4. Push to GitHub
5. After deploy, visit `/api/seed` to update database

## HOW TO ADD IMAGES TO A PRODUCT
1. Compress images: `sharp(input).resize(1200).jpeg({quality: 75, mozjpeg: true}).toFile(output)`
2. Save to `public/images/`
3. Update the `images` JSON array in both seed/route.ts and queries.ts
4. Push and visit `/api/seed`

## HOW TO CHANGE DELIVERY CHARGES
Edit `src/components/CheckoutForm.tsx`, find:
```
const baseShipping = form.city.toLowerCase().includes("dhaka") ? 80 : 130;
```
Change 80 and 130 to new values.

## TROUBLESHOOTING
| Problem | Fix |
|---------|-----|
| Old products showing | Visit `/api/seed` |
| Images rotated wrong | Re-compress with `sharp().rotate()` |
| Admin page crashes | Check database connection in `src/db/index.ts` |
| Emails not sending | Check Gmail App Password in `src/app/api/orders/route.ts` |
| Images not loading | Check `next.config.ts` has the domain |
| Vercel build fails | Run `npm run build` locally to find errors |
| Free delivery stuck | Visit `/api/seed` to reset order count |
| `origin` remote missing | `git remote add origin URL` |
| Git identity error | `git config user.email` and `git config user.name` |
| ptqx deploy slow | Wait 3-5 minutes, it's always delayed |

---
*Last updated: July 9, 2026*
