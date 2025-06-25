export type Product = {
  id: string;
  name: string;
  description: string | null;
  defaultPrice: Price;
};

export type Price = {
  id: string;
  currency: string;
  type: "one_time" | "recurring";
  unitAmount: number | null;
  unitAmountDecimal: string | null;
};
