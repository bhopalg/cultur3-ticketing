"use server";

import { ActionResponse } from "@/types/ActionResponse";
import supabase from "@/lib/supabase/client";
import { Member } from "@/types/Member";

export async function getMember(
  email: string,
): Promise<ActionResponse<Member>> {
  try {
    const { data } = await supabase
      .from("members")
      .select("*")
      .eq("email", email)
      .single();

    if (!data) {
      return {
        success: false,
        message: "Member not found",
        error: "No member found with the provided email",
      };
    }

    return {
      success: true,
      data: data,
      message: "Member retrieved successfully",
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    console.error(e);
    return {
      success: false,
      message: "Failed to get member",
      error: errorMessage,
    };
  }
}
