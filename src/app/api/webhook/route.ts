import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  debugger;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook Error: ${errorMessage}`);
    return new Response(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata as { id: string };

    if (!metadata?.id) {
      console.error("Missing memberId in metadata");
      return NextResponse.json({ error: "Missing memberId" }, { status: 400 });
    }

    console.log("Payment Complete:", {
      email: session.customer_email,
      firstName: metadata.id,
    });

    // ✅ Your TODO: Add user to your database here
  }

  return NextResponse.json({ received: true });
}
