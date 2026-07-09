import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories, products, reviews } from "@/db/schema";

export async function GET() {
  try {
    await db.delete(reviews);
    await db.delete(products);
    await db.delete(categories);

    // Also clear all orders to reset free delivery counter
    try {
      const { orders: ordersTable } = await import("@/db/schema");
      await db.delete(ordersTable);
    } catch (e) {
      // orders table might not exist yet
    }

    const [dresses, jewelry] = await db
      .insert(categories)
      .values([
        {
          name: "Dresses",
          slug: "dresses",
          description: "Beautiful dresses",
          image: "https://i.ibb.co/0RJHGXRn/DB404-E0-B-C37-D-480-C-AF21-52550-FD3-F7-D0.jpg",
        },
        {
          name: "Jewelry",
          slug: "jewelry",
          description: "Beautiful earrings and jewelry",
          image: "/images/bow-earring.jpeg",
        },
      ])
      .returning();

    await db.insert(products).values([
      // Dresses
      {
        name: "One Piece",
        slug: "one-piece",
        description: "স্টাইলিশ ওয়ান পিস ড্রেস।",
        price: "890",
        categoryId: dresses.id,
        images: JSON.stringify(["https://i.ibb.co/0RJHGXRn/DB404-E0-B-C37-D-480-C-AF21-52550-FD3-F7-D0.jpg", "/images/onepiece-2.jpeg", "/images/onepiece-3.jpeg", "/images/onepiece-4.jpeg"]),
        sizes: JSON.stringify(["40", "42", "44"]),
        colors: JSON.stringify([]),
        material: "",
        featured: true,
        bestSeller: true,
        newArrival: true,
        inStock: true,
      },
      {
        name: "Two Piece",
        slug: "two-piece",
        description: "এলিগ্যান্ট টু পিস সেট।",
        price: "1350",
        categoryId: dresses.id,
        images: JSON.stringify(["https://i.ibb.co/4ZxGgbX9/AF9-DADEF-06-B7-41-A4-9-B71-A583971-B94-DA.jpg", "/images/twopiece-2.jpeg", "/images/twopiece-3.jpeg", "/images/twopiece-4.jpeg"]),
        sizes: JSON.stringify(["40", "42", "44"]),
        colors: JSON.stringify([]),
        material: "",
        featured: true,
        bestSeller: true,
        newArrival: true,
        inStock: true,
      },
      {
        name: "Premium Two Piece",
        slug: "premium-two-piece",
        description: "প্রিমিয়াম কোয়ালিটি টু পিস সেট।",
        price: "1750",
        categoryId: dresses.id,
        images: JSON.stringify(["https://i.ibb.co/N4Ss5nc/CF8-CDE58-65-CE-4221-AAD2-387391-BB11-AE.jpg", "/images/premium-2.jpeg", "/images/premium-3.jpeg", "/images/premium-4.jpeg"]),
        sizes: JSON.stringify(["40", "42", "44"]),
        colors: JSON.stringify([]),
        material: "",
        featured: true,
        bestSeller: false,
        newArrival: true,
        inStock: true,
      },
      // Jewelry
      {
        name: "Bow Earring",
        slug: "bow-earring",
        description: "সুন্দর বো ডিজাইনের ইয়ারিং।",
        price: "200",
        categoryId: jewelry.id,
        images: JSON.stringify(["/images/bow-earring.jpeg"]),
        sizes: JSON.stringify([]),
        colors: JSON.stringify([]),
        material: "",
        featured: true,
        bestSeller: true,
        newArrival: true,
        inStock: true,
      },
      {
        name: "Earring",
        slug: "earring-classic",
        description: "ক্লাসিক স্টাইল ইয়ারিং।",
        price: "100",
        categoryId: jewelry.id,
        images: JSON.stringify(["/images/earring-100.jpeg"]),
        sizes: JSON.stringify([]),
        colors: JSON.stringify([]),
        material: "",
        featured: true,
        bestSeller: true,
        newArrival: true,
        inStock: true,
      },
      {
        name: "Earring",
        slug: "earring-premium",
        description: "প্রিমিয়াম কোয়ালিটি ইয়ারিং।",
        price: "350",
        categoryId: jewelry.id,
        images: JSON.stringify(["/images/earring-350.jpeg"]),
        sizes: JSON.stringify([]),
        colors: JSON.stringify([]),
        material: "",
        featured: true,
        bestSeller: false,
        newArrival: true,
        inStock: true,
      },
    ]);

    return NextResponse.json({ message: "Done! 6 products added!" });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
