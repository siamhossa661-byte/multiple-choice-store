import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "siamhossa661@gmail.com",
    pass: process.env.EMAIL_PASS || "",
  },
});

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

async function sendOrderEmail(body: any, orderNumber: string) {
  try {
    if (!process.env.EMAIL_PASS) {
      console.log("EMAIL_PASS not set, skipping email notification");
      return;
    }

    const items: CartItem[] = body.items || [];
    const itemsList = items
      .map(
        (item) =>
          `${item.quantity}× ${item.name}${item.size ? ` (Size: ${item.size})` : ""}${item.color ? ` (Color: ${item.color})` : ""} — ৳${item.price * item.quantity}`
      )
      .join("\n");

    const paymentMethodLabels: Record<string, string> = {
      cod: "Cash on Delivery",
      bkash: "bKash",
      nagad: "Nagad",
      rocket: "Rocket",
    };

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #2c2c2c; padding: 20px; text-align: center;">
          <h1 style="color: #fff; margin: 0; font-size: 24px;">🛍️ New Order Received!</h1>
          <p style="color: #ccc; margin: 5px 0 0;">Order ${orderNumber}</p>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #333; border-bottom: 2px solid #ddd; padding-bottom: 10px;">👤 Customer Details</h2>
          <table style="width: 100%; margin-bottom: 20px;">
            <tr><td style="padding: 5px 0; color: #666;"><strong>Name:</strong></td><td style="padding: 5px 0;">${body.name || "—"}</td></tr>
            <tr><td style="padding: 5px 0; color: #666;"><strong>Phone:</strong></td><td style="padding: 5px 0;">📞 ${body.phone || "—"}</td></tr>
            <tr><td style="padding: 5px 0; color: #666;"><strong>Address:</strong></td><td style="padding: 5px 0;">${body.address || "—"}</td></tr>
            <tr><td style="padding: 5px 0; color: #666;"><strong>Area:</strong></td><td style="padding: 5px 0;">${body.area || "—"}</td></tr>
            <tr><td style="padding: 5px 0; color: #666;"><strong>City:</strong></td><td style="padding: 5px 0;">${body.city || "—"}</td></tr>
          </table>

          <h2 style="color: #333; border-bottom: 2px solid #ddd; padding-bottom: 10px;">🛒 Items Ordered</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background: #eee;">
                <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Item</th>
                <th style="padding: 10px; text-align: center; border: 1px solid #ddd;">Qty</th>
                <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd;">${item.name}${item.size ? ` (${item.size})` : ""}</td>
                  <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${item.quantity}</td>
                  <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">৳${(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          <h2 style="color: #333; border-bottom: 2px solid #ddd; padding-bottom: 10px;">💳 Payment</h2>
          <table style="width: 100%; margin-bottom: 20px;">
            <tr><td style="padding: 5px 0; color: #666;"><strong>Method:</strong></td><td style="padding: 5px 0;">${paymentMethodLabels[body.paymentMethod] || body.paymentMethod}</td></tr>
            ${body.transactionId ? `<tr><td style="padding: 5px 0; color: #666;"><strong>TrxID:</strong></td><td style="padding: 5px 0;">${body.transactionId}</td></tr>` : ""}
            ${body.senderNumber ? `<tr><td style="padding: 5px 0; color: #666;"><strong>Sender:</strong></td><td style="padding: 5px 0;">${body.senderNumber}</td></tr>` : ""}
          </table>

          <div style="background: #fff; padding: 15px; border: 2px solid #333; text-align: right;">
            <p style="margin: 5px 0; color: #666;">Subtotal: <strong>৳${(body.subtotal || 0).toLocaleString()}</strong></p>
            <p style="margin: 5px 0; color: #666;">Delivery: <strong>৳${(body.shipping || 0).toLocaleString()}</strong></p>
            <p style="margin: 5px 0; font-size: 20px; color: #333;">Total: <strong>৳${(body.total || 0).toLocaleString()}</strong></p>
          </div>
        </div>

        <div style="background: #2c2c2c; padding: 15px; text-align: center;">
          <p style="color: #999; margin: 0; font-size: 12px;">Multiple Choice — multiple-choice-store-ptqx.vercel.app</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Multiple Choice Store" <${process.env.EMAIL_USER || "siamhossa661@gmail.com"}>`,
      to: "siamhossa661@gmail.com",
      subject: `🛍️ New Order: ${orderNumber} — ৳${(body.total || 0).toLocaleString()}`,
      html: emailHtml,
    });

    console.log("Order email sent successfully");
  } catch (error) {
    console.error("Failed to send order email:", error);
    // Don't throw - email failure shouldn't prevent order creation
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const sessionId = uuidv4();
    const orderNumber = `MC-${Date.now().toString(36).toUpperCase()}`;

    await db.insert(orders).values({
      sessionId,
      email: body.phone || null,
      firstName: body.name || null,
      lastName: body.paymentMethod || null,
      address: body.address || null,
      city: body.city || null,
      state: body.area || null,
      zip: body.transactionId || null,
      subtotal: String(body.subtotal ?? 0),
      shipping: String(body.shipping ?? 0),
      total: String(body.total ?? 0),
      items: JSON.stringify(body.items ?? []),
      status: body.paymentMethod === "cod" ? "pending" : "paid",
    });

    // Send email notification (async, don't wait for it)
    sendOrderEmail(body, orderNumber);

    return NextResponse.json({ orderNumber, success: true });
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
