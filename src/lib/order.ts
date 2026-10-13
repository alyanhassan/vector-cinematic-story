import { z } from "zod";

import { BRAND, MAX_QTY, SIZES } from "@/components/vector/content";

export const orderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(60, "Keep your name under 60 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  size: z
    .number({ required_error: "Choose a size.", invalid_type_error: "Choose a size." })
    .refine((v) => (SIZES as readonly number[]).includes(v), "Choose a size."),
  qty: z.number().int().min(1).max(MAX_QTY),
});

export type OrderInput = z.infer<typeof orderSchema>;

export function orderTotal(qty: number) {
  return BRAND.price * qty;
}

export type OrderResult = { reference: string };

/**
 * Demo submission. Swap the body for a real backend call later —
 * the form only depends on this signature.
 */
export async function submitOrder(data: OrderInput): Promise<OrderResult> {
  orderSchema.parse(data);
  await new Promise((r) => setTimeout(r, 900));
  return { reference: `OVP-${Math.floor(1000 + Math.random() * 9000)}` };
}
