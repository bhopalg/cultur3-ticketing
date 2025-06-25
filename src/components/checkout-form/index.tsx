import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CheckoutFormProps {
  product: Stripe.Response<Stripe.Product>;
}

export default function CheckoutForm({}: CheckoutFormProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Side - Form */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Member Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" placeholder="John" />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div>
              <label htmlFor="phone">Phone Number</label>
              <input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
