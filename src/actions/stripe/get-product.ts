"use server";

import { stripe } from "@/lib/stripe";
import { ActionResponse } from "@/types/ActionResponse";
import Stripe from "stripe";
import { Product } from "@/types/Product";

const productId = process.env.STRIPE_PRODUCT_ID!;

export async function getProduct(): Promise<ActionResponse<Product>> {
  try {
    const product = await stripe.products.retrieve(productId, {
      expand: ["default_price"],
    });
    const defaultPrice = product.default_price as Stripe.Price | null;

    if (!product || !defaultPrice) {
      return {
        success: false,
        message: "Product or default price not found",
        error: "Product or default price not found",
      };
    }

    return {
      success: true,
      message: "Product retrieved successfully",
      data: {
        id: product.id,
        name: product.name,
        defaultPrice: {
          id: defaultPrice.id,
          currency: defaultPrice.currency,
          type: defaultPrice.type,
          unitAmount: defaultPrice.unit_amount,
          unitAmountDecimal: defaultPrice.unit_amount_decimal,
        },
      },
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
