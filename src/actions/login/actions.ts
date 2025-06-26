"use server";

import { cookies } from "next/headers";
import { ActionResponse } from "@/types/ActionResponse";

export async function validatePassword(
  password: string,
): Promise<ActionResponse<{ cookieSet: boolean }>> {
  if (password !== process.env.SITE_ACCESS_PASSWORD) {
    return {
      success: false,
      message: "Invalid password",
      error: "The password you entered is incorrect. Please try again.",
    };
  }

  const cookieStore = await cookies();

  cookieStore.set({
    name: "site_access",
    value: "granted",
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return {
    success: true,
    data: { cookieSet: true },
    message: "Access granted",
  };
}
