import { db } from "./index";
import { categories, products, reviews } from "./schema";

async function seed() {
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
        image: "/images/premium-2.jpeg",
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
        images: JSON.stringify(["/images/onepiece-2.jpeg", "/images/onepiece-3.jpeg", "/images/onepiece-4.jpeg"]),
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
        images: JSON.stringify(["/images/twopiece-2.jpeg", "/images/twopiece-3.jpeg", "/images/twopiece-4.jpeg"]),
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
        images: JSON.stringify(["/images/premium-2.jpeg", "/images/premium-3.jpeg", "/images/premium-4.jpeg"]),
        sizes: JSON.stringify(["40", "42", "44"]),
        colors: JSON.stringify([]),
        material: "",
        featured: true,
        bestSeller: false,
        newArrival: true,
        inStock: true,
      },
    ]);

  console.log("Done!");
}

seed().catch(console.error);
