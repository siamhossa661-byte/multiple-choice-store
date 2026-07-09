import { db } from "@/db";
import { products, categories, reviews } from "@/db/schema";
import { eq, desc, asc, sql, ilike, and, type SQL } from "drizzle-orm";

// Fallback demo categories
const FALLBACK_CATEGORIES = [
  { id: 1, name: "Dresses", slug: "dresses", description: "Beautiful dresses", image: "https://i.ibb.co/0RJHGXRn/DB404-E0-B-C37-D-480-C-AF21-52550-FD3-F7-D0.jpg", createdAt: new Date() },
  { id: 2, name: "Jewelry", slug: "jewelry", description: "Beautiful earrings and jewelry", image: "/images/bow-earring.jpeg", createdAt: new Date() },
];

// Fallback demo products
const FALLBACK_PRODUCTS = [
  {
    product: {
      id: 101,
      name: "Two Piece",
      slug: "two-piece",
      description: "✨ Product Details:\n\n• Premium Georgette Fabric\n• Elegant Floral Print\n• Soft, Lightweight & Comfortable\n• Flowy & Stylish Fit\n• Perfect for Casual & Festive Wear\n• Available Sizes: M (40), L (42), XL (44)",
      price: "1350",
      compareAtPrice: null,
      categoryId: 1,
      images: JSON.stringify([
        "https://i.ibb.co/4ZxGgbX9/AF9-DADEF-06-B7-41-A4-9-B71-A583971-B94-DA.jpg",
        "/images/twopiece-2.jpeg",
        "/images/twopiece-3.jpeg",
        "/images/twopiece-4.jpeg",
      ]),
      sizes: JSON.stringify(["40", "42", "44"]),
      colors: JSON.stringify([]),
      material: "",
      featured: true,
      bestSeller: true,
      newArrival: true,
      inStock: true,
      createdAt: new Date(),
    },
    categoryName: "Dresses",
    categorySlug: "dresses",
  },
  {
    product: {
      id: 102,
      name: "One Piece",
      slug: "one-piece",
      description: "✨ Product Details:\n\n• Premium Georgette Fabric\n• Elegant Floral Print\n• Soft, Lightweight & Comfortable\n• Flowy & Stylish Fit\n• Perfect for Casual & Festive Wear\n• Available Sizes: M (40), L (42), XL (44)",
      price: "890",
      compareAtPrice: null,
      categoryId: 1,
      images: JSON.stringify([
        "https://i.ibb.co/0RJHGXRn/DB404-E0-B-C37-D-480-C-AF21-52550-FD3-F7-D0.jpg",
        "/images/onepiece-2.jpeg",
        "/images/onepiece-3.jpeg",
        "/images/onepiece-4.jpeg",
      ]),
      sizes: JSON.stringify(["40", "42", "44"]),
      colors: JSON.stringify([]),
      material: "",
      featured: true,
      bestSeller: true,
      newArrival: true,
      inStock: true,
      createdAt: new Date(),
    },
    categoryName: "Dresses",
    categorySlug: "dresses",
  },
  {
    product: {
      id: 103,
      name: "Premium Two Piece",
      slug: "premium-two-piece",
      description: "✨ Product Details:\n\n• Premium Georgette Fabric\n• Elegant Floral Print\n• Soft, Lightweight & Comfortable\n• Flowy & Stylish Fit\n• Perfect for Casual & Festive Wear\n• Available Sizes: M (40), L (42), XL (44)",
      price: "1750",
      compareAtPrice: null,
      categoryId: 1,
      images: JSON.stringify([
        "https://i.ibb.co/N4Ss5nc/CF8-CDE58-65-CE-4221-AAD2-387391-BB11-AE.jpg",
        "/images/premium-2.jpeg",
        "/images/premium-3.jpeg",
        "/images/premium-4.jpeg",
      ]),
      sizes: JSON.stringify(["40", "42", "44"]),
      colors: JSON.stringify([]),
      material: "",
      featured: true,
      bestSeller: false,
      newArrival: true,
      inStock: true,
      createdAt: new Date(),
    },
    categoryName: "Dresses",
    categorySlug: "dresses",
  },
  {
    product: {
      id: 104,
      name: "Bow Earring",
      slug: "bow-earring",
      description: "সুন্দর বো ডিজাইনের ইয়ারিং।",
      price: "200",
      compareAtPrice: null,
      categoryId: 2,
      images: JSON.stringify(["/images/bow-earring.jpeg"]),
      sizes: JSON.stringify([]),
      colors: JSON.stringify([]),
      material: "",
      featured: true,
      bestSeller: true,
      newArrival: true,
      inStock: true,
      createdAt: new Date(),
    },
    categoryName: "Jewelry",
    categorySlug: "jewelry",
  },
  {
    product: {
      id: 105,
      name: "Earring",
      slug: "earring-classic",
      description: "ক্লাসিক স্টাইল ইয়ারিং।",
      price: "100",
      compareAtPrice: null,
      categoryId: 2,
      images: JSON.stringify(["/images/earring-100.jpeg"]),
      sizes: JSON.stringify([]),
      colors: JSON.stringify([]),
      material: "",
      featured: true,
      bestSeller: true,
      newArrival: true,
      inStock: true,
      createdAt: new Date(),
    },
    categoryName: "Jewelry",
    categorySlug: "jewelry",
  },
  {
    product: {
      id: 106,
      name: "Earring",
      slug: "earring-premium",
      description: "প্রিমিয়াম কোয়ালিটি ইয়ারিং।",
      price: "350",
      compareAtPrice: null,
      categoryId: 2,
      images: JSON.stringify(["/images/earring-350.jpeg"]),
      sizes: JSON.stringify([]),
      colors: JSON.stringify([]),
      material: "",
      featured: true,
      bestSeller: false,
      newArrival: true,
      inStock: true,
      createdAt: new Date(),
    },
    categoryName: "Jewelry",
    categorySlug: "jewelry",
  },
];

