import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/components/checkout-form/utils/currency-formatter";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/loading-spinner";
import { Product } from "@/types/Product";

interface RightPanelProps {
  product: Product;
  loading: boolean;
}

export default function RightPanel({ product, loading }: RightPanelProps) {
  return (
    <div className="lg:sticky lg:top-8 lg:h-fit">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Summary</CardTitle>
          <CardDescription>Review your items and total</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Items */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm">{product.name}</h4>
                {product.description ? (
                  <p className="text-xs text-gray-500 mt-1">
                    {product.description}
                  </p>
                ) : null}
                <div className="flex items-center space-x-2 mt-2">Qty: 1</div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {formatPrice(product.defaultPrice)}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Pricing Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatPrice(product.defaultPrice)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{formatPrice(product.defaultPrice)}</span>
            </div>
          </div>

          {/* Complete Order Button */}
          <Button
            className="w-full h-12 text-base font-semibold"
            disabled={loading}
          >
            {loading ? (
              <LoadingSpinner className="text-zinc-50" />
            ) : (
              <>Complete Booking - {formatPrice(product.defaultPrice)}</>
            )}
          </Button>
          <p className="text-xs text-gray-500 text-center">
            Powered by Stripe.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
