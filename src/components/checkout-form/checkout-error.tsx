import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function CheckoutError({ error }: { error: string }) {
  return (
    <Alert variant="destructive" className="lg:col-span-2">
      <AlertCircleIcon />
      <AlertTitle>Failed to checkout. Please try again.</AlertTitle>
      <AlertDescription>
        <p>{error}</p>
      </AlertDescription>
    </Alert>
  );
}
