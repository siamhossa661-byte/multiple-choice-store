import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const sessionId = uuidv4();
    const orderNumber = `MC-${Date.now().toString(36).toUpperCase()}`;

    await db.insert(orders).values({
      sessionId,
      email: body.phone || null, // Using email field for phone
      firstName: body.name || null,
      lastName: body.paymentMethod || null, // Using lastName for payment method
      address: body.address || null,
      city: body.city || null,
      state: body.area || null, // Using state for area
      zip: body.transactionId || null, // Using zip for transaction ID
      subtotal: String(body.subtotal ?? 0),
      shipping: String(body.shipping ?? 0),
      total: String(body.total ?? 0),
      items: JSON.stringify(body.items ?? []),
      status: body.paymentMethod === "cod" ? "pending" : "paid",
    });

    return NextResponse.json({ orderNumber, success: true });
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
