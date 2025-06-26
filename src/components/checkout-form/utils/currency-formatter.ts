import { Price } from "@/types/Product";

export function formatPrice(price: Price) {
  if (price.unitAmount === null) return "Free"; // Or show "N/A"

  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: price.currency.toUpperCase(), // e.g., "GBP"
  });

  return formatter.format(price.unitAmount / 100);
}
