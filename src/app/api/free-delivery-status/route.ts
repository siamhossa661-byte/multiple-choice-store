import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { sql } from "drizzle-orm";

const FREE_DELIVERY_LIMIT = 5;

export async function GET() {
  try {
    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(orders);

    const totalOrders = result[0]?.count || 0;
    const freeSlotsLeft = Math.max(0, FREE_DELIVERY_LIMIT - totalOrders);
    const isFreeDeliveryActive = freeSlotsLeft > 0;

    return NextResponse.json({
      totalOrders,
      freeSlotsLeft,
      isFreeDeliveryActive,
      freeDeliveryLimit: FREE_DELIVERY_LIMIT,
    });
  } catch (error) {
    return NextResponse.json({
      totalOrders: 0,
      freeSlotsLeft: FREE_DELIVERY_LIMIT,
      isFreeDeliveryActive: true,
      freeDeliveryLimit: FREE_DELIVERY_LIMIT,
    });
  }
}
