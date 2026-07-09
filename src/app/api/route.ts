import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories, products, reviews } from "@/db/schema";

export async function GET() {
  try {
    await db.delete(reviews);
    await db.delete(products);
    await db.delete(categories);

    const [dresses] = await db
      .insert(categories)
      .values([
        {
          name: "Dresses",
          slug: "dresses",
          description: "Beautiful dresses",
          image: "https://i.ibb.co/0RJHGXRn/DB404-E0-B-C37-D-480-C-AF21-52550-FD3-F7-D0.jpg",
        },
      ])
      .returning();

    await db
      .insert(products)
      .values([
        {
          name: "One Piece",
          slug: "one-piece",
          description: "স্টাইলিশ ওয়ান পিস ড্রেস।",
          price: "890",
          categoryId: dresses.id,
          images: JSON.stringify(["https://i.ibb.co/0RJHGXRn/DB404-E0-B-C37-D-480-C-AF21-52550-FD3-F7-D0.jpg"]),
          sizes: JSON.stringify(["40", "42", "44"]),
          colors: JSON.stringify([]),
          material: "",
          featured: true,
          bestSeller: true,
        },
        {
          name: "Two Piece",
          slug: "two-piece",
          description: "এলিগ্যান্ট টু পিস সেট।",
          price: "1350",
          categoryId: dresses.id,
          images: JSON.stringify(["https://i.ibb.co/4ZxGgbX9/AF9-DADEF-06-B7-41-A4-9-B71-A583971-B94-DA.jpg"]),
          sizes: JSON.stringify(["40", "42", "44"]),
          colors: JSON.stringify([]),
          material: "",
          featured: true,
          bestSeller: true,
        },
        {
          name: "Premium Two Piece",
          slug: "premium-two-piece",
          description: "প্রিমিয়াম কোয়ালিটি টু পিস সেট।",
          price: "1750",
          categoryId: dresses.id,
          images: JSON.stringify(["https://i.ibb.co/N4Ss5nc/CF8-CDE58-65-CE-4221-AAD2-387391-BB11-AE.jpg"]),
          sizes: JSON.stringify(["40", "42", "44"]),
          colors: JSON.stringify([]),
          material: "",
          featured: true,
          newArrival: true,
        },
      ]);

    return NextResponse.json({ message: "Done! 3 products added!" });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}