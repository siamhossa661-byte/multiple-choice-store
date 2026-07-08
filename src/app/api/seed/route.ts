import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories, products, reviews } from "@/db/schema";

export async function GET() {
  try {
    // Check if already seeded
    const existingProducts = await db.select().from(products).limit(1);
    if (existingProducts.length > 0) {
      return NextResponse.json({ message: "Database already seeded", count: existingProducts.length });
    }

    // Clear existing data
    await db.delete(reviews);
    await db.delete(products);
    await db.delete(categories);

    // Insert categories
    const [dresses, tops, jewelry, accessories, knitwear, outerwear] = await db
      .insert(categories)
      .values([
        {
          name: "Dresses",
          slug: "dresses",
          description: "Elegant dresses for every occasion",
          image: "https://images.pexels.com/photos/20014409/pexels-photo-20014409.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600",
        },
        {
          name: "Tops & Blouses",
          slug: "tops-blouses",
          description: "Refined tops and blouses",
          image: "https://images.pexels.com/photos/35983964/pexels-photo-35983964.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600",
        },
        {
          name: "Jewelry",
          slug: "jewelry",
          description: "Exquisite jewelry and fine pieces",
          image: "https://images.pexels.com/photos/32797482/pexels-photo-32797482.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600",
        },
        {
          name: "Accessories",
          slug: "accessories",
          description: "Complete your look with curated accessories",
          image: "https://images.pexels.com/photos/17568000/pexels-photo-17568000.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600",
        },
        {
          name: "Knitwear",
          slug: "knitwear",
          description: "Luxurious knitwear and cashmere",
          image: "https://images.pexels.com/photos/16365089/pexels-photo-16365089.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600",
        },
        {
          name: "Outerwear",
          slug: "outerwear",
          description: "Statement coats and jackets",
          image: "https://images.pexels.com/photos/31978032/pexels-photo-31978032.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600",
        },
      ])
      .returning();

    // Insert products with Bangladeshi Taka prices
    const allProducts = await db
      .insert(products)
      .values([
        {
          name: "Silk Midi Wrap Dress",
          slug: "silk-midi-wrap-dress",
          description: "A timeless silhouette in luxurious silk. This midi wrap dress flatters every figure with its adjustable waist tie and fluid drape.",
          price: "4500",
          compareAtPrice: "5500",
          categoryId: dresses.id,
          images: JSON.stringify([
            "https://images.pexels.com/photos/20014409/pexels-photo-20014409.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
            "https://images.pexels.com/photos/34714293/pexels-photo-34714293.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          ]),
          sizes: JSON.stringify(["S", "M", "L", "XL"]),
          colors: JSON.stringify(["Black", "Navy", "Emerald"]),
          material: "Premium Silk Blend",
          featured: true,
          bestSeller: true,
        },
        {
          name: "Velvet Evening Gown",
          slug: "velvet-evening-gown",
          description: "Make an entrance in this stunning floor-length velvet gown.",
          price: "6500",
          categoryId: dresses.id,
          images: JSON.stringify([
            "https://images.pexels.com/photos/16791445/pexels-photo-16791445.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          ]),
          sizes: JSON.stringify(["S", "M", "L"]),
          colors: JSON.stringify(["Burgundy", "Black"]),
          material: "Premium Velvet",
          featured: true,
          newArrival: true,
        },
        {
          name: "Linen Shirt Dress",
          slug: "linen-shirt-dress",
          description: "Effortless elegance in breathable pure linen.",
          price: "2800",
          categoryId: dresses.id,
          images: JSON.stringify([
            "https://images.pexels.com/photos/36240024/pexels-photo-36240024.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          ]),
          sizes: JSON.stringify(["S", "M", "L", "XL"]),
          colors: JSON.stringify(["White", "Oatmeal"]),
          material: "100% Linen",
          bestSeller: true,
        },
        {
          name: "Oversized Cashmere Sweater",
          slug: "oversized-cashmere-sweater",
          description: "Pure indulgence in the softest cashmere.",
          price: "3800",
          compareAtPrice: "4500",
          categoryId: tops.id,
          images: JSON.stringify([
            "https://images.pexels.com/photos/16365089/pexels-photo-16365089.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          ]),
          sizes: JSON.stringify(["S", "M", "L", "XL"]),
          colors: JSON.stringify(["Ivory", "Camel", "Charcoal"]),
          material: "Cashmere Blend",
          featured: true,
          bestSeller: true,
        },
        {
          name: "Silk Bow Blouse",
          slug: "silk-bow-blouse",
          description: "A feminine statement piece in fluid silk.",
          price: "2600",
          categoryId: tops.id,
          images: JSON.stringify([
            "https://images.pexels.com/photos/35983964/pexels-photo-35983964.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          ]),
          sizes: JSON.stringify(["S", "M", "L"]),
          colors: JSON.stringify(["Ivory", "Pink", "Black"]),
          material: "Silk Blend",
          newArrival: true,
        },
        {
          name: "Pavé Diamond Pendant",
          slug: "pave-diamond-pendant",
          description: "A breathtaking pendant featuring hand-set stones.",
          price: "2200",
          categoryId: jewelry.id,
          images: JSON.stringify([
            "https://images.pexels.com/photos/32797482/pexels-photo-32797482.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          ]),
          colors: JSON.stringify(["Gold", "Rose Gold", "Silver"]),
          material: "Gold Plated with Zirconia",
          featured: true,
          bestSeller: true,
        },
        {
          name: "Pearl Drop Earrings",
          slug: "pearl-drop-earrings",
          description: "Timeless elegance meets modern design.",
          price: "1200",
          categoryId: jewelry.id,
          images: JSON.stringify([
            "https://images.pexels.com/photos/33569933/pexels-photo-33569933.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          ]),
          colors: JSON.stringify(["Gold/White Pearl", "Silver/White Pearl"]),
          material: "Gold Plated, Freshwater Pearls",
          bestSeller: true,
        },
        {
          name: "Layered Chain Necklace Set",
          slug: "layered-chain-necklace-set",
          description: "Three delicate chains of varying lengths.",
          price: "1500",
          compareAtPrice: "1900",
          categoryId: jewelry.id,
          images: JSON.stringify([
            "https://images.pexels.com/photos/5705481/pexels-photo-5705481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          ]),
          colors: JSON.stringify(["Gold", "Rose Gold"]),
          material: "Gold Plated",
          newArrival: true,
        },
        {
          name: "Leather Structured Tote",
          slug: "leather-structured-tote",
          description: "Crafted from premium leather.",
          price: "4200",
          categoryId: accessories.id,
          images: JSON.stringify([
            "https://images.pexels.com/photos/19711183/pexels-photo-19711183.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          ]),
          colors: JSON.stringify(["Tan", "Black", "Burgundy"]),
          material: "Genuine Leather",
          featured: true,
          bestSeller: true,
        },
        {
          name: "Cashmere Scarf",
          slug: "cashmere-scarf",
          description: "Wrap yourself in cloud-like softness.",
          price: "2200",
          categoryId: accessories.id,
          images: JSON.stringify([
            "https://images.pexels.com/photos/31978032/pexels-photo-31978032.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          ]),
          colors: JSON.stringify(["Oatmeal", "Charcoal", "Blush"]),
          material: "Cashmere Blend",
          newArrival: true,
        },
        {
          name: "Cable-Knit Cardigan",
          slug: "cable-knit-cardigan",
          description: "A heritage-inspired cable-knit cardigan.",
          price: "3200",
          categoryId: knitwear.id,
          images: JSON.stringify([
            "https://images.pexels.com/photos/16365089/pexels-photo-16365089.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          ]),
          sizes: JSON.stringify(["S", "M", "L", "XL"]),
          colors: JSON.stringify(["Cream", "Oatmeal"]),
          material: "Lambswool",
          bestSeller: true,
        },
        {
          name: "Wool Overcoat",
          slug: "wool-overcoat",
          description: "A timeless investment piece.",
          price: "7500",
          categoryId: outerwear.id,
          images: JSON.stringify([
            "https://images.pexels.com/photos/37036191/pexels-photo-37036191.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          ]),
          sizes: JSON.stringify(["S", "M", "L", "XL"]),
          colors: JSON.stringify(["Camel", "Black", "Charcoal"]),
          material: "Premium Wool",
          featured: true,
          bestSeller: true,
        },
      ])
      .returning();

    // Insert reviews
    const reviewNames = ["Fatima A.", "Nusrat R.", "Tasnim L.", "Ayesha K.", "Sabrina C."];
    const reviewBodies = [
      "কোয়ালিটি অসাধারণ। প্রতিবার পরলেই কমপ্লিমেন্ট পাই।",
      "টাকার পুরোপুরি মূল্য পেয়েছি। আরো কিনব।",
      "সুন্দর পণ্য। ফিটিংও ঠিক আছে।",
    ];

    const reviewsData = [];
    for (const product of allProducts) {
      for (let i = 0; i < 3; i++) {
        reviewsData.push({
          productId: product.id,
          authorName: reviewNames[Math.floor(Math.random() * reviewNames.length)],
          rating: Math.random() > 0.3 ? 5 : 4,
          title: "অসাধারণ!",
          body: reviewBodies[Math.floor(Math.random() * reviewBodies.length)],
          verified: true,
        });
      }
    }

    await db.insert(reviews).values(reviewsData);

    return NextResponse.json({ 
      success: true, 
      message: "Database seeded successfully!", 
      products: allProducts.length,
      reviews: reviewsData.length 
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
