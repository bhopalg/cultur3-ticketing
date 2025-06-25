"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function validatePassword(password: string) {
  if (password !== process.env.SITE_ACCESS_PASSWORD) {
    throw new Error("Invalid password");
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

  redirect("/"); // ✅ Redirect after success
}
