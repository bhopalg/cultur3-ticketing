"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { formSchema, FormData } from "@/components/checkout-form/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Product } from "@/types/Product";

interface CheckoutFormProps {
  product: Product;
}

export default function CheckoutForm({}: CheckoutFormProps) {
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
  }

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
      </form>
    </Form>
  );
}
