import { CheckoutForm } from "@/components/CheckoutForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout — Multiple Choice",
};

export default function CheckoutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h1 className="font-serif text-3xl lg:text-4xl text-warm-900 mb-8 lg:mb-12">
        Checkout
      </h1>
      <CheckoutForm />
    </div>
  );
}
