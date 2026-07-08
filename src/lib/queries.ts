import { db } from "@/db";
import { products, categories, reviews } from "@/db/schema";
import { eq, desc, asc, sql, ilike, and, type SQL } from "drizzle-orm";

export async function getCategories() {
  return db.select().from(categories).orderBy(asc(categories.name));
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

  return result;
}

export async function getProductBySlug(slug: string) {
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

  return result[0] ?? null;
}

export async function getProductReviews(productId: number) {
  return db
    .select()
    .from(reviews)
    .where(eq(reviews.productId, productId))
    .orderBy(desc(reviews.createdAt));
}

export async function getReviewStats(productId: number) {
  const result = await db
    .select({
      avgRating: sql<number>`COALESCE(AVG(${reviews.rating}), 0)`,
      count: sql<number>`COUNT(*)::int`,
    })
    .from(reviews)
    .where(eq(reviews.productId, productId));

  return {
    avgRating: Number(result[0]?.avgRating ?? 0),
    count: Number(result[0]?.count ?? 0),
  };
}

export async function getReviewStatsForProducts(productIds: number[]) {
  if (productIds.length === 0) return new Map<number, { avgRating: number; count: number }>();

  const result = await db
    .select({
      productId: reviews.productId,
      avgRating: sql<number>`COALESCE(AVG(${reviews.rating}), 0)`,
      count: sql<number>`COUNT(*)::int`,
    })
    .from(reviews)
    .where(sql`${reviews.productId} IN (${sql.join(productIds.map(id => sql`${id}`), sql`, `)})`)
    .groupBy(reviews.productId);

  const map = new Map<number, { avgRating: number; count: number }>();
  for (const r of result) {
    map.set(r.productId, {
      avgRating: Number(r.avgRating),
      count: Number(r.count),
    });
  }
  return map;
}

export async function getRelatedProducts(productId: number, categoryId: number | null) {
  if (!categoryId) return [];

  return db
    .select()
    .from(products)
    .where(
      and(
        eq(products.categoryId, categoryId),
        sql`${products.id} != ${productId}`
      )
    )
    .limit(4);
}
