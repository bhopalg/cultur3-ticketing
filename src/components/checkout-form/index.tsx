"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { formSchema, FormData } from "@/components/checkout-form/types";
import { Form } from "@/components/ui/form";
import { Product } from "@/types/Product";
import { createSessionCheckout } from "@/actions/stripe/create-session-checkout";
import { getMember } from "@/actions/supabase/get-member";
import { getTicket } from "@/actions/supabase/get-ticket";
import CheckoutError from "@/components/checkout-form/checkout-error";
import Success from "@/components/checkout-form/success";
import LeftPanel from "@/components/checkout-form/left-panel";
import RightPanel from "@/components/checkout-form/right-panel";

interface CheckoutFormProps {
  product: Product;
}

export default function CheckoutForm({ product }: CheckoutFormProps) {
  const params = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    params.get("status") === "cancel"
      ? "Cancelled or failed checkout. Please try again."
      : null,
  );

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

  async function onSubmit(values: FormData) {
    if (values.honeyPot !== "") return;
    setLoading(true);

    try {
      const memberResponse = await getMember(values.email);

      if (!memberResponse.success) {
        setError("Member not found. Please check your email or sign up.");
        setLoading(false);
        return;
      }

      const existingTicket = await getTicket(memberResponse.data.id);

      if (!existingTicket.success) {
        setError("You already have a ticket. Please check your email.");
        setLoading(false);
        return;
      }

      const response = await createSessionCheckout(
        product.defaultPrice.id,
        memberResponse.data.email,
        memberResponse.data.id,
      );

      if (!response.success) {
        setError("Failed to create checkout session. Please try again.");
        setLoading(false);
        return;
      }

      if (response.data.url != null) {
        window.location.href = response.data.url;
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An error occurred";
      setError(errorMessage);
      console.error("Checkout error:", errorMessage);
      setLoading(false);
    }
  }

  if (params.get("status") === "success") {
    return <Success />;
  }

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {error ? <CheckoutError error={error} /> : null}

        {/* Left Side - Form */}
        <LeftPanel form={form} />
        {/* Right Side - Order Summary */}
        <RightPanel product={product} loading={loading} />
      </form>
    </Form>
  );
}

// Image for ticket
// {/*    <img*/}
// {/*      src={item.image || "/placeholder.svg"}*/}
// {/*      alt={item.name}*/}
// {/*      className="w-16 h-16 object-cover rounded-md border"*/}
// {/*    />*/}
