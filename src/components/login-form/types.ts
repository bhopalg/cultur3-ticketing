"use client";

import { z } from "zod";

export const formSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export type FormData = z.infer<typeof formSchema>;
