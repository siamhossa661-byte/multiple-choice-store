"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/components/CartProvider";

type Step = "information" | "payment" | "complete";
type PaymentMethod = "cod" | "bkash" | "nagad" | "rocket";

export function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>("information");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [freeDelivery, setFreeDelivery] = useState({ isFreeDeliveryActive: false, freeSlotsLeft: 0 });
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    area: "",
    transactionId: "",
    senderNumber: "",
  });
  const [orderNum, setOrderNum] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch free delivery status
  useEffect(() => {
    fetch("/api/free-delivery-status")
      .then((res) => res.json())
      .then((data) => setFreeDelivery(data))
      .catch(() => {});
  }, []);

  // Shipping cost: Dhaka 80, outside 130, FREE for first 5 orders
  const baseShipping = form.city.toLowerCase().includes("dhaka") ? 80 : 130;
  const shipping = freeDelivery.isFreeDeliveryActive ? 0 : baseShipping;
  const total = subtotal + shipping;

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const paymentNumbers = {
    bkash: "01864589805",
    nagad: "01864589805",
    rocket: "01864589805",
  };

  const handleSubmitOrder = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          paymentMethod,
          items,
          subtotal,
          shipping,
          total,
        }),
      });
      const data = await res.json();
      setOrderNum(data.orderNumber ?? `MC-${Date.now()}`);
      clearCart();
      setStep("complete");
    } catch {
      setOrderNum(`MC-${Date.now()}`);
      clearCart();
      setStep("complete");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0 && step !== "complete") {
    return (
      <div className="text-center py-20">
        <p className="font-serif text-xl text-warm-700 mb-4">
          Your bag is empty
        </p>
        <Link
          href="/shop"
          className="inline-block px-8 py-3 bg-warm-900 text-cream text-sm tracking-widest uppercase hover:bg-warm-800 transition-colors"
        >
          শপিং চালিয়ে যান
        </Link>
      </div>
    );
  }

  if (step === "complete") {
    return (
      <div className="max-w-lg mx-auto text-center py-16 animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="font-serif text-3xl text-warm-900 mb-3">
          অর্ডার সম্পন্ন হয়েছে!
        </h2>
        <p className="text-lg text-warm-700 mb-2">
          Thank You for Your Order
        </p>
        <p className="text-sm text-warm-600 mb-2">
          Order #{orderNum}
        </p>
        <p className="text-sm text-warm-500 mb-8 max-w-sm mx-auto">
          আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব। আপনার পণ্য ২-৫ দিনের মধ্যে পৌঁছে যাবে।
        </p>
        <Link
          href="/shop"
          className="inline-block px-10 py-4 bg-warm-900 text-cream text-sm tracking-widest uppercase hover:bg-warm-800 transition-colors"
        >
          শপিং চালিয়ে যান
        </Link>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 border border-warm-200 bg-white text-sm text-warm-900 placeholder:text-warm-400 focus:outline-none focus:border-warm-500 transition-colors";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
      {/* Form */}
      <div className="lg:col-span-3 space-y-8">
        {/* Free Delivery Banner */}
        {freeDelivery.isFreeDeliveryActive && (
          <div className="bg-green-600 text-white p-4 rounded-lg text-center animate-fade-in">
            <p className="font-medium text-sm">
              🎉 প্রথম ৫ জন কাস্টমারের জন্য <span className="font-bold">ফ্রি ডেলিভারি!</span>
            </p>
            <p className="text-xs text-green-100 mt-1">
              {freeDelivery.freeSlotsLeft}টি ফ্রি ডেলিভারি স্লট বাকি আছে
            </p>
          </div>
        )}

        {/* Steps */}
        <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-warm-500">
          <span
            className={
              step === "information" ? "text-warm-900 font-medium" : ""
            }
          >
            Information
          </span>
          <span>›</span>
          <span
            className={step === "payment" ? "text-warm-900 font-medium" : ""}
          >
            Payment
          </span>
        </div>

        {step === "information" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-serif text-xl text-warm-900">
              আপনার তথ্য দিন
            </h2>
            
            <div>
              <label className="block text-xs text-warm-600 mb-1">নাম *</label>
              <input
                type="text"
                placeholder="আপনার সম্পূর্ণ নাম"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs text-warm-600 mb-1">ফোন নম্বর *</label>
              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className={inputClass}
              />
            </div>

            <h2 className="font-serif text-xl text-warm-900 pt-4">
              ডেলিভারি ঠিকানা
            </h2>
            
            <div>
              <label className="block text-xs text-warm-600 mb-1">সম্পূর্ণ ঠিকানা *</label>
              <input
                placeholder="বাড়ি নং, রোড নং, এলাকা"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                className={inputClass}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-warm-600 mb-1">শহর *</label>
                <select
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className={inputClass}
                >
                  <option value="">শহর নির্বাচন করুন</option>
                  <option value="Dhaka">ঢাকা (Inside Dhaka)</option>
                  <option value="Chattogram">চট্টগ্রাম</option>
                  <option value="Sylhet">সিলেট</option>
                  <option value="Rajshahi">রাজশাহী</option>
                  <option value="Khulna">খুলনা</option>
                  <option value="Barishal">বরিশাল</option>
                  <option value="Rangpur">রংপুর</option>
                  <option value="Mymensingh">ময়মনসিংহ</option>
                  <option value="Other">অন্যান্য</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-warm-600 mb-1">এলাকা</label>
                <input
                  placeholder="থানা / এলাকার নাম"
                  value={form.area}
                  onChange={(e) => updateField("area", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className={`p-4 rounded-lg ${freeDelivery.isFreeDeliveryActive ? "bg-green-50 border border-green-200" : "bg-warm-100"}`}>
              {freeDelivery.isFreeDeliveryActive && form.city ? (
                <div>
                  <p className="text-sm text-green-800 font-medium">
                    🎉 ডেলিভারি চার্জ: <span className="line-through">৳{baseShipping}</span> <span className="text-green-600 font-bold">ফ্রি!</span>
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    আপনি প্রথম ৫ জন কাস্টমারের একজন — ফ্রি ডেলিভারি পাচ্ছেন!
                  </p>
                </div>
              ) : (
                <p className="text-sm text-warm-700">
                  <span className="font-medium">ডেলিভারি চার্জ:</span>{" "}
                  {form.city ? (
                    <>
                      ৳{baseShipping} ({form.city.toLowerCase().includes("dhaka") ? "ঢাকার ভিতরে ৳80" : "ঢাকার বাইরে ৳130"})
                    </>
                  ) : (
                    "শহর নির্বাচন করুন"
                  )}
                </p>
              )}
            </div>

            <button
              onClick={() => setStep("payment")}
              disabled={!form.name || !form.phone || !form.address || !form.city}
              className="w-full py-4 bg-warm-900 text-cream text-sm tracking-widest uppercase font-medium hover:bg-warm-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              পেমেন্ট পদ্ধতি নির্বাচন করুন
            </button>
          </div>
        )}

        {step === "payment" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-serif text-xl text-warm-900">
              পেমেন্ট পদ্ধতি নির্বাচন করুন
            </h2>

            <div className="space-y-3">
              {/* Cash on Delivery */}
              <label 
                className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                  paymentMethod === "cod" 
                    ? "border-warm-900 bg-warm-900/5" 
                    : "border-warm-200 hover:border-warm-400"
                }`}
                onClick={() => setPaymentMethod("cod")}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                    paymentMethod === "cod" ? "border-warm-900" : "border-warm-300"
                  }`}>
                    {paymentMethod === "cod" && <div className="w-2 h-2 bg-warm-900 rounded-full" />}
                  </div>
                  <div>
                    <p className="text-sm text-warm-900 font-medium">
                      💵 ক্যাশ অন ডেলিভারি
                    </p>
                    <p className="text-xs text-warm-500">পণ্য হাতে পেয়ে টাকা দিন</p>
                  </div>
                </div>
              </label>

              {/* bKash */}
              <label 
                className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                  paymentMethod === "bkash" 
                    ? "border-pink-500 bg-pink-50" 
                    : "border-warm-200 hover:border-warm-400"
                }`}
                onClick={() => setPaymentMethod("bkash")}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                    paymentMethod === "bkash" ? "border-pink-500" : "border-warm-300"
                  }`}>
                    {paymentMethod === "bkash" && <div className="w-2 h-2 bg-pink-500 rounded-full" />}
                  </div>
                  <div>
                    <p className="text-sm text-warm-900 font-medium">
                      <span className="text-pink-500">bKash</span>
                    </p>
                    <p className="text-xs text-warm-500">সেন্ড মানি করুন</p>
                  </div>
                </div>
              </label>

              {/* Nagad */}
              <label 
                className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                  paymentMethod === "nagad" 
                    ? "border-orange-500 bg-orange-50" 
                    : "border-warm-200 hover:border-warm-400"
                }`}
                onClick={() => setPaymentMethod("nagad")}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                    paymentMethod === "nagad" ? "border-orange-500" : "border-warm-300"
                  }`}>
                    {paymentMethod === "nagad" && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
                  </div>
                  <div>
                    <p className="text-sm text-warm-900 font-medium">
                      <span className="text-orange-500">Nagad</span>
                    </p>
                    <p className="text-xs text-warm-500">সেন্ড মানি করুন</p>
                  </div>
                </div>
              </label>

              {/* Rocket */}
              <label 
                className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                  paymentMethod === "rocket" 
                    ? "border-purple-500 bg-purple-50" 
                    : "border-warm-200 hover:border-warm-400"
                }`}
                onClick={() => setPaymentMethod("rocket")}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                    paymentMethod === "rocket" ? "border-purple-500" : "border-warm-300"
                  }`}>
                    {paymentMethod === "rocket" && <div className="w-2 h-2 bg-purple-500 rounded-full" />}
                  </div>
                  <div>
                    <p className="text-sm text-warm-900 font-medium">
                      <span className="text-purple-500">Rocket</span>
                    </p>
                    <p className="text-xs text-warm-500">সেন্ড মানি করুন</p>
                  </div>
                </div>
              </label>
            </div>

            {/* Payment Instructions for Mobile Banking */}
            {paymentMethod !== "cod" && (
              <div className="bg-warm-100 p-5 rounded-lg space-y-3">
                <h3 className="font-medium text-warm-900">
                  {paymentMethod === "bkash" && "bKash"} 
                  {paymentMethod === "nagad" && "Nagad"} 
                  {paymentMethod === "rocket" && "Rocket"} পেমেন্ট নির্দেশনা:
                </h3>
                <ol className="text-sm text-warm-700 space-y-2 list-decimal list-inside">
                  <li>
                    আমাদের নম্বরে <span className="font-bold text-warm-900">৳{total.toLocaleString("en-BD")}</span> সেন্ড মানি করুন
                  </li>
                  <li>
                    নম্বর: <span className="font-bold text-warm-900">{paymentNumbers[paymentMethod]}</span>
                  </li>
                  <li>Transaction ID এবং আপনার নম্বর নিচে দিন</li>
                </ol>

                <div className="pt-3 space-y-3">
                  <div>
                    <label className="block text-xs text-warm-600 mb-1">Transaction ID *</label>
                    <input
                      placeholder="TrxID লিখুন"
                      value={form.transactionId}
                      onChange={(e) => updateField("transactionId", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-warm-600 mb-1">যে নম্বর থেকে পাঠিয়েছেন *</label>
                    <input
                      placeholder="01XXXXXXXXX"
                      value={form.senderNumber}
                      onChange={(e) => updateField("senderNumber", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "cod" && (
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">
                  ✓ পণ্য ডেলিভারি পাওয়ার সময় ৳{total.toLocaleString("en-BD")} পরিশোধ করুন
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setStep("information")}
                className="px-6 py-4 text-sm tracking-widest uppercase text-warm-600 hover:text-warm-900 transition-colors"
              >
                ← পেছনে যান
              </button>
              <button
                onClick={handleSubmitOrder}
                disabled={submitting || (paymentMethod !== "cod" && (!form.transactionId || !form.senderNumber))}
                className="flex-1 py-4 bg-warm-900 text-cream text-sm tracking-widest uppercase font-medium hover:bg-warm-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "প্রসেস হচ্ছে..." : "অর্ডার কনফার্ম করুন"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-2">
        <div className="bg-warm-50 p-6 lg:p-8 lg:sticky lg:top-28">
          <h3 className="font-serif text-lg text-warm-900 mb-6">
            অর্ডারের বিবরণ
          </h3>
          <ul className="space-y-4 mb-6">
            {items.map((item) => (
              <li
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex gap-4"
              >
                <div className="relative w-16 h-20 bg-warm-100 overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-warm-900 text-cream text-[10px] rounded-full flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-warm-900 font-medium line-clamp-2">
                    {item.name}
                  </p>
                  {(item.size || item.color) && (
                    <p className="text-xs text-warm-500">
                      {[item.color, item.size].filter(Boolean).join(" / ")}
                    </p>
                  )}
                </div>
                <p className="text-sm text-warm-900 font-medium">
                  ৳{(item.price * item.quantity).toLocaleString("en-BD")}
                </p>
              </li>
            ))}
          </ul>
          <div className="border-t border-warm-200 pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-warm-600">পণ্যের মূল্য</span>
              <span className="text-warm-900">৳{subtotal.toLocaleString("en-BD")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-warm-600">ডেলিভারি চার্জ</span>
              <span className="text-warm-900">
                {form.city ? (
                  freeDelivery.isFreeDeliveryActive ? (
                    <span>
                      <span className="line-through text-warm-400 mr-1">৳{baseShipping}</span>
                      <span className="text-green-600 font-bold">ফ্রি</span>
                    </span>
                  ) : (
                    `৳${shipping}`
                  )
                ) : "—"}
              </span>
            </div>
            <div className="border-t border-warm-200 pt-3 flex justify-between">
              <span className="text-sm font-medium text-warm-900">সর্বমোট</span>
              <span className="text-lg font-medium text-warm-900">
                ৳{(form.city ? total : subtotal).toLocaleString("en-BD")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
