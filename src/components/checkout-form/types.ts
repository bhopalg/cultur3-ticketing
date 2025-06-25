"use client";

import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  instagramHandle: z.string().min(1, "Instagram handle is required"),
  honeyPot: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;
