"use server";

import { ActionResponse } from "@/types/ActionResponse";
import { Ticket } from "@/types/Ticket";
import supabase from "@/lib/supabase/client";

export async function getTicket(
  memberId: string,
): Promise<ActionResponse<Ticket>> {
  try {
    const { data } = await supabase
      .from("tickets")
      .select("*")
      .eq("member_id", memberId)
      .eq("stripe_product_id", process.env.STRIPE_PRODUCT_ID!)
      .single();

    if (!data) {
      return {
        success: false,
        error: "Ticket not found",
        message: "No ticket associated with this member ID",
      };
    }

    return {
      success: true,
      data: data,
      message: "Ticket retrieved successfully",
    };
  } catch (e) {
    console.error(e);
    const errorMessage =
      e instanceof Error ? e.message : "An unexpected error occurred";
    return {
      success: false,
      error: errorMessage,
      message: "Failed to retrieve ticket",
    };
  }
}
