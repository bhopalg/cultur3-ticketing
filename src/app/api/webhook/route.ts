import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabase/admin";
import { getProduct } from "@/actions/stripe/get-product";
import { sendEmail } from "@/actions/resend/send-email";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

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

    const metadata = session.metadata as {
      id: string;
    };

    if (!metadata?.id) {
      console.error("Missing memberId in metadata");
      return NextResponse.json({ error: "Missing memberId" }, { status: 400 });
    }

    // ✅ Check if the member exists in Supabase
    const { data: member, error } = await supabaseAdmin
      .from("members")
      .select("*")
      .eq("id", metadata?.id)
      .single();

    if (error) {
      console.error("Error fetching member from Supabase:", error.message);
      return NextResponse.json(
        { error: "Supabase lookup failed" },
        { status: 500 },
      );
    }

    const { error: insertError } = await supabaseAdmin.from("tickets").insert({
      member_id: member.id,
      stripe_product_id: process.env.STRIPE_PRODUCT_ID!,
      transaction_id: session.id,
    });

    if (insertError) {
      console.error(
        "Error fetching member from Supabase:",
        insertError.message,
      );
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    const { data } = await getProduct();
    await sendEmail(member, session.id, data);
  }

  return NextResponse.json({ received: true });
}
