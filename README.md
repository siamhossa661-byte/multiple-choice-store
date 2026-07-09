import { db } from "./index";
import { categories, products, reviews } from "./schema";

async function seed() {
  console.log("Seeding database...");

  await db.delete(reviews);
  await db.delete(products);
  await db.delete(categories);

  const [dresses] = await db
    .insert(categories)
    .values([
      {
        name: "Dresses",
        slug: "dresses",
        description: "Beautiful dresses for every occasion",
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
        description: "স্টাইলিশ ওয়ান পিস ড্রেস। আরামদায়ক ও ট্রেন্ডি ডিজাইন। যেকোনো অনুষ্ঠানে পরতে পারবেন।",
        price: "890",
        categoryId: dresses.id,
        images: JSON.stringify([
          "https://i.ibb.co/0RJHGXRn/DB404-E0-B-C37-D-480-C-AF21-52550-FD3-F7-D0.jpg",
        ]),
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
        description: "এলিগ্যান্ট টু পিস সেট। সুন্দর ডিজাইন ও আরামদায়ক ফেব্রিক। ক্যাজুয়াল ও ফর্মাল দুই ভাবেই পরা যায়।",
        price: "1350",
        categoryId: dresses.id,
        images: JSON.stringify([
          "https://i.ibb.co/4ZxGgbX9/AF9-DADEF-06-B7-41-A4-9-B71-A583971-B94-DA.jpg",
        ]),
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
        description: "প্রিমিয়াম কোয়ালিটি টু পিস সেট। হাই-এন্ড ফেব্রিক ও ডিজাইন। বিশেষ অনুষ্ঠান ও পার্টির জন্য পারফেক্ট।",
        price: "1750",
        categoryId: dresses.id,
        images: JSON.stringify([
          "https://i.ibb.co/N4Ss5nc/CF8-CDE58-65-CE-4221-AAD2-387391-BB11-AE.jpg",
        ]),
        sizes: JSON.stringify(["40", "42", "44"]),
        colors: JSON.stringify([]),
        material: "",
        featured: true,
        bestSeller: false,
        newArrival: true,
        inStock: true,
      },
    ]);

  console.log("Done! 3 products added.");
}

seed().catch(console.error);
