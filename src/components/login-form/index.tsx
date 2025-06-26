"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { formSchema, FormData } from "@/components/login-form/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { AlertCircleIcon, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { validatePassword } from "@/actions/login/actions";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setError("");

    try {
      const response = await validatePassword(data.password);

      if (!response.success) {
        setError(response.error || "Invalid password");
        setIsLoading(false);
        return;
      }

      router.push("/");
    } catch (e) {
      console.error("Login failed:", e);
      setError(e instanceof Error ? e.message : "An unexpected error occurred");
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter event password"
                    className="pr-10"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error ? (
          <Alert variant="destructive" className="lg:col-span-2">
            <AlertCircleIcon />
            <AlertTitle>Failed to login. Please try again.</AlertTitle>
            <AlertDescription>
              <p>{error}</p>
            </AlertDescription>
          </Alert>
        ) : null}

        <Button
          type="submit"
          className="w-full bg-zinc-600 hover:bg-zinc-700"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Access Event"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Need help? Contact event organizers</p>
      </div>
    </Form>
  );
}
