import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ticket } from "lucide-react";
import LoginForm from "@/components/login-form";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center">
            <Ticket className="w-6 h-6 text-zinc-600" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Event Access</CardTitle>
            <CardDescription className="mt-2">
              Enter the event password to access tickets
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
