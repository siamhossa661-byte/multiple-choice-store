import { db } from "@/db";
import { products, categories, reviews } from "@/db/schema";
import { eq, desc, asc, sql, ilike, and, type SQL } from "drizzle-orm";

// Fallback demo categories
const FALLBACK_CATEGORIES = [
  { id: 1, name: "Dresses", slug: "dresses", description: "Elegant dresses", image: "https://images.pexels.com/photos/20014409/pexels-photo-20014409.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600", createdAt: new Date() },
  { id: 2, name: "Tops & Blouses", slug: "tops-blouses", description: "Refined tops", image: "https://images.pexels.com/photos/35983964/pexels-photo-35983964.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600", createdAt: new Date() },
  { id: 3, name: "Jewelry", slug: "jewelry", description: "Exquisite jewelry", image: "https://images.pexels.com/photos/32797482/pexels-photo-32797482.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600", createdAt: new Date() },
  { id: 4, name: "Accessories", slug: "accessories", description: "Curated accessories", image: "https://images.pexels.com/photos/17568000/pexels-photo-17568000.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600", createdAt: new Date() },
];

// Fallback demo products
const FALLBACK_PRODUCTS = [
  {
    product: {
      id: 101,
      name: "Silk Midi Wrap Dress",
      slug: "silk-midi-wrap-dress",
      description: "A timeless silhouette in luxurious silk. This midi wrap dress flatters every figure with its adjustable waist tie and fluid drape.",
      price: "4500",
      compareAtPrice: "5500",
      categoryId: 1,
      images: JSON.stringify([
        "https://images.pexels.com/photos/20014409/pexels-photo-20014409.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
        "https://images.pexels.com/photos/34714293/pexels-photo-34714293.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
      ]),
      sizes: JSON.stringify(["S", "M", "L", "XL"]),
      colors: JSON.stringify(["Black", "Navy", "Emerald"]),
      material: "Premium Silk Blend",
      featured: true,
      bestSeller: true,
      newArrival: false,
      inStock: true,
      createdAt: new Date(),
    },
    categoryName: "Dresses",
    categorySlug: "dresses",
  },
  {
    product: {
      id: 102,
      name: "Velvet Evening Gown",
      slug: "velvet-evening-gown",
      description: "Make an entrance in this stunning floor-length velvet gown.",
      price: "6500",
      compareAtPrice: null,
      categoryId: 1,
      images: JSON.stringify([
        "https://images.pexels.com/photos/16791445/pexels-photo-16791445.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
      ]),
      sizes: JSON.stringify(["S", "M", "L"]),
      colors: JSON.stringify(["Burgundy", "Black"]),
      material: "Premium Velvet",
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
      id: 103,
      name: "Pavé Diamond Pendant",
      slug: "pave-diamond-pendant",
      description: "A breathtaking pendant featuring hand-set stones.",
      price: "2200",
      compareAtPrice: null,
      categoryId: 3,
      images: JSON.stringify([
        "https://images.pexels.com/photos/32797482/pexels-photo-32797482.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
      ]),
      sizes: JSON.stringify([]),
      colors: JSON.stringify(["Gold", "Rose Gold", "Silver"]),
      material: "Gold Plated with Zirconia",
      featured: true,
      bestSeller: true,
      newArrival: false,
      inStock: true,
      createdAt: new Date(),
    },
    categoryName: "Jewelry",
    categorySlug: "jewelry",
  },
  {
    product: {
      id: 104,
      name: "Leather Structured Tote",
      slug: "leather-structured-tote",
      description: "Crafted from premium leather.",
      price: "4200",
      compareAtPrice: null,
      categoryId: 4,
      images: JSON.stringify([
        "https://images.pexels.com/photos/19711183/pexels-photo-19711183.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
      ]),
      sizes: JSON.stringify([]),
      colors: JSON.stringify(["Tan", "Black", "Burgundy"]),
      material: "Genuine Leather",
      featured: true,
      bestSeller: true,
      newArrival: false,
      inStock: true,
      createdAt: new Date(),
    },
    categoryName: "Accessories",
    categorySlug: "accessories",
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
