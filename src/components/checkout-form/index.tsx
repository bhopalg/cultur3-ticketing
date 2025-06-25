import Stripe from "stripe";

interface CheckoutFormProps {
  product: Stripe.Response<Stripe.Product>;
}

export default function CheckoutForm({}: CheckoutFormProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Side - Form */}
      <div className="space-y-6">ddd</div>
    </div>
  );
}