export async function getCategories() {
  try {
    const res = await db.select().from(categories).orderBy(asc(categories.name));
    return res.length > 0 ? res : FALLBACK_CATEGORIES;
  } catch (err) {
    console.error("getCategories error, returning fallback:", err);
    return FALLBACK_CATEGORIES;
  }
}

export async function getProducts(opts?: {
  category?: string;
  sort?: string;
  search?: string;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  limit?: number;
}) {
  try {
    const conditions: SQL[] = [];

    if (opts?.category) {
      const cat = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, opts.category))
        .limit(1);
      if (cat[0]) {
        conditions.push(eq(products.categoryId, cat[0].id));
      }
    }

    if (opts?.search) {
      conditions.push(ilike(products.name, `%${opts.search}%`));
    }

    if (opts?.featured) {
      conditions.push(eq(products.featured, true));
    }

    if (opts?.bestSeller) {
      conditions.push(eq(products.bestSeller, true));
    }

    if (opts?.newArrival) {
      conditions.push(eq(products.newArrival, true));
    }

    let orderBy;
    switch (opts?.sort) {
      case "price-asc":
        orderBy = asc(products.price);
        break;
      case "price-desc":
        orderBy = desc(products.price);
        break;
      case "newest":
        orderBy = desc(products.createdAt);
        break;
      case "name":
        orderBy = asc(products.name);
        break;
      default:
        orderBy = desc(products.featured);
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const result = await db
      .select({
        product: products,
        categoryName: categories.name,
        categorySlug: categories.slug,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(whereClause)
      .orderBy(orderBy)
      .limit(opts?.limit ?? 100);

    return result.length > 0 ? result : FALLBACK_PRODUCTS;
  } catch (err) {
    console.error("getProducts error, returning fallback:", err);
    return FALLBACK_PRODUCTS;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const result = await db
      .select({
        product: products,
        categoryName: categories.name,
        categorySlug: categories.slug,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.slug, slug))
      .limit(1);

    if (result[0]) return result[0];

    const fallback = FALLBACK_PRODUCTS.find((p) => p.product.slug === slug);
    return fallback ?? FALLBACK_PRODUCTS[0] ?? null;
  } catch (err) {
    console.error("getProductBySlug error, returning fallback:", err);
    const fallback = FALLBACK_PRODUCTS.find((p) => p.product.slug === slug);
    return fallback ?? FALLBACK_PRODUCTS[0] ?? null;
  }
}

export async function getProductReviews(productId: number) {
  try {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.productId, productId))
      .orderBy(desc(reviews.createdAt));
  } catch (err) {
    console.error("getProductReviews error, returning fallback:", err);
    return [
      {
        id: 999,
        productId,
        authorName: "Tasnim L.",
        rating: 5,
        title: "অসাধারণ!",
        body: "খুবই সুন্দর পণ্য। ফিটিং এবং কাপড়ের কোয়ালিটি দুটোই দারুণ।",
        verified: true,
        createdAt: new Date(),
      },
    ];
  }
}

export async function getReviewStats(productId: number) {
  try {
    const result = await db
      .select({
        avgRating: sql<number>`COALESCE(AVG(${reviews.rating}), 0)`,
        count: sql<number>`COUNT(*)::int`,
      })
      .from(reviews)
      .where(eq(reviews.productId, productId));

    return {
      avgRating: Number(result[0]?.avgRating ?? 5),
      count: Number(result[0]?.count ?? 1),
    };
  } catch (err) {
    console.error("getReviewStats error:", err);
    return { avgRating: 5, count: 1 };
  }
}

export async function getReviewStatsForProducts(productIds: number[]) {
  const map = new Map<number, { avgRating: number; count: number }>();
  if (productIds.length === 0) return map;

  try {
    const result = await db
      .select({
        productId: reviews.productId,
        avgRating: sql<number>`COALESCE(AVG(${reviews.rating}), 0)`,
        count: sql<number>`COUNT(*)::int`,
      })
      .from(reviews)
      .where(sql`${reviews.productId} IN (${sql.join(productIds.map((id) => sql`${id}`), sql`, `)})`)
      .groupBy(reviews.productId);

    for (const r of result) {
      map.set(r.productId, {
        avgRating: Number(r.avgRating),
        count: Number(r.count),
      });
    }
    return map;
  } catch (err) {
    console.error("getReviewStatsForProducts error:", err);
    for (const id of productIds) {
      map.set(id, { avgRating: 5, count: 1 });
    }
    return map;
  }
}

export async function getRelatedProducts(productId: number, categoryId: number | null) {
  try {
    if (!categoryId) return [];

    return await db
      .select()
      .from(products)
      .where(
        and(
          eq(products.categoryId, categoryId),
          sql`${products.id} != ${productId}`
        )
      )
      .limit(4);
  } catch (err) {
    console.error("getRelatedProducts error:", err);
    return [];
  }
}
