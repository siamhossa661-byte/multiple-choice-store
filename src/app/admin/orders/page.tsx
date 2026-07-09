import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders — Admin | Multiple Choice",
};

export const dynamic = "force-dynamic";

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

export default async function AdminOrdersPage() {
  let allOrders: any[] = [];
  let dbError = false;

  try {
    allOrders = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt));
  } catch (error) {
    console.error("Database error:", error);
    dbError = true;
  }

  const getPaymentMethodLabel = (method: string | null) => {
    switch (method) {
      case "cod": return "Cash on Delivery";
      case "bkash": return "bKash";
      case "nagad": return "Nagad";
      case "rocket": return "Rocket";
      default: return method || "—";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl lg:text-4xl text-warm-900">
            📦 All Orders
          </h1>
          <p className="text-sm text-warm-500 mt-1">
            Total: {allOrders.length} orders
          </p>
        </div>
        <Link
          href="/"
          className="text-sm text-warm-600 hover:text-warm-900 transition-colors"
        >
          ← Back to Store
        </Link>
      </div>

      {dbError ? (
        <div className="text-center py-20 bg-red-50 rounded-lg border border-red-200">
          <p className="text-4xl mb-4">⚠️</p>
          <p className="font-serif text-xl text-red-700 mb-2">
            Database Connection Error
          </p>
          <p className="text-sm text-red-500 mb-4">
            Could not connect to the database. Please check your DATABASE_URL in Vercel Environment Variables.
          </p>
          <a
            href="/admin/orders"
            className="inline-block px-6 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </a>
        </div>
      ) : allOrders.length === 0 ? (
        <div className="text-center py-20 bg-warm-50 rounded-lg">
          <p className="text-4xl mb-4">📭</p>
          <p className="font-serif text-xl text-warm-700 mb-2">
            No orders yet
          </p>
          <p className="text-sm text-warm-500">
            Orders will appear here when customers place them.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {allOrders.map((order) => {
            const items: CartItem[] = JSON.parse(order.items);
            const paymentMethod = order.lastName;
            const phone = order.email;
            const transactionId = order.zip;
            const area = order.state;

            return (
              <div
                key={order.id}
                className="bg-white border border-warm-200 rounded-lg overflow-hidden shadow-sm"
              >
                {/* Order Header */}
                <div className="bg-warm-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-warm-200">
                  <div>
                    <p className="text-xs text-warm-500 mb-1">
                      {new Date(order.createdAt).toLocaleString("en-BD", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                    <p className="font-medium text-warm-900">
                      Order #{order.sessionId.slice(0, 8).toUpperCase()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                      {order.status.toUpperCase()}
                    </span>
                    <span className="text-lg font-semibold text-warm-900">
                      ৳{parseFloat(order.total).toLocaleString("en-BD")}
                    </span>
                  </div>
                </div>

                {/* Order Details */}
                <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Customer Info */}
                  <div>
                    <h3 className="text-xs font-medium tracking-widest uppercase text-warm-500 mb-2">
                      Customer
                    </h3>
                    <p className="text-sm font-medium text-warm-900">{order.firstName || "—"}</p>
                    <p className="text-sm text-warm-600">📞 {phone || "—"}</p>
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <h3 className="text-xs font-medium tracking-widest uppercase text-warm-500 mb-2">
                      Delivery Address
                    </h3>
                    <p className="text-sm text-warm-700">
                      {order.address || "—"}
                    </p>
                    <p className="text-sm text-warm-600">
                      {[area, order.city].filter(Boolean).join(", ") || "—"}
                    </p>
                  </div>

                  {/* Payment */}
                  <div>
                    <h3 className="text-xs font-medium tracking-widest uppercase text-warm-500 mb-2">
                      Payment
                    </h3>
                    <p className="text-sm font-medium text-warm-900">
                      {getPaymentMethodLabel(paymentMethod)}
                    </p>
                    {transactionId && (
                      <p className="text-sm text-warm-600">
                        TrxID: {transactionId}
                      </p>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t border-warm-200 px-6 py-4">
                  <h3 className="text-xs font-medium tracking-widest uppercase text-warm-500 mb-3">
                    Items Ordered
                  </h3>
                  <div className="space-y-2">
                    {items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="bg-warm-100 text-warm-700 w-6 h-6 rounded flex items-center justify-center text-xs font-medium">
                            {item.quantity}×
                          </span>
                          <span className="text-warm-900">{item.name}</span>
                          {(item.size || item.color) && (
                            <span className="text-warm-500">
                              ({[item.color, item.size].filter(Boolean).join(" / ")})
                            </span>
                          )}
                        </div>
                        <span className="text-warm-700 font-medium">
                          ৳{(item.price * item.quantity).toLocaleString("en-BD")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-warm-200 px-6 py-4 bg-warm-50">
                  <div className="flex justify-end gap-8 text-sm">
                    <div className="text-right">
                      <p className="text-warm-500">Subtotal</p>
                      <p className="text-warm-500">Delivery</p>
                      <p className="font-medium text-warm-900 mt-1">Total</p>
                    </div>
                    <div className="text-right">
                      <p className="text-warm-700">৳{parseFloat(order.subtotal).toLocaleString("en-BD")}</p>
                      <p className="text-warm-700">৳{parseFloat(order.shipping).toLocaleString("en-BD")}</p>
                      <p className="font-medium text-warm-900 mt-1">৳{parseFloat(order.total).toLocaleString("en-BD")}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
