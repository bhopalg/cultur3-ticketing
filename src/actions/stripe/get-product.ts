"use server";

import { stripe } from "@/lib/stripe";
import { ActionResponse } from "@/types/ActionResponse";
import Stripe from "stripe";

const productId = process.env.STRIPE_PRODUCT_ID!;

export async function getProduct(): Promise<
  ActionResponse<Stripe.Response<Stripe.Product>>
> {
  try {
    const product = await stripe.products.retrieve(productId, {
      expand: ["default_price"],
    });

    return {
      success: true,
      message: "Product retrieved successfully",
      data: product,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "Failed to retrieve product",
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}
