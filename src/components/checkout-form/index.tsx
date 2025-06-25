"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { formSchema, FormData } from "@/components/checkout-form/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Price, Product } from "@/types/Product";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CheckoutFormProps {
  product: Product;
}

export default function CheckoutForm({ product }: CheckoutFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      instagramHandle: "",
      honeyPot: "", // Honey pot field for spam prevention
    },
  });

  function onSubmit(values: FormData) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    if (values.honeyPot != "") return;
  }

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Left Side - Form */}
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Member Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        First Name <Required />
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="first name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Last Name <Required />
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="last name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name
                      <Required />{" "}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="email..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagramHandle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Instagram Handle
                      <Required />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="instagram handle..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>
        {/* Right Side - Order Summary */}
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
                    <div className="flex items-center space-x-2 mt-2">
                      Qty: 1
                    </div>
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
              <Button className="w-full h-12 text-base font-semibold">
                Complete Booking - {formatPrice(product.defaultPrice)}
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Powered by Stripe.
              </p>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}

function Required() {
  return <span className="text-red-600">*</span>;
}

export function formatPrice(price: Price) {
  if (price.unitAmount === null) return "Free"; // Or show "N/A"

  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: price.currency.toUpperCase(), // e.g., "GBP"
  });

  return formatter.format(price.unitAmount / 100);
}

// Image for ticket
// {/*    <img*/}
// {/*      src={item.image || "/placeholder.svg"}*/}
// {/*      alt={item.name}*/}
// {/*      className="w-16 h-16 object-cover rounded-md border"*/}
// {/*    />*/}
