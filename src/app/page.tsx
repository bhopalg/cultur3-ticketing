import { getProduct } from "@/actions/stripe/get-product";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import CheckoutForm from "@/components/checkout-form";

export default async function Home() {
  const response = await getProduct();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Event Checkout</h1>
            <p className="text-gray-600 mt-1">
              Complete your ticket purchase for Culture3
            </p>
          </div>
        </div>

        {!response.success ? (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Unable to fetch ticket information.</AlertTitle>
            <AlertDescription>
              <p>
                It seems that the ticket information is currently unavailable.
                Please try again reloading the page or check back later.
              </p>
            </AlertDescription>
          </Alert>
        ) : (
          <CheckoutForm product={response.data} />
        )}
      </div>
    </div>
  );
}
