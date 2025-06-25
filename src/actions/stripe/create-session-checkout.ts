"use server";

import { stripe } from "@/lib/stripe";
import { ActionResponse } from "@/types/ActionResponse";
import { Checkout } from "@/types/Checkout";

export async function createSessionCheckout(
  priceId: string,
): Promise<ActionResponse<Checkout>> {
  try {
    const response = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/?status=success",
      cancel_url: "http://localhost:3000/?status=cancel",
      // get email from the user
      customer_email: "gbhopal91@gmail.com",
      metadata: {
        // Add any additional metadata you want to store
        id: "",
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
