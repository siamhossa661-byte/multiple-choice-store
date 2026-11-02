import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * One-off maintenance endpoint: points every dress at the full-resolution
 * local photos (1200x1600) instead of the tiny 360px i.ibb.co images.
 * Unlike /api/seed this does NOT delete orders.
 */
export async function GET() {
  try {
    const imageMap: Record<string, string[]> = {
      "one-piece": [
        "/images/onepiece-2.jpeg",
        "/images/onepiece-3.jpeg",
        "/images/onepiece-4.jpeg",
      ],
      "two-piece": [
        "/images/twopiece-2.jpeg",
        "/images/twopiece-3.jpeg",
        "/images/twopiece-4.jpeg",
      ],
      "premium-two-piece": [
        "/images/premium-2.jpeg",
        "/images/premium-3.jpeg",
        "/images/premium-4.jpeg",
      ],
    };

    const updated: string[] = [];

    for (const [slug, images] of Object.entries(imageMap)) {
      await db
        .update(products)
        .set({ images: JSON.stringify(images) })
        .where(eq(products.slug, slug));
      updated.push(slug);
    }

    // Dresses category card image
    await db
      .update(categories)
      .set({ image: "/images/premium-2.jpeg" })
      .where(eq(categories.slug, "dresses"));

    revalidatePath("/", "layout");

    return NextResponse.json({
      message: "Product + category images updated to high-resolution originals",
      updated,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed", details: String(error) },
      { status: 500 },
    );
  }
}
