import { db } from "./index";
import { categories, products, reviews } from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

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
      // Dresses
      {
        name: "Silk Midi Wrap Dress",
        slug: "silk-midi-wrap-dress",
        description: "A timeless silhouette in luxurious silk. This midi wrap dress flatters every figure with its adjustable waist tie and fluid drape. Perfect for evening events or elevated daywear. Features a V-neckline and flutter sleeves that add a romantic touch.",
        price: "4500",
        compareAtPrice: "5500",
        categoryId: dresses.id,
        images: JSON.stringify([
          "https://images.pexels.com/photos/20014409/pexels-photo-20014409.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          "https://images.pexels.com/photos/34714293/pexels-photo-34714293.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          "https://images.pexels.com/photos/37292005/pexels-photo-37292005.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
        ]),
        sizes: JSON.stringify(["S", "M", "L", "XL"]),
        colors: JSON.stringify(["Black", "Navy", "Emerald"]),
        material: "Premium Silk Blend",
        featured: true,
        bestSeller: true,
        newArrival: false,
        inStock: true,
      },
      {
        name: "Velvet Evening Gown",
        slug: "velvet-evening-gown",
        description: "Make an entrance in this stunning floor-length velvet gown. The rich fabric catches light beautifully while the structured bodice and flowing skirt create a dramatic silhouette. Finished with a concealed back zip and subtle train.",
        price: "6500",
        categoryId: dresses.id,
        images: JSON.stringify([
          "https://images.pexels.com/photos/16791445/pexels-photo-16791445.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          "https://images.pexels.com/photos/16791444/pexels-photo-16791444.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
        ]),
        sizes: JSON.stringify(["S", "M", "L"]),
        colors: JSON.stringify(["Burgundy", "Midnight Blue", "Black"]),
        material: "Premium Velvet",
        featured: true,
        bestSeller: false,
        newArrival: true,
        inStock: true,
      },
      {
        name: "Linen Shirt Dress",
        slug: "linen-shirt-dress",
        description: "Effortless elegance in breathable pure linen. This relaxed-fit shirt dress features mother-of-pearl buttons, side pockets, and a self-tie belt. Ideal for summer days and weekend brunches.",
        price: "2800",
        categoryId: dresses.id,
        images: JSON.stringify([
          "https://images.pexels.com/photos/36240024/pexels-photo-36240024.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          "https://images.pexels.com/photos/35983964/pexels-photo-35983964.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
        ]),
        sizes: JSON.stringify(["S", "M", "L", "XL"]),
        colors: JSON.stringify(["White", "Oatmeal", "Sage"]),
        material: "100% Linen",
        featured: false,
        bestSeller: true,
        newArrival: false,
        inStock: true,
      },
      {
        name: "Satin Slip Dress",
        slug: "satin-slip-dress",
        description: "The ultimate in minimalist luxury. This bias-cut satin slip dress skims the body gracefully with adjustable spaghetti straps and a cowl neckline. Layer with a blazer for day or wear solo for evening.",
        price: "3200",
        categoryId: dresses.id,
        images: JSON.stringify([
          "https://images.pexels.com/photos/29559549/pexels-photo-29559549.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          "https://images.pexels.com/photos/19977394/pexels-photo-19977394.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
        ]),
        sizes: JSON.stringify(["S", "M", "L"]),
        colors: JSON.stringify(["Champagne", "Black", "Blush"]),
        material: "Satin",
        featured: false,
        bestSeller: false,
        newArrival: true,
        inStock: true,
      },
      // Tops & Blouses
      {
        name: "Oversized Cashmere Sweater",
        slug: "oversized-cashmere-sweater",
        description: "Pure indulgence in the softest cashmere. This oversized sweater features dropped shoulders, ribbed cuffs, and a relaxed fit that pairs beautifully with tailored trousers or denim.",
        price: "3800",
        compareAtPrice: "4500",
        categoryId: tops.id,
        images: JSON.stringify([
          "https://images.pexels.com/photos/16365089/pexels-photo-16365089.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          "https://images.pexels.com/photos/31978032/pexels-photo-31978032.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
        ]),
        sizes: JSON.stringify(["S", "M", "L", "XL"]),
        colors: JSON.stringify(["Ivory", "Camel", "Charcoal"]),
        material: "Cashmere Blend",
        featured: true,
        bestSeller: true,
        newArrival: false,
        inStock: true,
      },
      {
        name: "Silk Bow Blouse",
        slug: "silk-bow-blouse",
        description: "A feminine statement piece in fluid silk with an elegant pussy-bow neckline. The balloon sleeves and pearl button cuffs add a touch of romance. Tuck into high-waisted trousers for the office or style loose over a slip skirt.",
        price: "2600",
        categoryId: tops.id,
        images: JSON.stringify([
          "https://images.pexels.com/photos/35983964/pexels-photo-35983964.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          "https://images.pexels.com/photos/37036191/pexels-photo-37036191.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
        ]),
        sizes: JSON.stringify(["S", "M", "L"]),
        colors: JSON.stringify(["Ivory", "Powder Pink", "Black"]),
        material: "Silk Blend",
        featured: false,
        bestSeller: false,
        newArrival: true,
        inStock: true,
      },
      {
        name: "Merino Ribbed Turtleneck",
        slug: "merino-ribbed-turtleneck",
        description: "A wardrobe essential reimagined in ultrafine merino wool. The slim-fit ribbed construction provides a flattering, body-conscious silhouette while the fold-over turtleneck adds sophistication.",
        price: "1800",
        categoryId: tops.id,
        images: JSON.stringify([
          "https://images.pexels.com/photos/13985706/pexels-photo-13985706.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
        ]),
        sizes: JSON.stringify(["S", "M", "L", "XL"]),
        colors: JSON.stringify(["Black", "Cream", "Forest Green", "Burgundy"]),
        material: "Merino Wool",
        featured: false,
        bestSeller: true,
        newArrival: false,
        inStock: true,
      },
      // Jewelry
      {
        name: "Pavé Diamond Pendant",
        slug: "pave-diamond-pendant",
        description: "A breathtaking pendant featuring hand-set stones on a delicate gold chain. The teardrop design catches light from every angle, creating an enchanting sparkle. Adjustable chain length with a lobster clasp closure.",
        price: "2200",
        categoryId: jewelry.id,
        images: JSON.stringify([
          "https://images.pexels.com/photos/32797482/pexels-photo-32797482.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          "https://images.pexels.com/photos/34372562/pexels-photo-34372562.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
        ]),
        sizes: JSON.stringify([]),
        colors: JSON.stringify(["Gold", "Rose Gold", "Silver"]),
        material: "Gold Plated with Zirconia",
        featured: true,
        bestSeller: true,
        newArrival: false,
        inStock: true,
      },
      {
        name: "Sculptural Gold Cuff",
        slug: "sculptural-gold-cuff",
        description: "A bold, architectural cuff bracelet hand-crafted in gold vermeil. The organic, fluid form wraps elegantly around the wrist, making a statement whether worn alone or stacked with other bracelets.",
        price: "1800",
        categoryId: jewelry.id,
        images: JSON.stringify([
          "https://images.pexels.com/photos/4155254/pexels-photo-4155254.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          "https://images.pexels.com/photos/4155252/pexels-photo-4155252.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
        ]),
        sizes: JSON.stringify(["Free Size"]),
        colors: JSON.stringify(["Gold", "Silver"]),
        material: "Gold Plated Brass",
        featured: true,
        bestSeller: false,
        newArrival: true,
        inStock: true,
      },
      {
        name: "Pearl Drop Earrings",
        slug: "pearl-drop-earrings",
        description: "Timeless elegance meets modern design in these lustrous freshwater pearl drop earrings. Each pearl is hand-selected for its iridescent quality and set on a minimalist gold bar that elongates the neck beautifully.",
        price: "1200",
        categoryId: jewelry.id,
        images: JSON.stringify([
          "https://images.pexels.com/photos/33569933/pexels-photo-33569933.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          "https://images.pexels.com/photos/7685718/pexels-photo-7685718.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
        ]),
        sizes: JSON.stringify([]),
        colors: JSON.stringify(["Gold/White Pearl", "Silver/White Pearl"]),
        material: "Gold Plated, Freshwater Pearls",
        featured: false,
        bestSeller: true,
        newArrival: false,
        inStock: true,
      },
      {
        name: "Layered Chain Necklace Set",
        slug: "layered-chain-necklace-set",
        description: "Three delicate chains of varying lengths create the perfect layered look. Each chain features a unique pendant — a tiny diamond, a crescent moon, and a star. Wear all three together or mix and match for different occasions.",
        price: "1500",
        compareAtPrice: "1900",
        categoryId: jewelry.id,
        images: JSON.stringify([
          "https://images.pexels.com/photos/5705481/pexels-photo-5705481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          "https://images.pexels.com/photos/5705495/pexels-photo-5705495.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
        ]),
        sizes: JSON.stringify([]),
        colors: JSON.stringify(["Gold", "Rose Gold"]),
        material: "Gold Plated",
        featured: false,
        bestSeller: false,
        newArrival: true,
        inStock: true,
      },
      // Accessories
      {
        name: "Leather Structured Tote",
        slug: "leather-structured-tote",
        description: "Crafted from premium leather, this structured tote is the ultimate everyday bag. Features an interior zip pocket, two slip pockets, and a magnetic snap closure. The reinforced base ensures it holds its shape beautifully.",
        price: "4200",
        categoryId: accessories.id,
        images: JSON.stringify([
          "https://images.pexels.com/photos/19711183/pexels-photo-19711183.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          "https://images.pexels.com/photos/7130033/pexels-photo-7130033.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
        ]),
        sizes: JSON.stringify([]),
        colors: JSON.stringify(["Tan", "Black", "Burgundy"]),
        material: "Genuine Leather",
        featured: true,
        bestSeller: true,
        newArrival: false,
        inStock: true,
      },
      {
        name: "Cashmere Scarf",
        slug: "cashmere-scarf",
        description: "Wrap yourself in cloud-like softness with this generously sized cashmere scarf. The oversized dimensions allow for multiple styling options — draped, wrapped, or belted. Finished with subtle fringe detailing.",
        price: "2200",
        categoryId: accessories.id,
        images: JSON.stringify([
          "https://images.pexels.com/photos/31978032/pexels-photo-31978032.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
        ]),
        sizes: JSON.stringify([]),
        colors: JSON.stringify(["Oatmeal", "Charcoal", "Blush", "Navy"]),
        material: "Cashmere Blend",
        featured: false,
        bestSeller: false,
        newArrival: true,
        inStock: true,
      },
      // Knitwear
      {
        name: "Cable-Knit Cardigan",
        slug: "cable-knit-cardigan",
        description: "A heritage-inspired cable-knit cardigan in the finest lambswool. The chunky texture and oversized fit make it the perfect layering piece. Features horn buttons and deep patch pockets.",
        price: "3200",
        categoryId: knitwear.id,
        images: JSON.stringify([
          "https://images.pexels.com/photos/16365089/pexels-photo-16365089.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          "https://images.pexels.com/photos/13985706/pexels-photo-13985706.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
        ]),
        sizes: JSON.stringify(["S", "M", "L", "XL"]),
        colors: JSON.stringify(["Cream", "Oatmeal", "Sage"]),
        material: "Lambswool",
        featured: false,
        bestSeller: true,
        newArrival: false,
        inStock: true,
      },
      {
        name: "Cashmere Knit Set",
        slug: "cashmere-knit-set",
        description: "Coordinated luxury in matching cashmere. This two-piece set includes a cropped sweater with a boat neck and high-waisted wide-leg trousers with an elasticated waist. The ultimate in elevated loungewear.",
        price: "5500",
        compareAtPrice: "6500",
        categoryId: knitwear.id,
        images: JSON.stringify([
          "https://images.pexels.com/photos/7778890/pexels-photo-7778890.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
        ]),
        sizes: JSON.stringify(["S", "M", "L"]),
        colors: JSON.stringify(["Camel", "Grey Marl", "Black"]),
        material: "Cashmere Blend",
        featured: true,
        bestSeller: false,
        newArrival: true,
        inStock: true,
      },
      // Outerwear
      {
        name: "Wool Overcoat",
        slug: "wool-overcoat",
        description: "A timeless investment piece crafted from double-faced wool. The clean lines and minimal detailing let the exceptional fabric speak for itself. Features a notched lapel, single-breasted closure, and side pockets.",
        price: "7500",
        categoryId: outerwear.id,
        images: JSON.stringify([
          "https://images.pexels.com/photos/37036191/pexels-photo-37036191.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          "https://images.pexels.com/photos/34714293/pexels-photo-34714293.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
        ]),
        sizes: JSON.stringify(["S", "M", "L", "XL"]),
        colors: JSON.stringify(["Camel", "Black", "Charcoal"]),
        material: "Premium Wool",
        featured: true,
        bestSeller: true,
        newArrival: false,
        inStock: true,
      },
      {
        name: "Leather Moto Jacket",
        slug: "leather-moto-jacket",
        description: "A modern take on the classic moto jacket in buttery-soft lambskin leather. The cropped fit and asymmetric zip add edge while the quality craftsmanship ensures lasting style. Lined in silk for ultimate comfort.",
        price: "8500",
        categoryId: outerwear.id,
        images: JSON.stringify([
          "https://images.pexels.com/photos/18491441/pexels-photo-18491441.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
          "https://images.pexels.com/photos/20014409/pexels-photo-20014409.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
        ]),
        sizes: JSON.stringify(["S", "M", "L"]),
        colors: JSON.stringify(["Black", "Cognac"]),
        material: "Genuine Leather",
        featured: false,
        bestSeller: false,
        newArrival: true,
        inStock: true,
      },
    ])
    .returning();

  // Insert reviews
  const reviewNames = [
    "Fatima A.", "Nusrat R.", "Tasnim L.", "Ayesha K.", "Sabrina C.",
    "Rafia B.", "Maliha H.", "Tasnuva S.", "Farzana P.", "Lamia W.",
    "Sharmin D.", "Nafisa J.", "Afrin T.", "Sumaiya F.", "Nazia N.",
  ];

  const reviewTitles5 = [
    "অসাধারণ!", "টাকার পুরোপুরি মূল্য", "আমার প্রিয় পোশাক",
    "প্রত্যাশার চেয়ে ভালো", "সুন্দর কোয়ালিটি", "খুবই এলিগ্যান্ট!", "পারফেক্ট ফিট",
    "দারুণ পণ্য", "Love it!", "অনেক সুন্দর",
  ];

  const reviewTitles4 = [
    "ভালো লেগেছে", "কোয়ালিটি ভালো", "সন্তুষ্ট",
    "সুন্দর", "ইমপ্রেসড",
  ];

  const reviewBodies5 = [
    "কোয়ালিটি অসাধারণ। কাপড়ের ফিনিশিং এবং ফিটিং দুটোই পারফেক্ট। প্রতিবার পরলেই কমপ্লিমেন্ট পাই।",
    "দামটা একটু বেশি মনে হলেও, পণ্যটি সত্যিই worth it। প্রতিটি ডিটেইলে craftsmanship বোঝা যায়। এই ব্র্যান্ড থেকে আরো কিনব।",
    "এটা আমার সব expectation ছাড়িয়ে গেছে। রং আরো সুন্দর দেখাচ্ছে এবং কাপড়ের drape অনেক elegant।",
    "প্যাকেজিং থেকে শুরু করে প্রোডাক্ট কোয়ালিটি সব কিছুই perfect। Special occasion এর জন্য এটাই আমার go-to।",
    "অনেকদিন ধরে এরকম কিছু খুঁজছিলাম। ডিটেইলিং অনেক সুন্দর এবং সারাদিন পরে থাকতে আরামদায়ক।",
  ];

  const reviewBodies4 = [
    "সুন্দর পণ্য। কোয়ালিটি ভালো এবং ফিটিংও ঠিক আছে। আরো কালার থাকলে ভালো হতো।",
    "ওয়ারড্রোবে সুন্দর addition। মেটেরিয়াল হাই কোয়ালিটি এবং ভালোভাবে তৈরি। একটু বড় সাইজ নিন।",
    "Overall কোয়ালিটি নিয়ে impressed। ডিজাইন elegant এবং versatile। শিপিং দ্রুত ছিল এবং প্যাকেজিং সুন্দর।",
  ];

  const reviewsData: {
    productId: number;
    authorName: string;
    rating: number;
    title: string;
    body: string;
    verified: boolean;
  }[] = [];

  for (const product of allProducts) {
    const numReviews = 3 + Math.floor(Math.random() * 4);
    for (let i = 0; i < numReviews; i++) {
      const rating = Math.random() > 0.3 ? 5 : 4;
      reviewsData.push({
        productId: product.id,
        authorName: reviewNames[Math.floor(Math.random() * reviewNames.length)],
        rating,
        title:
          rating === 5
            ? reviewTitles5[Math.floor(Math.random() * reviewTitles5.length)]
            : reviewTitles4[Math.floor(Math.random() * reviewTitles4.length)],
        body:
          rating === 5
            ? reviewBodies5[Math.floor(Math.random() * reviewBodies5.length)]
            : reviewBodies4[Math.floor(Math.random() * reviewBodies4.length)],
        verified: Math.random() > 0.2,
      });
    }
  }

  await db.insert(reviews).values(reviewsData);

  console.log(`✅ Seeded ${allProducts.length} products across 6 categories with ${reviewsData.length} reviews`);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
