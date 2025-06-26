"use server";

import { stripe } from "@/lib/stripe";
import { ActionResponse } from "@/types/ActionResponse";
import { Checkout } from "@/types/Checkout";
import { TICKET_QUANTITY } from "@/constants";

export async function createSessionCheckout(
  priceId: string,
  email: string,
  memberId: string,
): Promise<ActionResponse<Checkout>> {
  try {
    const response = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: TICKET_QUANTITY,
        },
      ],
      mode: "payment",
      success_url: `${process.env.URL!}/?status=success`,
      cancel_url: `${process.env.URL!}/?status=cancel`,
      customer_email: email,
      metadata: {
        id: memberId,
      },
    });

    return {
      success: true,
      data: {
        url: response.url,
        id: response.id,
      },
      message: "Checkout session created successfully",
    };
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    return {
      success: false,
      message: "Failed to create checkout session",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
